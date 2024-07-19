import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { LoginComponent } from '../login/login.component';
import { ActorsInfoService } from '../Services/actorsInfoService/actors-info.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { SkillsService } from 'src/app/services/Skills/skills.service';
import { SkillIdsService } from 'src/app/services/sendSkillIds/skill-ids.service';
import { AuthService } from '../Services/AuthService/auth.service';
@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  imagename: string = '';
  actors: any[] = [];
  loginResponse: any
  uniqueWings: any[] = [];
  rulesArray: any[] = [];
  Rules: any[] = [];
  singleOrSplitted: any[] = [];
  loginDisabled: boolean = false;
  constructor(
    private storage: StorageService,
    private stor: StorageService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private signalRService: SignalRService,
    private commonService: CommonDataService,

    private sendWings: GetWingsService,
    private sendSkills: SkillsService,
    private sendSkillIdsService: SkillIdsService
  ) { }

  ngOnInit(): void {

    let data = this.storage.retrive('main', 'O').local;
    this.loginResponse = data;
    this.fullName = data.username;
    console.table(data);
    this.email = data.originalUserName;

    this.actors = data.actors;
  }


  getPermissions(actorId: number ) {
    sessionStorage.setItem('activeActorId', JSON.stringify(actorId));
    this.commonService.getPermissionByRole({
      "ActorId": actorId,
      "Inline": true
    }).subscribe((res: any) => {
      console.log(res);
      sessionStorage.setItem('Permissions', JSON.stringify(res.priviledge));
      try {
        this.commonService.UserLogin().subscribe(() => {
          this.sendSkillIdsService.sendSkillIds(this.loginResponse?.skills);
          sessionStorage.setItem('skills', this.loginResponse?.skills);

          this.commonService.GetSkills(this.loginResponse?.skills)
            .subscribe((skillNames: any) => {
              debugger
              this.sendSkills.sendSkills(skillNames);
              this.stor.store('skills', skillNames);

              // sessionStorage.setItem('skillSlug', skillNames[0]?.skilSlug);
              this.loginResponse?.roles.forEach((role: any) => {
                var companyId = role.id;

                skillNames.forEach((skill: any) => {
                  var wingName = skill.wing;
                  if (!this.uniqueWings.includes(wingName)) {
                    this.uniqueWings.push(wingName);
                  }
                  this.sendWings.sendWings(this.uniqueWings.toString());
                  sessionStorage.setItem('defaultWings', this.uniqueWings.toString());

                  const splitedRules = skill.rules.split(',')

                  var obj = {
                    "platform": skill.skillName.toLowerCase()?.split(' ')[0],
                    "ruleLength": splitedRules.length
                  }
                  this.singleOrSplitted.push(obj);
                  this.stor.store('checkSegregation', this.singleOrSplitted);

                  this.Rules = skill.rules.split(',');
                  this.Rules.forEach((x: any) => {
                    var groupName = x + '_' + skill.wing + '_' + companyId;

                    this.signalRService
                      .getConnectionState()
                      .subscribe((connected) => {
                        if (connected) {
                          this.signalRService.joinGroup(groupName);
                        }
                      });
                  });
                });
              });
            });
          this.router.navigateByUrl('all-inboxes/focused/all');


          //signalRRequests

          this.signalRService.startConnection();

          this.signalRService.removeTagDataListener();
          this.signalRService.addTagDataListener();
          this.signalRService.unRespondedCountDataListener();
          this.signalRService.updateListAndDetailDataListener();
          this.signalRService.replyDataListener();
          this.signalRService.queryStatusDataListener();
          this.signalRService.bulkQueryStatusDataListener();
          this.signalRService.checkConnectionStatusListener();
          this.signalRService.assignQueryResponseListner();
          this.signalRService.applySentimentListner();
          this.signalRService.updateMessageStatusDataListener();
          this.loginDisabled = true

        },
          (error) => {
            alert(error.error.message)
          });
      } finally {

        this.spinnerService.hide();
      }

      //this.actorService.setActor(true);
      //this.router.navigateByUrl('/all-inboxes/focused/all');
    })

    // switch (actor) {
    //   case 'administrator':
    //     this.router.navigateByUrl('all-inboxes/focused/all');
    //     break;

    //   case 'supervisor':
    //     this.router.navigateByUrl('all-inboxes/focused/all');
    //     break;

    //   case 'agent':
    //     this.router.navigateByUrl('all-inboxes/focused/all');
    //     break;

    //   default:
    //     this.router.navigateByUrl('all-inboxes/focused/all');
    //     break;
    // }
  }
  logoutUser(){
    debugger
  this.commonService.SignOut().subscribe((res:any)=>{
    sessionStorage.removeItem('token')
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  },error=>{
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
)
  }
}
