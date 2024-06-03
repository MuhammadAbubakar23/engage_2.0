import { ChangeDetectorRef, Component, HostListener,  } from '@angular/core';
import { Router,NavigationStart  } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toaster } from './layouts/engage2/toaster/toaster';
import { ToasterService } from './layouts/engage2/toaster/toaster.service';
import { GetWingsService } from './services/GetWings/get-wings.service';
import { RulesGroupIdsService } from './services/RulesGroupIds/rules-group-ids.service';
import { SkillIdsService } from './services/sendSkillIds/skill-ids.service';
import { SignalRService } from './services/SignalRService/signal-r.service';
import { SkillsService } from './services/Skills/skills.service';
import { CommonDataService } from './shared/services/common/common-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  rulesGroupIds: any[]=[];
  uniqueWings: any[]=[];
  
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    if (!this.isInternalNavigation()) {
      // Clear local storage here
      localStorage.clear();
       localStorage.removeItem('token')
    }
  }
  private isInternalNavigation(): boolean {
    return this.router.navigated && this.router.url.startsWith('/');
  }
  toasters: Toaster[] = [];
  title = 'Enteract.Engage2.0';
  activeChannel: any;
  routeString:string='/login'
  constructor(
    private signalRService: SignalRService,
    private router: Router,
    private commonService: CommonDataService,
    private toaster: ToasterService,
    private spinnerService: NgxSpinnerService,
   private cdr:ChangeDetectorRef,
   private sendSkills: SkillsService,
    private sendSkillIdsService: SkillIdsService,
    private sendRulesGroupIdsService: RulesGroupIdsService,
    private sendWings : GetWingsService
  ) {}

  remove(index: number) {
    console.log(index);
    this.toasters = this.toasters.filter((v, i) => i !== index);
    //this.toasts.splice(index, 1);
  }
  ngOnInit() {


    this.activeChannel = window.location.origin;

    this.toaster.toaster$.subscribe((toaster) => {
      if (toaster !== null) {
        this.toasters = [toaster, ...this.toasters];
        setTimeout(() => this.toasters.pop(), toaster.delay || 6000);
      }
    });

    if (this.activeChannel == 'http://localhost:4200' || this.activeChannel == 'https://localhost:4200') {
      this.B_Block();
    } else {
      this.A_Block();
    }

  }
  A_Block() {
    if (localStorage.getItem('signalRConnectionId')) {
      if (this.signalRService.hubconnection == undefined) {
        this.spinnerService.show();
        this.commonService.SignOut().subscribe(
          () => {
            localStorage.clear();
            this.router.navigateByUrl('/login');
            this.spinnerService.hide();
          },
          (error) => {
            localStorage.clear();
            this.router.navigateByUrl('/login');
            this.spinnerService.hide();
          }
        );
      }
    }
  }
  B_Block() {
    this.commonService.GetSkills([
      18,
      20,
      22,
      24,
      26,
      28,
      30,
      32,
      34
    ]).subscribe((skillNames: any) => {
            
      this.sendSkills.sendSkills(skillNames);
      localStorage.setItem('skillSlug', skillNames[0]?.skilSlug)
      // res?.loginResponse?.loginResponse?.roles.forEach((role:any) => {
      var companyId = 651;
      if (!this.rulesGroupIds.includes(skillNames[0].rules[0].groupId)) {
        this.rulesGroupIds.push(skillNames[0].rules[0].groupId);
      }
      this.sendRulesGroupIdsService.sendRulesGroupIds(this.rulesGroupIds);
      skillNames.forEach((skill: any) => {
        var groupName = skill.skillName + '_' + companyId;

        this.signalRService.getConnectionState().subscribe((connected) => {
            if (connected) {
              this.signalRService.joinGroup(groupName);
            }
          });
        var wingName = skill.wing;
        if (!this.uniqueWings.includes(wingName)) {
          this.uniqueWings.push(wingName);
        }
        this.sendWings.sendWings(this.uniqueWings.toString());
        });
      // });
      
      localStorage.setItem('defaultRuleIds', this.rulesGroupIds.toString());            
      localStorage.setItem('defaultSkills', this.uniqueWings.toString());
    });

    this.signalRService.reConnect();

    this.signalRService.removeTagDataListener();
    this.signalRService.addTagDataListener();
    this.signalRService.unRespondedCountDataListener();
    this.signalRService.updateListAndDetailDataListener();
    this.signalRService.replyDataListener();
    this.signalRService.queryStatusDataListener();
    this.signalRService.bulkQueryStatusDataListener();
    this.signalRService.assignQueryResponseListner();
    this.signalRService.applySentimentListner();
    this.signalRService.updateMessageStatusDataListener();
    // for new post
    // this.signalRService.updatePostList()
  }

}
