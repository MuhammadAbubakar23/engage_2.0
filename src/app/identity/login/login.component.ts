import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/identity/Services/AuthService/auth.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { LoginDto } from 'src/app/shared/Models/LoginDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { DatePipe } from '@angular/common';
import { VerificationDto } from 'src/app/shared/Models/verificationDto';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { SkillIdsService } from 'src/app/services/sendSkillIds/skill-ids.service';
import { SkillsService } from 'src/app/services/Skills/skills.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  Actors = [
    { id: 1, name: 'Administrator' },
    { id: 2, name: 'Agent' },
    { id: 3, name: 'Manager' },
  ];
  user = '1';
  token: any;
  logindto = new LoginDto();
  verificationdto = new VerificationDto();
  isUserLoging: boolean = false;
  baseUrl: string = '';
  ErrorMessage: string = '';
  isVerificationcodeFailed: boolean = false;
  loginDisabled: boolean = false;
  matchTime: any;
  BlockuserTime: any;
  timeRemaining: any;
  countdownTime: number = 0;
  loginForm = new UntypedFormGroup({
    // actor: new UntypedFormControl(this.logindto.actor),
    email: new UntypedFormControl(this.logindto.userName),
    userName: new UntypedFormControl(this.logindto.userName, [
      Validators.required,
    ]),
    password: new UntypedFormControl(this.logindto.password, [
      Validators.required,
    ]),
    rememberMe: new UntypedFormControl(this.logindto.rememberMe),
  });
  verificationForm = new UntypedFormGroup({
    Verificationemail: new UntypedFormControl(this.verificationdto.email),
    verificationCode: new UntypedFormControl(
      this.verificationdto.verificationCode,
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)]
    ),
  });
  Verificationemail: any;
  @Input() seconds = 500;
  display: any;
  constructor(
    private authService: AuthService,
    private stor: StorageService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private signalRService: SignalRService,
    private commonService: CommonDataService,
    private datePipe: DatePipe,
    private sendWings: GetWingsService,
    private sendSkills: SkillsService,
    private sendSkillIdsService: SkillIdsService
  ) {}

  ngOnInit(): void {
    // this.getAllTags();
    this.spinnerService.hide();
    this.baseUrl = window.location.origin;
  }
  uniqueWings: any[] = [];
  rulesArray: any[] = [];
  Rules: any[] = [];
  singleOrSplitted: any[] = [];
  loginResponse: any;
  login() {
    let obj = {
      // actor: this.loginForms.value.actor,
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
      rememberMe: true,
    };
    this.spinnerService.show();
    this.authService.login(obj).subscribe(
      (res: any) => {
        if (res.isTwoFAEnabled == false) {
          this.loginResponse = res.loginResponse.loginResponse;

          this.stor.store('token', this.loginResponse.accessToken);
          this.stor.store('main', this.loginResponse);
          this.stor.store('nocompass', this.loginResponse?.roles[0]);
          sessionStorage.setItem('agentId', this.loginResponse.userId);
          sessionStorage.setItem('agentName', this.loginResponse.username);

          if (this.loginResponse?.actors?.length > 1) {
            this.router.navigateByUrl('loginAs');
            //this.actorsService.sendActors(this.loginResponse?.actors)
          } else if (this.loginResponse?.actors?.length == 1) {
            const actorId = this.loginResponse?.actors[0].mainId;
            sessionStorage.setItem('activeActorId', JSON.stringify(actorId));

            this.commonService
              .getPermissionByRole({
                ActorId: actorId,
                Inline: true,
              })
              .subscribe((res: any) => {
                console.log(res);
                sessionStorage.setItem(
                  'Permissions',
                  JSON.stringify(res.priviledge)
                );
                try {
                  this.commonService.UserLogin().subscribe(
                    () => {
                      this.sendSkillIdsService.sendSkillIds(
                        this.loginResponse?.skills
                      );
                      sessionStorage.setItem(
                        'skills',
                        this.loginResponse?.skills
                      );

                      this.commonService
                        .GetSkills(this.loginResponse?.skills)
                        .subscribe((skillNames: any) => {
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
                              this.sendWings.sendWings(
                                this.uniqueWings.toString()
                              );
                              sessionStorage.setItem(
                                'defaultWings',
                                this.uniqueWings.toString()
                              );

                              const splitedRules = skill.rules.split(',');

                              var obj = {
                                platform: skill.skillName
                                  .toLowerCase()
                                  ?.split(' ')[0],
                                ruleLength: splitedRules.length,
                              };
                              this.singleOrSplitted.push(obj);
                              this.stor.store(
                                'checkSegregation',
                                this.singleOrSplitted
                              );

                              this.Rules = skill.rules.split(',');
                              this.Rules.forEach((x: any) => {
                                var groupName =
                                  x + '_' + skill.wing + '_' + companyId;

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
                      this.loginDisabled = true;
                    },
                    (error) => {
                      alert(error.error.message);
                    }
                  );
                } finally {
                  this.spinnerService.hide();
                }
              });
          } else {
            try {
              this.commonService.UserLogin().subscribe(
                () => {
                  this.sendSkillIdsService.sendSkillIds(
                    this.loginResponse?.skills
                  );
                  sessionStorage.setItem('skills', this.loginResponse?.skills);

                  this.commonService
                    .GetSkills(this.loginResponse?.skills)
                    .subscribe((skillNames: any) => {
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
                          sessionStorage.setItem(
                            'defaultWings',
                            this.uniqueWings.toString()
                          );

                          const splitedRules = skill.rules.split(',');

                          var obj = {
                            platform: skill.skillName
                              .toLowerCase()
                              ?.split(' ')[0],
                            ruleLength: splitedRules.length,
                          };
                          this.singleOrSplitted.push(obj);
                          this.stor.store(
                            'checkSegregation',
                            this.singleOrSplitted
                          );

                          this.Rules = skill.rules.split(',');
                          this.Rules.forEach((x: any) => {
                            var groupName =
                              x + '_' + skill.wing + '_' + companyId;

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
                  this.loginDisabled = true;
                },
                (error) => {
                  alert(error.error.message);
                }
              );
            } finally {
              this.spinnerService.hide();
            }
          }
        } else if (res.status == true || res.isTwoFAEnabled == true) {
          this.Verificationemail = res.userName;
          // res.loginResponse.loginTwoFAResponse.userName;
          this.isUserLoging = true;
          this.isVerificationcodeFailed = false;
          this.spinnerService.hide();
        }

        // });
      },
      (error: any) => {
        this.spinnerService.hide();
        this.ErrorMessage = error.error;
        if (this.ErrorMessage?.includes('The account is locked out ')) {
          const LockedtiemEndpatteren = /lockoutEndTime = (.+)$/;
          this.matchTime = this.ErrorMessage.match(LockedtiemEndpatteren);
          if (this.matchTime && this.matchTime.length > 1) {
            const lockoutEndTimeString = this.matchTime[1];
            const lockoutEndTime = new Date(lockoutEndTimeString).toISOString();
            this.BlockuserTime = this.datePipe.transform(
              new Date(lockoutEndTime),
              'h:mm:ss'
            );

            const endTimeMinutes = new Date(lockoutEndTime).getMinutes();
            const NowTimeMinutes = new Date().getMinutes();
            const endTimeSeconds = new Date(lockoutEndTime).getSeconds();
            const NowTimeSeconds = new Date().getSeconds();

            const sumofEndTime = endTimeMinutes + endTimeSeconds;
            const sumofNowTime = NowTimeMinutes + NowTimeSeconds;

            this.countdownTime = endTimeMinutes - NowTimeMinutes;
            this.timer(this.countdownTime);

            this.reloadComponent('userblocked');
          }

          this.loginDisabled = true;
          this.spinnerService.hide();
          this.reloadComponent('userblocked');
        } else {
          this.spinnerService.hide();
          this.reloadComponent('loginFailed');
        }
      }
    );
  }

  // newFunction(){
  // const actorId = this.actorsService.actors
  // console.log(actorId)
  //   this.commonService.UserLogin().subscribe(() => {
  //     this.sendSkillIdsService.sendSkillIds(this.loginResponse?.skills);
  //     sessionStorage.setItem('skills', this.loginResponse?.skills);

  //     this.commonService.GetSkills(this.loginResponse?.skills)
  //       .subscribe((skillNames: any) => {
  //         this.sendSkills.sendSkills(skillNames);
  //         this.stor.store('skills', skillNames);

  //         // sessionStorage.setItem('skillSlug', skillNames[0]?.skilSlug);
  //         this.loginResponse?.roles.forEach((role: any) => {
  //           var companyId = role.id;

  //           skillNames.forEach((skill: any) => {
  //             var wingName = skill.wing;
  //             if (!this.uniqueWings.includes(wingName)) {
  //               this.uniqueWings.push(wingName);
  //             }
  //             this.sendWings.sendWings(this.uniqueWings.toString());
  //             sessionStorage.setItem('defaultWings', this.uniqueWings.toString());

  //           const splitedRules = skill.rules.split(',')

  //           var obj = {
  //             "platform": skill.skillName.toLowerCase()?.split(' ')[0],
  //             "ruleLength": splitedRules.length
  //           }
  //           this.singleOrSplitted.push(obj);
  //           this.stor.store('checkSegregation', this.singleOrSplitted);

  //             this.Rules = skill.rules.split(',');
  //             this.Rules.forEach((x: any) => {
  //               var groupName = x + '_' + skill.wing + '_' + companyId;

  //               this.signalRService
  //                 .getConnectionState()
  //                 .subscribe((connected) => {
  //                   if (connected) {
  //                     this.signalRService.joinGroup(groupName);
  //                   }
  //                 });
  //             });
  //           });
  //         });
  //       });
  //     this.router.navigateByUrl('all-inboxes/focused/all');

  //     //signalRRequests

  //     this.signalRService.startConnection();

  //     this.signalRService.removeTagDataListener();
  //     this.signalRService.addTagDataListener();
  //     this.signalRService.unRespondedCountDataListener();
  //     this.signalRService.updateListAndDetailDataListener();
  //     this.signalRService.replyDataListener();
  //     this.signalRService.queryStatusDataListener();
  //     this.signalRService.bulkQueryStatusDataListener();
  //     this.signalRService.checkConnectionStatusListener();
  //     this.signalRService.assignQueryResponseListner();
  //     this.signalRService.applySentimentListner();
  //     this.signalRService.updateMessageStatusDataListener();
  //   },
  //   (error)=>{
  //     alert(error.error.message)
  //   });
  // }
  timer(countdownTime: any) {
    // let minute = 1;
    let seconds: number = countdownTime * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = countdownTime < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      if (this.display == '00:00') {
        this.loginDisabled = false;
        this.countdownTime = 0;
        // this.login()
      }
      if (seconds == 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
  Submituser() {
    let obj = {
      userName: this.verificationForm.value.Verificationemail,
      varificationCode: Number(this.verificationForm.value.verificationCode),
    };
    this.spinnerService.show();
    this.authService.submitUser(obj).subscribe(
      (res: any) => {
        this.stor.store('token', res.accessToken);
        this.stor.store('main', res);
        this.stor.store('nocompass', res?.roles[0]);
        sessionStorage.setItem('agentId', res.userId);
        sessionStorage.setItem('agentName', res.username);

        this.commonService.UserLogin().subscribe(() => {
          this.router.navigateByUrl('all-inboxes/focused/all');
          this.spinnerService.hide();

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
          // for new post
          // this.signalRService.updatePostList;
        });
      },
      (error: any) => {
        this.spinnerService.hide();
        this.reloadComponent('verificationFailed');
        this.isVerificationcodeFailed = true;
      }
    );
  }
  AlterMsg: any;
  toastermessage: any;
  reloadComponent(type: any) {
    if (type == 'loginFailed') {
      this.AlterMsg = this.ErrorMessage;
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'verificationFailed') {
      this.AlterMsg = 'Wrong Verification Code !';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'userblocked') {
      this.AlterMsg = 'User is Blocked till ' + this.BlockuserTime;
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }
  VerificationcodeFailed() {
    this.isUserLoging = false;
    this.verificationForm.reset();
  }
  getAllTags() {
    // this.commonService.GetAllTags().subscribe((res:any)=>{
    //   this.stor.store('Tags', res);
    // });
  }
}
