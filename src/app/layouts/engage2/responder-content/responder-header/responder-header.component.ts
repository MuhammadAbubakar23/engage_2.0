import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UpdateMessagesService } from 'src/app/services/UpdateMessagesService/update-messages.service';
import { AssignQuerryDto } from 'src/app/shared/Models/AssignQuerryDto';
import { DraftDto } from 'src/app/shared/Models/DraftDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { HeaderDto } from 'src/app/shared/Models/HeaderDto';
import { MarkAsCompleteDto } from 'src/app/shared/Models/MarkAsCompleteDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';

@Component({
  selector: 'responder-header',
  templateUrl: './responder-header.component.html',
  styleUrls: ['./responder-header.component.scss'],
})
export class ResponderHeaderComponent implements OnInit {
  userIdsDto = this.fetchId.getIds();
  agentId = localStorage.getItem('agentId');
  pageNumber: any = 0;
  pageSize: any = 0;
  UserDetails: any = '';
  FbUnrespondedCmntCountByCustomer: number = 0;
  WtsapUnrespondedCmntCountByCustomer: number = 0;
  WcUnrespondedCmntCountByCustomer: number = 0;
  SmsUnrespondedCmntCountByCustomer: number = 0;
  TwitterUnrespondedCmntCountByCustomer: number = 0;
  InstaUnrespondedCmntCountByCustomer: number = 0;
  EmailUnrespondedCmntCountByCustomer: number = 0;
  YoutubeUnrespondedCmntCountByCustomer: number = 0;
  LinkedInUnrespondedCmntCountByCustomer: number = 0;

  FbUnrespondedMsgCountByCustomer: number = 0;
  TwitterUnrespondedMsgCountByCustomer: number = 0;

  totalFbUnrespondedCountByCustomer: number = 0;
  totalTwitterUnrespondedCountByCustomer: number = 0;

  headerDto = new HeaderDto();

  filterDto = new FiltersDto();
  assignQuerryDto = new AssignQuerryDto();

  facebookTab = false;
  instagramTab = false;
  whatsappTab = false;
  smsTab = false;
  twitterTab = false;
  emailTab = false;
  youtubeTab = false;
  phoneTab = false;
  webChatTab = false;
  linkedInTab = false;
  playStoreTab = false;

  facebookComment = false;
  facebookMessage = false;
  instagram = false;
  whatsapp = false;
  sms = false;
  twitterComment = false;
  twitterMessage = false;
  email = false;
  youtube = false;
  phone = false;
  webChat = false;
  linkedIn = false;
  playStore = false;

  facebookId: any;
  instagramId: any;
  whatsappId: any;
  smsId: any;
  twitterId: any;
  emailId: any;
  youtubeId: any;
  phoneId: any;
  webChatId: any;
  linkedInId: any;
  playStoreId: any;

  platformsArray: any[] = [];
  platformsArrayForMessages: any[] = [];

  public Subscription!: Subscription;

  constructor(
    private fetchId: FetchIdService,
    private route: Router,
    private fetchposttype: FetchPostTypeService,
    private _route: Router,
    private commondata: CommonDataService,
    private _sharedService: SharedService,
    private moduleService: ModulesService,
    private SpinnerService: NgxSpinnerService,
    private commonService: CommonDataService,
    private unrespondedCountService: UnRespondedCountService,
    private updateCommentsService: UpdateCommentsService,
    private updateMessagesService: UpdateMessagesService,
    private toggleService: ToggleService
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
      this.id = res;
      this.getUserDetails();
    });

    this.Subscription = this.fetchposttype
      .getPostTypeAsObservable()
      .subscribe((res) => {
        
        this.postType = res;
        this.openedTab();
      });
  }

  ngOnInit(): void {
    this.getUserDetails();

    this.openedTab();

    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
      (tooltipNode) => new Tooltip(tooltipNode)
    ),
      {
        trigger: 'hover',
      };

    this.Subscription = this.updateMessagesService
      .receiveMessage()
      .subscribe((res) => {
        res.forEach((msg: any) => {
          if (msg.fromId == localStorage.getItem('storeHeaderOpenedId')) {
            if (msg.contentType == 'FCP') {
              this.totalFbUnrespondedCountByCustomer =
                this.totalFbUnrespondedCountByCustomer + 1;
            }
            if (msg.contentType == 'TM') {
              this.totalTwitterUnrespondedCountByCustomer =
                this.totalTwitterUnrespondedCountByCustomer + 1;
            }
          }
        });
      });

    this.Subscription = this.updateCommentsService
      .receiveComment()
      .subscribe((res) => {
        res.forEach((msg: any) => {
          if (msg.userId == localStorage.getItem('storeHeaderOpenedId')) {
            if (msg.contentType == 'FC' || msg.contentType == 'FCP') {
              this.totalFbUnrespondedCountByCustomer =
                this.totalFbUnrespondedCountByCustomer + 1;
            }
            if (msg.contentType == 'TT' || msg.contentType == 'TM') {
              this.totalTwitterUnrespondedCountByCustomer =
                this.totalTwitterUnrespondedCountByCustomer + 1;
            }
            if (msg.contentType == 'IC') {
              this.InstaUnrespondedCmntCountByCustomer =
                this.InstaUnrespondedCmntCountByCustomer + 1;
            }
            if (msg.contentType == 'Mail') {
              this.EmailUnrespondedCmntCountByCustomer =
                this.EmailUnrespondedCmntCountByCustomer + 1;
            }
            if (msg.contentType == 'SMS') {
              this.SmsUnrespondedCmntCountByCustomer =
                this.SmsUnrespondedCmntCountByCustomer + 1;
            }
            if (msg.contentType == 'WM') {
              this.WtsapUnrespondedCmntCountByCustomer =
                this.WtsapUnrespondedCmntCountByCustomer + 1;
            }
            if (msg.contentType == 'WC') {
              this.WcUnrespondedCmntCountByCustomer =
                this.WcUnrespondedCmntCountByCustomer + 1;
            }
            if (msg.contentType == 'YC') {
              this.YoutubeUnrespondedCmntCountByCustomer =
                this.YoutubeUnrespondedCmntCountByCustomer + 1;
            }
            if (msg.contentType == 'LIC') {
              this.LinkedInUnrespondedCmntCountByCustomer =
                this.LinkedInUnrespondedCmntCountByCustomer + 1;
            }
          }
        });
      });

    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        if (res.contentCount.contentType == 'FC') {
          this.totalFbUnrespondedCountByCustomer =
            res.contentCount.unrespondedCount +
            this.FbUnrespondedMsgCountByCustomer;
        }
        if (res.contentCount.contentType == 'FCP') {
          this.totalFbUnrespondedCountByCustomer =
            res.contentCount.unrespondedCount +
            this.FbUnrespondedCmntCountByCustomer;
        }
        if (res.contentCount.contentType == 'TT') {
          this.totalTwitterUnrespondedCountByCustomer =
            res.contentCount.unrespondedCount +
            this.TwitterUnrespondedMsgCountByCustomer;
        }
        if (res.contentCount.contentType == 'TM') {
          this.totalTwitterUnrespondedCountByCustomer =
            res.contentCount.unrespondedCount +
            this.TwitterUnrespondedCmntCountByCustomer;
        }
        if (res.contentCount.contentType == 'IC') {
          this.InstaUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
        if (res.contentCount.contentType == 'Mail') {
          this.EmailUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
        if (res.contentCount.contentType == 'SMS') {
          this.SmsUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
        if (res.contentCount.contentType == 'WM') {
          this.WtsapUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
        if (res.contentCount.contentType == 'WC') {
          this.WcUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
        if (res.contentCount.contentType == 'YC') {
          this.YoutubeUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
        if (res.contentCount.contentType == 'LIC') {
          this.LinkedInUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
      });
  }

  param: any;
  getRouteParam(route: any) {
    this.param = route;
    localStorage.setItem('path', this.param);
    // // console.log(localStorage.getItem('path'));
  }

  draftDto = new DraftDto();
  assignedProfile = localStorage.getItem('assignedProfile');

  updatevalue(id: any, platform: any) {
    
    // if (
    //   this.assignedProfile == null ||
    //   this.assignedProfile == '' ||
    //   this.assignedProfile == undefined
    // ) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res.id;

        this.assignQuerry(id, platform);
      });
    // } else {
    //   this.reloadComponent('querryAssigned')
    // }
  }

  assignQuerry(id: any, platform: any) {
    this.assignQuerryDto = {
      userId: Number(localStorage.getItem('agentId')),
      profileId: this.profileId,
      agentIds: 'string',
      platform: platform,
    };

    this.commondata.AssignQuerry(this.assignQuerryDto).subscribe(
      (res) => {
        this.reloadComponent('queryallocated');
        this._route.navigateByUrl('/responder/' + platform);
        this.fetchId.setPlatform(platform);
        this.fetchId.setOption(id);
        localStorage.setItem('profileId', this.profileId);
      },
      (error) => {
        this.reloadComponent('queryallocatedtoanotheruser');
      }
    );
  }
  updateModule(value: string) {
    this.moduleService.updateModule(value);
  }

  minimizeChat() {
    if (this.fetchId.platform == 'Facebook') {
      this.totalCount = this.FbUnrespondedCmntCountByCustomer;
    }
    if (this.fetchId.platform == 'WhatsApp') {
      this.totalCount = this.WtsapUnrespondedCmntCountByCustomer;
    }
    if (this.fetchId.platform == 'Webchat') {
      this.totalCount = this.WcUnrespondedCmntCountByCustomer;
    }
    if (this.fetchId.platform == 'SMS') {
      this.totalCount = this.SmsUnrespondedCmntCountByCustomer;
    }
    if (this.fetchId.platform == 'Twitter') {
      this.totalCount = this.TwitterUnrespondedCmntCountByCustomer;
    }
    if (this.fetchId.platform == 'Instagram') {
      this.totalCount = this.InstaUnrespondedCmntCountByCustomer;
    }
    if (this.fetchId.platform == 'Email') {
      this.totalCount = this.EmailUnrespondedCmntCountByCustomer;
    }

    if (this.fetchId.platform == 'Youtube') {
      this.totalCount = this.YoutubeUnrespondedCmntCountByCustomer;
    }
    if (this.fetchId.platform == 'LinkedIn') {
      this.totalCount = this.LinkedInUnrespondedCmntCountByCustomer;
    }

    this.draftDto = {
      userId: this.userId,
      userName: this.userName,
      profilePic: this.profilePic,
      platform: this.platform,
      postType: this.postType,
      totalCount: this.totalCount,
    };
    this._sharedService.sendUserInfo(this.draftDto);
  }

  platform: any;
  userId: string = '';
  userName: any;
  profilePic: any;
  postType = this.fetchposttype.postType;
  totalCount: any;
  id = this.fetchId.id;
  profileId: any;
  getUserDetails() {
    if (this.id != null || this.id != undefined) {
      localStorage.setItem('storeHeaderOpenedId', this.id);
      this.filterDto = {
        // fromDate: '2000-11-30T08:15:36.365Z',
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: this.fetchId.platform,
        pageNumber: 1,
        pageSize: 10,
        isAttachment: false,
      };
      this.SpinnerService.show();

      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (res != null || res != undefined) {
            this.userId = res.List[0].user.userId;
            this.userName =
              res.List[0].user.userName || res.List[0].user.userId;
            this.profilePic = res.List[0].user.profilePic;
            this.platform = res.List[0].platform;
            this.postType = res.List[0].comments[0].contentType;
            this.profileId = res.List[0].user.id;

            this.platformsArray = [];
            this.facebookComment = false;
            this.instagram = false;
            this.whatsapp = false;
            this.sms = false;
            this.twitterComment = false;
            this.email = false;
            this.youtube = false;
            this.phone = false;
            this.webChat = false;
            this.linkedIn = false;
            this.playStore = false;
            this.platformsArray.push(res.List[0].platform);

            res.List[0].user.secondaryProfiles.forEach((profiles: any) => {
              this.platformsArray.push(profiles.platform);

              if (profiles.platform == 'Facebook') {
                this.facebookId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Instagram') {
                this.instagramId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Email') {
                this.emailId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Twitter') {
                this.twitterId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'LinkedIn') {
                this.linkedInId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Youtube') {
                this.youtubeId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'WhatsApp') {
                this.whatsappId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'WebChat') {
                this.webChatId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'SMS') {
                this.smsId = profiles.customerUniqueId;
              }
            });

            if (this.platformsArray.includes('Facebook')) {
              this.facebookComment = true;
            }
            if (this.platformsArray.includes('Instagram')) {
              this.instagram = true;
            }
            if (this.platformsArray.includes('Email')) {
              this.email = true;
            }
            if (this.platformsArray.includes('WhatsApp')) {
              this.whatsapp = true;
            }
            if (this.platformsArray.includes('WebChat')) {
              this.webChat = true;
            }
            if (this.platformsArray.includes('Twitter')) {
              this.twitterComment = true;
            }
            if (this.platformsArray.includes('Phone')) {
              this.phone = true;
            }
            if (this.platformsArray.includes('LinkedIn')) {
              this.linkedIn = true;
            }
            if (this.platformsArray.includes('PlayStore')) {
              this.playStore = true;
            }
            if (this.platformsArray.includes('Youtube')) {
              this.youtube = true;
            }
            this.FbUnrespondedCmntCountByCustomer = 0;
            this.WtsapUnrespondedCmntCountByCustomer = 0;
            this.WcUnrespondedCmntCountByCustomer = 0;
            this.SmsUnrespondedCmntCountByCustomer = 0;
            this.TwitterUnrespondedCmntCountByCustomer = 0;
            this.InstaUnrespondedCmntCountByCustomer = 0;
            this.EmailUnrespondedCmntCountByCustomer = 0;
            this.YoutubeUnrespondedCmntCountByCustomer = 0;
            this.LinkedInUnrespondedCmntCountByCustomer = 0;
            this.totalFbUnrespondedCountByCustomer = 0;
            this.totalTwitterUnrespondedCountByCustomer = 0;
            // this.FbUnrespondedMsgCountByCustomer = 0;
            // this.TwitterUnrespondedMsgCountByCustomer = 0;

            if (this.fetchId.platform == 'Facebook') {
              this.FbUnrespondedCmntCountByCustomer = res.TotalCount;
              if (this.FbUnrespondedMsgCountByCustomer == undefined) {
                this.totalFbUnrespondedCountByCustomer =
                  this.FbUnrespondedCmntCountByCustomer;
              } else if (this.FbUnrespondedCmntCountByCustomer == undefined) {
                this.totalFbUnrespondedCountByCustomer =
                  this.FbUnrespondedMsgCountByCustomer;
              } else {
                this.totalFbUnrespondedCountByCustomer =
                  this.FbUnrespondedCmntCountByCustomer +
                  this.FbUnrespondedMsgCountByCustomer;
              }
            }
            if (this.fetchId.platform == 'WhatsApp') {
              this.WtsapUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Webchat') {
              this.WcUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'SMS') {
              this.SmsUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Twitter') {
              this.TwitterUnrespondedCmntCountByCustomer = res.TotalCount;
              if (this.TwitterUnrespondedCmntCountByCustomer == undefined) {
                this.totalTwitterUnrespondedCountByCustomer =
                  this.TwitterUnrespondedMsgCountByCustomer;
              } else if (
                this.TwitterUnrespondedMsgCountByCustomer == undefined
              ) {
                this.totalTwitterUnrespondedCountByCustomer =
                  this.TwitterUnrespondedCmntCountByCustomer;
              } else {
                this.totalTwitterUnrespondedCountByCustomer =
                  this.TwitterUnrespondedCmntCountByCustomer +
                  this.TwitterUnrespondedMsgCountByCustomer;
              }
            }
            if (this.fetchId.platform == 'Instagram') {
              this.InstaUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Email') {
              this.EmailUnrespondedCmntCountByCustomer = res.TotalCount;
            }

            if (this.fetchId.platform == 'Youtube') {
              this.YoutubeUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'LinkedIn') {
              this.LinkedInUnrespondedCmntCountByCustomer = res.TotalCount;
            }
          }
        });
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (res != null || res != undefined) {
            this.userId = res.List.user.userId;
            this.profileId = res.List.user.id;
            this.userName = res.List.user.userName || res.List.user.userId;
            this.profilePic = res.List.user.profilePic;
            this.platform = res.List.platform;
            this.postType = res.List.dm.contentType;

            this.platformsArrayForMessages = [];
            this.facebookMessage = false;
            this.twitterMessage = false;
            this.platformsArray.push(res.List.platform);

            res.List.user.secondaryProfiles.forEach((profiles: any) => {
              this.platformsArray.push(profiles.platform);

              if (profiles.platform == 'Facebook') {
                this.facebookId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Instagram') {
                this.instagramId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Email') {
                this.emailId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Twitter') {
                this.twitterId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'LinkedIn') {
                this.linkedInId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Youtube') {
                this.youtubeId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'WhatsApp') {
                this.whatsappId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'WebChat') {
                this.webChatId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'SMS') {
                this.smsId = profiles.customerUniqueId;
              }
            });

            if (this.platformsArray.includes('Facebook')) {
              this.facebookMessage = true;
              this.facebookComment = true;
            }

            if (this.platformsArray.includes('Twitter')) {
              this.twitterMessage = true;
              this.twitterComment = true;
            }
            if (this.platformsArray.includes('Instagram')) {
              this.instagram = true;
            }
            if (this.platformsArray.includes('Email')) {
              this.email = true;
            }
            if (this.platformsArray.includes('WhatsApp')) {
              this.whatsapp = true;
            }
            if (this.platformsArray.includes('WebChat')) {
              this.webChat = true;
            }
            if (this.platformsArray.includes('Phone')) {
              this.phone = true;
            }
            if (this.platformsArray.includes('LinkedIn')) {
              this.linkedIn = true;
            }
            if (this.platformsArray.includes('PlayStore')) {
              this.playStore = true;
            }
            if (this.platformsArray.includes('Youtube')) {
              this.youtube = true;
            }

            this.FbUnrespondedCmntCountByCustomer = 0;
            this.WtsapUnrespondedCmntCountByCustomer = 0;
            this.WcUnrespondedCmntCountByCustomer = 0;
            this.SmsUnrespondedCmntCountByCustomer = 0;
            this.TwitterUnrespondedCmntCountByCustomer = 0;
            this.InstaUnrespondedCmntCountByCustomer = 0;
            this.EmailUnrespondedCmntCountByCustomer = 0;
            this.YoutubeUnrespondedCmntCountByCustomer = 0;
            this.LinkedInUnrespondedCmntCountByCustomer = 0;
            this.totalFbUnrespondedCountByCustomer = 0;
            this.totalTwitterUnrespondedCountByCustomer = 0;
            this.FbUnrespondedMsgCountByCustomer = 0;
            this.TwitterUnrespondedMsgCountByCustomer = 0;

            if (this.fetchId.platform == 'Facebook') {
              this.FbUnrespondedMsgCountByCustomer = res.TotalCount;
              if (this.FbUnrespondedMsgCountByCustomer == undefined) {
                this.totalFbUnrespondedCountByCustomer =
                  this.FbUnrespondedCmntCountByCustomer;
              } else if (this.FbUnrespondedCmntCountByCustomer == undefined) {
                this.totalFbUnrespondedCountByCustomer =
                  this.FbUnrespondedMsgCountByCustomer;
              } else {
                this.totalFbUnrespondedCountByCustomer =
                  this.FbUnrespondedCmntCountByCustomer +
                  this.FbUnrespondedMsgCountByCustomer;
              }
            }
            if (this.fetchId.platform == 'Twitter') {
              this.TwitterUnrespondedMsgCountByCustomer = res.TotalCount;
              if (this.TwitterUnrespondedCmntCountByCustomer == undefined) {
                this.totalTwitterUnrespondedCountByCustomer =
                  this.TwitterUnrespondedMsgCountByCustomer;
              } else if (
                this.TwitterUnrespondedMsgCountByCustomer == undefined
              ) {
                this.totalTwitterUnrespondedCountByCustomer =
                  this.TwitterUnrespondedCmntCountByCustomer;
              } else {
                this.totalTwitterUnrespondedCountByCustomer =
                  this.TwitterUnrespondedCmntCountByCustomer +
                  this.TwitterUnrespondedMsgCountByCustomer;
              }
            }
          }
        });
    } else if (this.fetchId.slaId != null || this.fetchId.slaId != undefined) {
      localStorage.setItem('storeHeaderOpenedId', this.fetchId.slaId);
      this.filterDto = {
        // fromDate: '2000-11-30T08:15:36.365Z',
        // toDate: new Date(),
        user: this.fetchId.slaId,
        pageId: '',
        plateForm: this.fetchId.platform,
        pageNumber: 1,
        pageSize: 10,
        isAttachment: false,
      };
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.userId = res.List[0].user.userId;
        this.userName = res.List[0]?.user.userName || res.List[0]?.user.userId;
        this.profilePic = res.List[0]?.user.profilePic;
        this.platform = res.List[0].platform;
        this.postType = res.List[0].comments[0].contentType;
        this.profileId = res.List[0].user.id;

        this.platformsArray = [];
        this.facebookComment = false;
        this.instagram = false;
        this.whatsapp = false;
        this.sms = false;
        this.twitterComment = false;
        this.email = false;
        this.youtube = false;
        this.phone = false;
        this.webChat = false;
        this.linkedIn = false;
        this.playStore = false;
        this.platformsArray.push(res.List[0].platform);

        res.List[0].user.secondaryProfiles.forEach((profiles: any) => {
          this.platformsArray.push(profiles.platform);
        });

        if (this.platformsArray.includes('Facebook')) {
          this.facebookComment = true;
        }
        if (this.platformsArray.includes('Instagram')) {
          this.instagram = true;
        }
        if (this.platformsArray.includes('Email')) {
          this.email = true;
        }
        if (this.platformsArray.includes('WhatsApp')) {
          this.whatsapp = true;
        }
        if (this.platformsArray.includes('WebChat')) {
          this.webChat = true;
        }
        if (this.platformsArray.includes('Twitter')) {
          this.twitterComment = true;
        }
        if (this.platformsArray.includes('Phone')) {
          this.phone = true;
        }
        if (this.platformsArray.includes('LinkedIn')) {
          this.linkedIn = true;
        }
        if (this.platformsArray.includes('PlayStore')) {
          this.playStore = true;
        }
        if (this.platformsArray.includes('Youtube')) {
          this.youtube = true;
        }

        this.FbUnrespondedCmntCountByCustomer = 0;
        this.WtsapUnrespondedCmntCountByCustomer = 0;
        this.WcUnrespondedCmntCountByCustomer = 0;
        this.SmsUnrespondedCmntCountByCustomer = 0;
        this.TwitterUnrespondedCmntCountByCustomer = 0;
        this.InstaUnrespondedCmntCountByCustomer = 0;
        this.EmailUnrespondedCmntCountByCustomer = 0;
        this.YoutubeUnrespondedCmntCountByCustomer = 0;
        this.LinkedInUnrespondedCmntCountByCustomer = 0;
        this.totalFbUnrespondedCountByCustomer = 0;
        this.totalTwitterUnrespondedCountByCustomer = 0;
        this.FbUnrespondedMsgCountByCustomer = 0;
        this.TwitterUnrespondedMsgCountByCustomer = 0;

        if (this.fetchId.platform == 'Facebook') {
          this.FbUnrespondedCmntCountByCustomer = res.TotalCount;
        }
        if (this.fetchId.platform == 'WhatsApp') {
          this.WtsapUnrespondedCmntCountByCustomer = res.TotalCount;
        }
        if (this.fetchId.platform == 'Webchat') {
          this.WcUnrespondedCmntCountByCustomer = res.TotalCount;
        }
        if (this.fetchId.platform == 'SMS') {
          this.SmsUnrespondedCmntCountByCustomer = res.TotalCount;
        }
        if (this.fetchId.platform == 'Twitter') {
          this.TwitterUnrespondedCmntCountByCustomer = res.TotalCount;
        }
        if (this.fetchId.platform == 'Instagram') {
          this.InstaUnrespondedCmntCountByCustomer = res.TotalCount;
        }
        if (this.fetchId.platform == 'Email') {
          this.EmailUnrespondedCmntCountByCustomer = res.TotalCount;
        }

        if (this.fetchId.platform == 'Youtube') {
          this.YoutubeUnrespondedCmntCountByCustomer = res.TotalCount;
        }
        if (this.fetchId.platform == 'LinkedIn') {
          this.LinkedInUnrespondedCmntCountByCustomer = res.TotalCount;
        }
      });
    } else {
      this.filterDto = {
        // fromDate: '2000-11-30T08:15:36.365Z',
        // toDate: new Date(),
        user: localStorage.getItem('storeHeaderOpenedId') || '{}',
        pageId: '',
        plateForm: localStorage.getItem('parent') || '{}',
        pageNumber: 1,
        pageSize: 10,
        isAttachment: false,
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (res != null || res != undefined) {
            this.userId = res.List.user.userId;
            this.profileId = res.List.user.id;
            this.userName = res.List.user.userName || res.List.user.userId;
            this.profilePic = res.List.user.profilePic;
            this.platform = res.List.platform;
            this.postType = res.List.dm.contentType;

            this.platformsArrayForMessages = [];
            this.facebookMessage = false;
            this.twitterMessage = false;
            this.platformsArray.push(res.List.platform);

            res.List.user.secondaryProfiles.forEach((profiles: any) => {
              this.platformsArray.push(profiles.platform);

              if (profiles.platform == 'Facebook') {
                this.facebookId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Instagram') {
                this.instagramId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Email') {
                this.emailId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Twitter') {
                this.twitterId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'LinkedIn') {
                this.linkedInId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Youtube') {
                this.youtubeId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'WhatsApp') {
                this.whatsappId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'WebChat') {
                this.webChatId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'SMS') {
                this.smsId = profiles.customerUniqueId;
              }
            });

            if (this.platformsArray.includes('Facebook')) {
              this.facebookMessage = true;
              this.facebookComment = true;
            }

            if (this.platformsArray.includes('Twitter')) {
              this.twitterMessage = true;
              this.twitterComment = true;
            }
            if (this.platformsArray.includes('Instagram')) {
              this.instagram = true;
            }
            if (this.platformsArray.includes('Email')) {
              this.email = true;
            }
            if (this.platformsArray.includes('WhatsApp')) {
              this.whatsapp = true;
            }
            if (this.platformsArray.includes('WebChat')) {
              this.webChat = true;
            }
            if (this.platformsArray.includes('Phone')) {
              this.phone = true;
            }
            if (this.platformsArray.includes('LinkedIn')) {
              this.linkedIn = true;
            }
            if (this.platformsArray.includes('PlayStore')) {
              this.playStore = true;
            }
            if (this.platformsArray.includes('Youtube')) {
              this.youtube = true;
            }

            //  this.FbUnrespondedCmntCountByCustomer = 0;
            this.WtsapUnrespondedCmntCountByCustomer = 0;
            this.WcUnrespondedCmntCountByCustomer = 0;
            this.SmsUnrespondedCmntCountByCustomer = 0;
            this.TwitterUnrespondedCmntCountByCustomer = 0;
            this.InstaUnrespondedCmntCountByCustomer = 0;
            this.EmailUnrespondedCmntCountByCustomer = 0;
            this.YoutubeUnrespondedCmntCountByCustomer = 0;
            this.LinkedInUnrespondedCmntCountByCustomer = 0;
            this.totalFbUnrespondedCountByCustomer = 0;
            this.totalTwitterUnrespondedCountByCustomer = 0;
            this.FbUnrespondedMsgCountByCustomer = 0;
            this.TwitterUnrespondedMsgCountByCustomer = 0;

            if (this.fetchId.platform == 'Facebook') {
              this.FbUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'WhatsApp') {
              this.WtsapUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Webchat') {
              this.WcUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'SMS') {
              this.SmsUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Twitter') {
              this.TwitterUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Instagram') {
              this.InstaUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Email') {
              this.EmailUnrespondedCmntCountByCustomer = res.TotalCount;
            }

            if (this.fetchId.platform == 'Youtube') {
              this.YoutubeUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'LinkedIn') {
              this.LinkedInUnrespondedCmntCountByCustomer = res.TotalCount;
            }
          }
        });

      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (res != null || res != undefined) {
            this.userId = res.List[0].user.userId;
            this.userName =
              res.List[0].user.userName || res.List[0].user.userId;
            this.profilePic = res.List[0].user.profilePic;
            this.platform = res.List[0].platform;
            this.postType = res.List[0].comments[0].contentType;
            this.profileId = res.List[0].user.id;

            this.platformsArray = [];
            this.facebookComment = false;
            this.instagram = false;
            this.whatsapp = false;
            this.sms = false;
            this.twitterComment = false;
            this.email = false;
            this.youtube = false;
            this.phone = false;
            this.webChat = false;
            this.linkedIn = false;
            this.playStore = false;
            this.platformsArray.push(res.List[0].platform);

            res.List[0].user.secondaryProfiles.forEach((profiles: any) => {
              this.platformsArray.push(profiles.platform);

              if (profiles.platform == 'Facebook') {
                this.facebookId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Instagram') {
                this.instagramId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Email') {
                this.emailId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Twitter') {
                this.twitterId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'LinkedIn') {
                this.linkedInId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'Youtube') {
                this.youtubeId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'WhatsApp') {
                this.whatsappId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'WebChat') {
                this.webChatId = profiles.customerUniqueId;
              }
              if (profiles.platform == 'SMS') {
                this.smsId = profiles.customerUniqueId;
              }
            });

            if (this.platformsArray.includes('Facebook')) {
              this.facebookComment = true;
            }
            if (this.platformsArray.includes('Instagram')) {
              this.instagram = true;
            }
            if (this.platformsArray.includes('Email')) {
              this.email = true;
            }
            if (this.platformsArray.includes('WhatsApp')) {
              this.whatsapp = true;
            }
            if (this.platformsArray.includes('WebChat')) {
              this.webChat = true;
            }
            if (this.platformsArray.includes('Twitter')) {
              this.twitterComment = true;
            }
            if (this.platformsArray.includes('Phone')) {
              this.phone = true;
            }
            if (this.platformsArray.includes('LinkedIn')) {
              this.linkedIn = true;
            }
            if (this.platformsArray.includes('PlayStore')) {
              this.playStore = true;
            }
            if (this.platformsArray.includes('Youtube')) {
              this.youtube = true;
            }
            this.FbUnrespondedCmntCountByCustomer = 0;
            this.WtsapUnrespondedCmntCountByCustomer = 0;
            this.WcUnrespondedCmntCountByCustomer = 0;
            this.SmsUnrespondedCmntCountByCustomer = 0;
            this.TwitterUnrespondedCmntCountByCustomer = 0;
            this.InstaUnrespondedCmntCountByCustomer = 0;
            this.EmailUnrespondedCmntCountByCustomer = 0;
            this.YoutubeUnrespondedCmntCountByCustomer = 0;
            this.LinkedInUnrespondedCmntCountByCustomer = 0;
            this.totalFbUnrespondedCountByCustomer = 0;
            this.totalTwitterUnrespondedCountByCustomer = 0;
            this.FbUnrespondedMsgCountByCustomer = 0;
            this.TwitterUnrespondedMsgCountByCustomer = 0;

            if (this.fetchId.platform == 'Facebook') {
              this.FbUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'WhatsApp') {
              this.WtsapUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Webchat') {
              this.WcUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'SMS') {
              this.SmsUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Twitter') {
              this.TwitterUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Instagram') {
              this.InstaUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'Email') {
              this.EmailUnrespondedCmntCountByCustomer = res.TotalCount;
            }

            if (this.fetchId.platform == 'Youtube') {
              this.YoutubeUnrespondedCmntCountByCustomer = res.TotalCount;
            }
            if (this.fetchId.platform == 'LinkedIn') {
              this.LinkedInUnrespondedCmntCountByCustomer = res.TotalCount;
            }
          }
        });
    }
    this.SpinnerService.hide();
  }

  AgentsTeamList: any;
  AgentDetails: any;

  ActiveAgents: any[] = [];
  getAgentsTeamList() {
    debugger
    this.commondata.GetAgentsTeamList().subscribe((res: any) => {
      this.AgentsTeamList = res;
      this.ActiveAgents = []
      this.AgentsTeamList.forEach((user:any) => {
        if(user.userId != localStorage.getItem('agentId')){
          this.ActiveAgents.push(user)
        }
      });
    });
  }

  getAgentById() {
    this.commondata.GetAgentById(this.agentId).subscribe((res: any) => {
      this.AgentDetails = res;
    });
  }

  markAsCompleteDto = new MarkAsCompleteDto();

  markAsComplete(plateForm: any, userId: any) {
    
    this.markAsCompleteDto.user = userId;
    this.markAsCompleteDto.plateFrom = plateForm;
    this.markAsCompleteDto.userId = Number(localStorage.getItem('agentId'))

    this.commondata.MarkAsComplete(this.markAsCompleteDto).subscribe(
      (res: any) => {
        if (res.message === 'Success Responded') {
          //   this.route.navigateByUrl('/all-inboxes/conversation');
          this.toggleService.updateDispositionForm('disposition-form');
        }
      },
      (error) => {
        this.reloadComponent('completeAllQuerries');
        if (error.status === 400) {
        }
      }
    );
  }

  openedTab() {
    
   // if(this.assignedProfile == null || this.assignedProfile == '' || this.assignedProfile == undefined){
    if (this.postType == 'IC') {
      this.facebookTab = false;
      this.instagramTab = true;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'FC') {
      this.facebookTab = true;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'FCP') {
      this.facebookTab = true;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'TT') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = true;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'TM') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = true;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'Message') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = true;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'Mail') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = true;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'YC') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = true;
      this.phoneTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'WM') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = true;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'SMS') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = true;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'Phone') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = true;
      this.webChatTab = false;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'WC') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = true;
      this.linkedInTab = false;
      this.playStoreTab = false;
    }
    if (this.postType == 'LIC') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab = true;
      this.playStoreTab = false;
    }
  // } else {
  //   this.reloadComponent('querryAssigned')
  // }
  }

  showAgentsList: boolean = false;
  showMoreOptions: boolean = false;
  showTeamList() {
    this.getAgentsTeamList();
    this.showAgentsList = true;
    this.showMoreOptions = false;
  }

  hideTeamList() {
    this.showAgentsList = false;
    this.showMoreOptions = true;
  }
  closeTeamList() {
    this.showAgentsList = false;
    this.showMoreOptions = false;
  }

  customerProfileId = Number(localStorage.getItem('profileId'));
  sendAgentId(id: string, platform: string) {
    this.assignQuerryDto = {
      userId: Number(localStorage.getItem('agentId')),
      // agentId: 2,
      profileId: this.customerProfileId,
      agentIds: id.toString(),
      platform: platform,
    };
  }
  assignToAnotherAgent() {
    this.commondata.AssignToAnotherAgent(this.assignQuerryDto).subscribe(
      (res: any) => {
        this.reloadComponent('queryallocatedtoanotheruser');
        //  alert(res.message);
        this.closeTeamList();
      },
      (error) => {
        
        if(error.error.message === "User Information Not added Team"){
          this.reloadComponent('noAgentSelected');
        };
      }
    );
  }
  AlterMsg: any;
  toastermessage = false;
  reloadComponent(type: any) {
    if (type == 'noAgentSelected') {
      this.AlterMsg = 'No Agent Selected!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'querryAssigned') {
      this.AlterMsg = 'Please Complete Querry First!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'markAllAsRead') {
      this.AlterMsg = 'All Queries has been marked as Read';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'alreadyAllQueriesMarkedRead') {
      this.AlterMsg = 'No Unresponded Querry Found!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'completeAllQuerries') {
      this.AlterMsg =
        'Please respond to all querries before marking as complete';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'queryallocatedtoanotheruser') {
      this.AlterMsg = 'Profile Already Allocated to Another Aggent';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'queryallocated') {
      this.AlterMsg = 'Querry Assigned Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'comment') {
      this.AlterMsg = 'Comment Send Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'fbmessage') {
      this.AlterMsg = 'Message Send Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'ApplyTag') {
      this.AlterMsg = 'Tag Apply Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'RemoveTag') {
      this.AlterMsg = 'Tag Removed Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'Sentiment') {
      this.AlterMsg = 'Sentiment Apply Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'Like') {
      this.AlterMsg = 'Liked Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'disLike') {
      this.AlterMsg = 'Dislike Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }
  markAllAsRead() {
    this.commonService.MarkAllAsRead(this.customerProfileId).subscribe(
      (res: any) => {
        this.reloadComponent('markAllAsRead');
        this.FbUnrespondedCmntCountByCustomer = 0;
            this.WtsapUnrespondedCmntCountByCustomer = 0;
            this.WcUnrespondedCmntCountByCustomer = 0;
            this.SmsUnrespondedCmntCountByCustomer = 0;
            this.TwitterUnrespondedCmntCountByCustomer = 0;
            this.InstaUnrespondedCmntCountByCustomer = 0;
            this.EmailUnrespondedCmntCountByCustomer = 0;
            this.YoutubeUnrespondedCmntCountByCustomer = 0;
            this.LinkedInUnrespondedCmntCountByCustomer = 0;
            this.totalFbUnrespondedCountByCustomer = 0;
            this.totalTwitterUnrespondedCountByCustomer = 0;
            this.FbUnrespondedMsgCountByCustomer = 0;
            this.TwitterUnrespondedMsgCountByCustomer = 0;
      },
      (error: any) => {
        this.reloadComponent('alreadyAllQueriesMarkedRead');
      }
    );
  }
}
