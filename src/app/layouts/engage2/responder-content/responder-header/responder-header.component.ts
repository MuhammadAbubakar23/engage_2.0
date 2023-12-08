import {
  AfterViewInit,
  Component,
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
import { HeaderCountService } from 'src/app/services/headerCountService/header-count.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UpdateMessagesService } from 'src/app/services/UpdateMessagesService/update-messages.service';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { AssignQuerryDto } from 'src/app/shared/Models/AssignQuerryDto';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { DraftDto } from 'src/app/shared/Models/DraftDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { HeaderDto } from 'src/app/shared/Models/HeaderDto';
import { MarkAsCompleteDto } from 'src/app/shared/Models/MarkAsCompleteDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Location } from '@angular/common';

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
  // FbUnrespondedCmntCountByCustomer: number = 0;
  // WtsapUnrespondedCmntCountByCustomer: number = 0;
  // WcUnrespondedCmntCountByCustomer: number = 0;
  // SmsUnrespondedCmntCountByCustomer: number = 0;
  // TwitterUnrespondedCmntCountByCustomer: number = 0;
  // InstaUnrespondedCmntCountByCustomer: number = 0;
  // EmailUnrespondedCmntCountByCustomer: number = 0;
  // YoutubeUnrespondedCmntCountByCustomer: number = 0;
  // LinkedInUnrespondedCmntCountByCustomer: number = 0;

  // FbUnrespondedMsgCountByCustomer: number = 0;
  // TwitterUnrespondedMsgCountByCustomer: number = 0;
  // InstaUnrespondedMsgCountByCustomer: number = 0;

  // TwitterUnrespondedMentionCountByCustomer: number = 0;

  // totalFbUnrespondedCountByCustomer: number = 0;
  // totalInstaUnrespondedCountByCustomer: number = 0;
  // totalTwitterUnrespondedCountByCustomer: number = 0;

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

  currentUrl: string = '';
  flag: string = '';
  flag2: string = '';
  teamPermissions: any;

  constructor(
    private fetchId: FetchIdService,
    private route: Router,
    private fetchposttype: FetchPostTypeService,
    private _route: Router,
    private commondata: CommonDataService,
    private loadModuleService: ModulesService,
    private commonService: CommonDataService,
    private unrespondedCountService: UnRespondedCountService,
    private updateCommentsService: UpdateCommentsService,
    private updateMessagesService: UpdateMessagesService,
    private toggleService: ToggleService,
    private lodeModuleService: ModulesService,
    private store: StorageService,
    private userInfoService: UserInformationService,
    private headerCountService: HeaderCountService,
    private stor: StorageService,
    private queryStatusService: QueryStatusService,
    private location: Location
  ) {}
  unrespondedCount: number = 0;
  userInfo: any;
  activeChannel: string = '';
  finalStatus: any[] = [];
  profileStatus: any[] = [];
  baseURL: string = '';
  KEBaseUrl: boolean = false;

  ngOnInit(): void {
    this.baseURL = window.location.origin;
    if (this.activeChannel == 'https://keportal.enteract.live/') {
      this.KEBaseUrl = true;
    }
    this.flag = this._route.url.split('/')[2];
    this.flag2 = this._route.url.split('/')[3];
    this.activeChannel = this._route.url.split('/')[5];
    this.currentUrl = this._route.url;

    this.Subscription = this.userInfoService.userInfo$.subscribe((userInfo) => {
      if (userInfo != null) {
        this.userInfo = userInfo;
        localStorage.setItem('storeHeaderOpenedId', this.userInfo.userId);
      }
    });
    this.Subscription = this.headerCountService.count$.subscribe((count) => {
      if (count != null) {
        this.unrespondedCount = count;
        // localStorage.setItem('unrespondedCount', this.userInfo.userId);
      }
    });

    if (this.userInfo == undefined) {
      this.userInfo = this.stor.retrive('userInfo', 'O').local;
    }

    const menu = this.stor.retrive('Tags', 'O').local;
    menu.forEach((item: any) => {
      if (item.name == 'Final Status') {
        item.subTags.forEach((finalStatusObj: any) => {
          debugger
          if (this.KEBaseUrl == true) {
            if (finalStatusObj.name != 'Read') {
              if (!this.finalStatus.includes(finalStatusObj)) {
                this.finalStatus.push(finalStatusObj);
              }
            }
          } else {
            if (!this.finalStatus.includes(finalStatusObj)) {
              this.finalStatus.push(finalStatusObj);
            }
          }
        });
      }
      if (item.name == 'Profile Status') {
        item.subTags.forEach((profileStatusObj: any) => {
          if (!this.profileStatus.includes(profileStatusObj)) {
            this.profileStatus.push(profileStatusObj);
          }
        });
      }
    });

    this.teamPermissions = this.store.retrive('permissionteam', 'O').local;
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
      (tooltipNode) => new Tooltip(tooltipNode)
    ),
      {
        trigger: 'hover',
      };

    this.Subscription = this.updateMessagesService
      .receiveMessage()
      .subscribe((res) => {
        if (Object.keys(res).length > 0) {
          res.forEach((msg: any) => {
            if (this.userInfo.userId == msg.fromId) {
              // if (this.userInfo.postType == msg.contentType) {
              this.unrespondedCount = this.unrespondedCount + 1;
              // }
            }
          });
        }
      });

    this.Subscription = this.updateCommentsService
      .receiveComment()
      .subscribe((res) => {
        if (this.flag == 'focused' || this.flag == 'assigned_to_me') {
          if (Object.keys(res).length > 0) {
            res.forEach((msg: any) => {
              if (this.userInfo.userId == msg.userId) {
                // if (this.userInfo.postType == msg.contentType) {
                this.unrespondedCount = this.unrespondedCount + 1;
                // }
              }
            });
          }
        }
      });

    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        if (this.flag == 'focused' || this.flag == 'assigned_to_me') {
          if (Object.keys(res).length > 0) {
            if (this.userInfo.id == res.contentCount.profileId) {
              // if (this.userInfo.postType == res.contentCount.contentType) {
              this.unrespondedCount = res.contentCount.unrespondedCount;
              // }
            }
          }
        }
      });

    this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        if (this.flag == 'focused' || this.flag == 'assigned_to_me') {
          if (Object.keys(res).length > 0) {
            if (this.userInfo.id == localStorage.getItem('assignedProfile')) {
              this.unrespondedCount = 0;
            }
          }
        }
      });
  }

  draftDto = new DraftDto();
  assignedProfile = localStorage.getItem('assignedProfile');

  updatevalue(id: any, platform: any) {
    if (platform == 'WhatsApp' && this.WhatsappData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = this.WhatsappData?.id;

        this.assignQuerry(id, platform);
      });
    }
    if (platform == 'Facebook' && this.FacebookData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res?.id;

        this.assignQuerry(id, platform);
      });
    }
    if (platform == 'Instagram' && this.InstagramData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res?.id;

        this.assignQuerry(id, platform);
      });
    }
    if (platform == 'Twitter' && this.TwitterData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res?.id;

        this.assignQuerry(id, platform);
      });
    }
    if (platform == 'LinkedIn' && this.LinkedinData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res?.id;

        this.assignQuerry(id, platform);
      });
    }
    if (platform == 'WebChat' && this.WebchatData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res?.id;

        this.assignQuerry(id, platform);
      });
    }
    if (platform == 'SMS' && this.SmsData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res?.id;

        this.assignQuerry(id, platform);
      });
    }
    if (platform == 'Email' && this.EmailData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res?.id;

        this.assignQuerry(id, platform);
      });
    }
    if (platform == 'OfficeEmail' && this.OfficeMailData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res?.id;

        this.assignQuerry(id, platform);
      });
    }
    if (platform == 'Youtube' && this.YoutubeData?.List.length > 0) {
      this.commonService.GetProfileDetails(id).subscribe((res: any) => {
        this.profileId = res?.id;

        this.assignQuerry(id, platform);
      });
    }
  }

  assignQuerry(id: any, platform: any) {
    this.assignQuerryDto = {
      userId: Number(localStorage.getItem('agentId')),
      profileId: this.profileId,
      agentIds: 'string',
      platform: platform,
    };

    if (this.assignQuerryDto != null) {
      this.commondata.AssignQuerry(this.assignQuerryDto).subscribe(
        (res: any) => {
          this.reloadComponent('queryallocated');
          this._route.navigateByUrl(
            '/all-inboxes/' +
              this.flag +
              '/' +
              this.flag2 +
              '/responder/' +
              platform
          );

          this.fetchId.setPlatform(platform);
          this.fetchId.setOption(id);
          localStorage.setItem('profileId', this.profileId);
        },
        (_error) => {
          this.reloadComponent('queryallocatedtoanotheruser');
        }
      );
    }
  }

  // minimizeChat() {
  //   if (this.fetchId.platform == 'Facebook') {
  //     this.totalCount = this.FbUnrespondedCmntCountByCustomer;
  //   }
  //   if (this.fetchId.platform == 'WhatsApp') {
  //     this.totalCount = this.WtsapUnrespondedCmntCountByCustomer;
  //   }
  //   if (this.fetchId.platform == 'Webchat') {
  //     this.totalCount = this.WcUnrespondedCmntCountByCustomer;
  //   }
  //   if (this.fetchId.platform == 'SMS') {
  //     this.totalCount = this.SmsUnrespondedCmntCountByCustomer;
  //   }
  //   if (this.fetchId.platform == 'Twitter') {
  //     this.totalCount = this.TwitterUnrespondedCmntCountByCustomer;
  //   }
  //   if (this.fetchId.platform == 'Instagram') {
  //     this.totalCount = this.InstaUnrespondedCmntCountByCustomer;
  //   }
  //   if (
  //     this.fetchId.platform == 'Email' ||
  //     this.fetchId.platform == 'OfficeEmail'
  //   ) {
  //     this.totalCount = this.EmailUnrespondedCmntCountByCustomer;
  //   }

  //   if (this.fetchId.platform == 'Youtube') {
  //     this.totalCount = this.YoutubeUnrespondedCmntCountByCustomer;
  //   }
  //   if (this.fetchId.platform == 'LinkedIn') {
  //     this.totalCount = this.LinkedInUnrespondedCmntCountByCustomer;
  //   }

  //   this.draftDto = {
  //     userId: this.userId,
  //     userName: this.userName,
  //     profilePic: this.profilePic,
  //     platform: this.platform,
  //     postType: this.queryType,
  //     totalCount: this.totalCount,
  //   };
  //   this._sharedService.sendUserInfo(this.draftDto);
  // }

  platform: any;
  userId: string = '';
  userName: any;
  profilePic: any;
  queryType = this.fetchposttype.postType;
  totalCount: any;
  id = this.fetchId.id;
  profileId: any;

  FacebookData: any;
  InstagramData: any;
  TwitterData: any;
  YoutubeData: any;
  EmailData: any;
  OfficeMailData: any;
  WhatsappData: any;
  SmsData: any;
  WebchatData: any;
  LinkedinData: any;

  // getSecondaryProfileDetails(id: string, platform: string) {
  //   this.filterDto = {
  //     user: id,
  //     pageId: '',
  //     plateForm: platform,
  //     pageNumber: 1,
  //     pageSize: 10,
  //     isAttachment: false,
  //     queryType: '',
  //     text: '',
  //     userName: '',
  //     notInclude: '',
  //     include: '',
  //     flag: '',
  //   };
  //   this.commondata
  //     .GetChannelConversationDetail(this.filterDto)
  //     .subscribe((res: any) => {
  //       if (Object.keys(res).length > 0) {
  //         // if (res != null || res != undefined) {
  //         //   this.userId = res.List[0].user.userId;
  //         //   this.userName =
  //         //     res.List[0].user.userName || res.List[0].user.userId;
  //         //   this.profilePic = res.List[0].user.profilePic;
  //         //   this.platform = res.List[0].platform;
  //         //   this.postType = res.List[0].comments[0].contentType;
  //         //   this.profileId = res.List[0].user.id;

  //         //   this.platformsArray = [];
  //         //   this.facebookComment = false;
  //         //   this.instagram = false;
  //         //   this.whatsapp = false;
  //         //   this.sms = false;
  //         //   this.twitterComment = false;
  //         //   this.email = false;
  //         //   this.youtube = false;
  //         //   this.phone = false;
  //         //   this.webChat = false;
  //         //   this.linkedIn = false;
  //         //   this.playStore = false;
  //         //   this.platformsArray.push(res.List[0].platform);

  //         //   res.List[0].user.secondaryProfiles.forEach((profiles: any) => {
  //         //     this.platformsArray.push(profiles.platform);

  //         //     if (profiles.platform == 'Facebook') {
  //         //       this.facebookId = profiles.customerUniqueId;
  //         //     }
  //         //     if (profiles.platform == 'Instagram') {
  //         //       this.instagramId = profiles.customerUniqueId;
  //         //     }
  //         //     if (profiles.platform == 'Email' || profiles.platform == 'OfficeEmail') {
  //         //       this.emailId = profiles.customerUniqueId;
  //         //     }
  //         //     if (profiles.platform == 'Twitter') {
  //         //       this.twitterId = profiles.customerUniqueId;
  //         //     }
  //         //     if (profiles.platform == 'LinkedIn') {
  //         //       this.linkedInId = profiles.customerUniqueId;
  //         //     }
  //         //     if (profiles.platform == 'Youtube') {
  //         //       this.youtubeId = profiles.customerUniqueId;
  //         //     }
  //         //     if (profiles.platform == 'WhatsApp') {
  //         //       this.whatsappId = profiles.customerUniqueId;
  //         //     }
  //         //     if (profiles.platform == 'WebChat') {
  //         //       this.webChatId = profiles.customerUniqueId;
  //         //     }
  //         //     if (profiles.platform == 'SMS') {
  //         //       this.smsId = profiles.customerUniqueId;
  //         //     }
  //         //   });

  //         //   if (this.platformsArray.includes('Facebook')) {
  //         //     this.facebookComment = true;
  //         //   }
  //         //   if (this.platformsArray.includes('SMS')) {
  //         //     this.sms = true;
  //         //   }
  //         //   if (this.platformsArray.includes('Instagram')) {
  //         //     this.instagram = true;
  //         //   }
  //         //   if (this.platformsArray.includes('Email') || this.platformsArray.includes('OfficeEmail')) {
  //         //     this.email = true;
  //         //   }
  //         //   if (this.platformsArray.includes('WhatsApp')) {
  //         //     this.whatsapp = true;
  //         //   }
  //         //   if (this.platformsArray.includes('WebChat')) {
  //         //     this.webChat = true;
  //         //   }
  //         //   if (this.platformsArray.includes('Twitter')) {
  //         //     this.twitterComment = true;
  //         //   }
  //         //   if (this.platformsArray.includes('Phone')) {
  //         //     this.phone = true;
  //         //   }
  //         //   if (this.platformsArray.includes('LinkedIn')) {
  //         //     this.linkedIn = true;
  //         //   }
  //         //   if (this.platformsArray.includes('PlayStore')) {
  //         //     this.playStore = true;
  //         //   }
  //         //   if (this.platformsArray.includes('Youtube')) {
  //         //     this.youtube = true;
  //         //   }
  //         //   this.FbUnrespondedCmntCountByCustomer = 0;
  //         //   this.WtsapUnrespondedCmntCountByCustomer = 0;
  //         //   this.WcUnrespondedCmntCountByCustomer = 0;
  //         //   this.SmsUnrespondedCmntCountByCustomer = 0;
  //         //   this.TwitterUnrespondedCmntCountByCustomer = 0;
  //         //   this.InstaUnrespondedCmntCountByCustomer = 0;
  //         //   this.EmailUnrespondedCmntCountByCustomer = 0;
  //         //   this.YoutubeUnrespondedCmntCountByCustomer = 0;
  //         //   this.LinkedInUnrespondedCmntCountByCustomer = 0;
  //         //   this.totalFbUnrespondedCountByCustomer = 0;
  //         //   this.totalTwitterUnrespondedCountByCustomer = 0;
  //         //   this.totalInstaUnrespondedCountByCustomer = 0;
  //         //   // this.FbUnrespondedMsgCountByCustomer = 0;
  //         //   // this.TwitterUnrespondedMsgCountByCustomer = 0;
  //         //   this.InstaUnrespondedMsgCountByCustomer = 0;

  //         //   if (this.fetchId.platform == 'Facebook') {
  //         //     this.FbUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //     if (this.FbUnrespondedMsgCountByCustomer == 0) {
  //         //       this.totalFbUnrespondedCountByCustomer =
  //         //         this.FbUnrespondedCmntCountByCustomer;
  //         //     } else if (this.FbUnrespondedCmntCountByCustomer == 0) {
  //         //       this.totalFbUnrespondedCountByCustomer =
  //         //         this.FbUnrespondedMsgCountByCustomer;
  //         //     } else {
  //         //       this.totalFbUnrespondedCountByCustomer =
  //         //         this.FbUnrespondedCmntCountByCustomer +
  //         //         this.FbUnrespondedMsgCountByCustomer;
  //         //     }
  //         //   }
  //         //   if (this.fetchId.platform == 'WhatsApp') {
  //         //     this.WtsapUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //   }
  //         //   if (this.fetchId.platform == 'Webchat') {
  //         //     this.WcUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //   }
  //         //   if (this.fetchId.platform == 'SMS') {

  //         //     this.SmsUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //   }
  //         //   if (this.fetchId.platform == 'Twitter') {
  //         //     this.TwitterUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //     if (this.TwitterUnrespondedCmntCountByCustomer == 0) {
  //         //       this.totalTwitterUnrespondedCountByCustomer =
  //         //         this.TwitterUnrespondedMsgCountByCustomer;
  //         //     } else if (
  //         //       this.TwitterUnrespondedMsgCountByCustomer == 0
  //         //     ) {
  //         //       this.totalTwitterUnrespondedCountByCustomer =
  //         //         this.TwitterUnrespondedCmntCountByCustomer;
  //         //     } else {
  //         //       this.totalTwitterUnrespondedCountByCustomer =
  //         //         this.TwitterUnrespondedCmntCountByCustomer +
  //         //         this.TwitterUnrespondedMsgCountByCustomer;
  //         //     }
  //         //   }
  //         //   // if (this.fetchId.platform == 'Instagram') {
  //         //   //   this.InstaUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //   // }

  //         //   if (this.fetchId.platform == 'Instagram') {
  //         //     this.InstaUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //     if (this.InstaUnrespondedMsgCountByCustomer == 0) {
  //         //       this.totalInstaUnrespondedCountByCustomer =
  //         //         this.InstaUnrespondedCmntCountByCustomer;
  //         //     } else if (this.InstaUnrespondedCmntCountByCustomer == 0) {
  //         //       this.totalInstaUnrespondedCountByCustomer =
  //         //         this.InstaUnrespondedMsgCountByCustomer;
  //         //     } else {
  //         //       this.totalInstaUnrespondedCountByCustomer =
  //         //         this.InstaUnrespondedCmntCountByCustomer +
  //         //         this.InstaUnrespondedMsgCountByCustomer;
  //         //     }
  //         //   }

  //         //   if (this.fetchId.platform == 'Email' || this.fetchId.platform == 'OfficeEmail') {
  //         //     this.EmailUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //   }

  //         //   if (this.fetchId.platform == 'Youtube') {
  //         //     this.YoutubeUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //   }
  //         //   if (this.fetchId.platform == 'LinkedIn') {
  //         //     this.LinkedInUnrespondedCmntCountByCustomer = res.TotalCount;
  //         //   }
  //         // }
  //         if (res != null || res != undefined) {
  //           if (platform == 'Facebook') {
  //             this.FacebookData = res;
  //             this.totalFbUnrespondedCountByCustomer =
  //               this.FacebookData.TotalCount;
  //           }
  //           if (platform == 'Instagram') {
  //             this.InstagramData = res;
  //             this.totalInstaUnrespondedCountByCustomer =
  //               this.InstagramData.TotalCount;
  //           }
  //           if (platform == 'Email' || platform == 'OfficeEmail') {
  //             this.EmailData = res;
  //             this.EmailUnrespondedCmntCountByCustomer =
  //               this.EmailData.TotalCount;
  //           }
  //           if (platform == 'Twitter') {
  //             this.TwitterData = res;
  //             this.totalTwitterUnrespondedCountByCustomer =
  //               this.TwitterData.TotalCount;
  //           }
  //           if (platform == 'LinkedIn') {
  //             this.LinkedinData = res;
  //             this.LinkedInUnrespondedCmntCountByCustomer =
  //               this.LinkedinData.TotalCount;
  //           }
  //           if (platform == 'Youtube') {
  //             this.YoutubeData = res;
  //             this.YoutubeUnrespondedCmntCountByCustomer =
  //               this.YoutubeData.TotalCount;
  //           }
  //           if (platform == 'WhatsApp') {
  //             this.WhatsappData = res;
  //             this.WtsapUnrespondedCmntCountByCustomer =
  //               this.WhatsappData.TotalCount;
  //           }
  //           if (platform == 'WebChat') {
  //             this.WebchatData = res;
  //             this.WcUnrespondedCmntCountByCustomer =
  //               this.WebchatData.TotalCount;
  //           }
  //           if (platform == 'SMS') {
  //             this.SmsData = res;
  //             this.SmsUnrespondedCmntCountByCustomer = this.SmsData.TotalCount;
  //           }
  //         }
  //       }
  //     });
  //   // this.commondata
  //   //   .GetChannelMessageDetail(this.filterDto)
  //   //   .subscribe((res: any) => {
  //   //     // if (Object.keys(res).length > 0) {
  //   //     //   this.userId = res.List?.user.userId;
  //   //     //   this.profileId = res.List?.user.id;
  //   //     //   this.userName = res.List?.user.userName || res.List?.user.userId;
  //   //     //   this.profilePic = res.List?.user.profilePic;
  //   //     //   this.platform = res.List?.platform;
  //   //     //   this.postType = res.List?.dm.contentType;

  //   //     //   this.platformsArrayForMessages = [];
  //   //     //   this.facebookMessage = false;
  //   //     //   this.twitterMessage = false;
  //   //     //   this.platformsArray.push(res.List?.platform);

  //   //     //   res.List?.user.secondaryProfiles.forEach((profiles: any) => {
  //   //     //     this.platformsArray.push(profiles.platform);

  //   //     //     if (profiles.platform == 'Facebook') {
  //   //     //       this.facebookId = profiles.customerUniqueId;
  //   //     //     }
  //   //     //     if (profiles.platform == 'Instagram') {
  //   //     //       this.instagramId = profiles.customerUniqueId;
  //   //     //     }
  //   //     //     if (profiles.platform == 'Email' || profiles.platform == 'OfficeEmail') {
  //   //     //       this.emailId = profiles.customerUniqueId;
  //   //     //     }
  //   //     //     if (profiles.platform == 'Twitter') {
  //   //     //       this.twitterId = profiles.customerUniqueId;
  //   //     //     }
  //   //     //     if (profiles.platform == 'LinkedIn') {
  //   //     //       this.linkedInId = profiles.customerUniqueId;
  //   //     //     }
  //   //     //     if (profiles.platform == 'Youtube') {
  //   //     //       this.youtubeId = profiles.customerUniqueId;
  //   //     //     }
  //   //     //     if (profiles.platform == 'WhatsApp') {
  //   //     //       this.whatsappId = profiles.customerUniqueId;
  //   //     //     }
  //   //     //     if (profiles.platform == 'WebChat') {
  //   //     //       this.webChatId = profiles.customerUniqueId;
  //   //     //     }
  //   //     //     if (profiles.platform == 'SMS') {
  //   //     //       this.smsId = profiles.customerUniqueId;
  //   //     //     }
  //   //     //   });

  //   //     //   if (this.platformsArray.includes('Facebook')) {
  //   //     //     this.facebookMessage = true;
  //   //     //     this.facebookComment = true;
  //   //     //   }
  //   //     //   if (this.platformsArray.includes('SMS')) {
  //   //     //     this.sms = true;
  //   //     //   }

  //   //     //   if (this.platformsArray.includes('Twitter')) {
  //   //     //     this.twitterMessage = true;
  //   //     //     this.twitterComment = true;
  //   //     //   }
  //   //     //   if (this.platformsArray.includes('Instagram')) {
  //   //     //     this.instagram = true;
  //   //     //   }
  //   //     //   if (this.platformsArray.includes('Email') || this.platformsArray.includes('OfficeEmail')) {
  //   //     //     this.email = true;
  //   //     //   }
  //   //     //   if (this.platformsArray.includes('WhatsApp')) {
  //   //     //     this.whatsapp = true;
  //   //     //   }
  //   //     //   if (this.platformsArray.includes('WebChat')) {
  //   //     //     this.webChat = true;
  //   //     //   }
  //   //     //   if (this.platformsArray.includes('Phone')) {
  //   //     //     this.phone = true;
  //   //     //   }
  //   //     //   if (this.platformsArray.includes('LinkedIn')) {
  //   //     //     this.linkedIn = true;
  //   //     //   }
  //   //     //   if (this.platformsArray.includes('PlayStore')) {
  //   //     //     this.playStore = true;
  //   //     //   }
  //   //     //   if (this.platformsArray.includes('Youtube')) {
  //   //     //     this.youtube = true;
  //   //     //   }

  //   //     //   // this.FbUnrespondedCmntCountByCustomer = 0;
  //   //     //   this.WtsapUnrespondedCmntCountByCustomer = 0;
  //   //     //   this.WcUnrespondedCmntCountByCustomer = 0;
  //   //     //   this.SmsUnrespondedCmntCountByCustomer = 0;
  //   //     //   // this.TwitterUnrespondedCmntCountByCustomer = 0;
  //   //     //   // this.InstaUnrespondedCmntCountByCustomer = 0;
  //   //     //   this.InstaUnrespondedMsgCountByCustomer = 0;
  //   //     //   this.EmailUnrespondedCmntCountByCustomer = 0;
  //   //     //   this.YoutubeUnrespondedCmntCountByCustomer = 0;
  //   //     //   this.LinkedInUnrespondedCmntCountByCustomer = 0;
  //   //     //   this.totalFbUnrespondedCountByCustomer = 0;
  //   //     //   this.totalInstaUnrespondedCountByCustomer = 0
  //   //     //   this.totalTwitterUnrespondedCountByCustomer = 0;
  //   //     //   this.FbUnrespondedMsgCountByCustomer = 0;
  //   //     //   this.TwitterUnrespondedMsgCountByCustomer = 0;

  //   //     //   if (this.fetchId.platform == 'Facebook') {
  //   //     //     this.FbUnrespondedMsgCountByCustomer = res.TotalCount;
  //   //     //     if (this.FbUnrespondedMsgCountByCustomer == 0) {
  //   //     //       this.totalFbUnrespondedCountByCustomer =
  //   //     //         this.FbUnrespondedCmntCountByCustomer;
  //   //     //     } else if (this.FbUnrespondedCmntCountByCustomer == 0) {
  //   //     //       this.totalFbUnrespondedCountByCustomer =
  //   //     //         this.FbUnrespondedMsgCountByCustomer;
  //   //     //     } else {
  //   //     //       this.totalFbUnrespondedCountByCustomer =
  //   //     //         this.FbUnrespondedCmntCountByCustomer +
  //   //     //         this.FbUnrespondedMsgCountByCustomer;
  //   //     //     }
  //   //     //   }
  //   //     //   if (this.fetchId.platform == 'Twitter') {
  //   //     //     this.TwitterUnrespondedMsgCountByCustomer = res.TotalCount;
  //   //     //     if (this.TwitterUnrespondedCmntCountByCustomer == 0) {
  //   //     //       this.totalTwitterUnrespondedCountByCustomer =
  //   //     //         this.TwitterUnrespondedMsgCountByCustomer;
  //   //     //     } else if (
  //   //     //       this.TwitterUnrespondedMsgCountByCustomer == 0
  //   //     //     ) {
  //   //     //       this.totalTwitterUnrespondedCountByCustomer =
  //   //     //         this.TwitterUnrespondedCmntCountByCustomer;
  //   //     //     } else {
  //   //     //       this.totalTwitterUnrespondedCountByCustomer =
  //   //     //         this.TwitterUnrespondedCmntCountByCustomer +
  //   //     //         this.TwitterUnrespondedMsgCountByCustomer;
  //   //     //     }
  //   //     //   }
  //   //     //   if (this.fetchId.platform == 'Instagram') {
  //   //     //     this.InstaUnrespondedMsgCountByCustomer = res.TotalCount;
  //   //     //     if (this.InstaUnrespondedMsgCountByCustomer == 0) {
  //   //     //       this.totalInstaUnrespondedCountByCustomer =
  //   //     //         this.InstaUnrespondedCmntCountByCustomer;
  //   //     //     } else if (this.InstaUnrespondedCmntCountByCustomer == 0) {
  //   //     //       this.totalInstaUnrespondedCountByCustomer =
  //   //     //         this.InstaUnrespondedMsgCountByCustomer;
  //   //     //     } else {
  //   //     //       this.totalInstaUnrespondedCountByCustomer =
  //   //     //         this.InstaUnrespondedCmntCountByCustomer +
  //   //     //         this.InstaUnrespondedMsgCountByCustomer;
  //   //     //     }
  //   //     //   }
  //   //     // }
  //   //   });
  // }

  AgentsTeamList: any;
  AgentDetails: any;

  ActiveAgents: any[] = [];
  getAgentsTeamList() {
    this.commondata.GetAgentsTeamList().subscribe((res: any) => {
      if (Object.keys(res).length > 0) {
        this.AgentsTeamList = res;
        this.ActiveAgents = [];
        this.AgentsTeamList.forEach((user: any) => {
          if (user.userId != localStorage.getItem('agentId')) {
            this.ActiveAgents.push(user);
          }
        });
      }
    });
  }

  getAgentById() {
    this.commondata.GetAgentById(this.agentId).subscribe((res: any) => {
      this.AgentDetails = res;
    });
  }

  completeQuery(slug: string) {
    if(this.KEBaseUrl == true){
      if (slug == 'save') {
        this.markAllAsRead();
      }
    }else {
      if (slug == 'read') {
        this.markAllAsRead();
      } else if (slug == 'save') {
        this.markAsComplete();
      }
    }
    
  }
  markAsCompleteDto = new MarkAsCompleteDto();
  // only for KE
  removeAssignedQuery() {
    const ProfileId = localStorage.getItem('assignedProfile');
    if (
      this.currentUrl.split('/')[2] == 'assigned_to_me' ||
      this.currentUrl.split('/')[2] == 'follow_up'
    ) {
      this.location.back();
      localStorage.setItem('assignedProfile', '');
    } else {
      if (ProfileId == null || ProfileId == '') {
        this.location.back();
      } else {
        this.commondata.RemoveAssignedQuery(ProfileId).subscribe((res: any) => {
          this.location.back();
          localStorage.setItem('assignedProfile', '');
          console.log('remove Response===>', res);
        });
      }
    }
  }
  markAsComplete() {
    this.markAsCompleteDto.user = this.userInfo.userId;
    this.markAsCompleteDto.plateFrom = localStorage.getItem('parent') || '';
    this.markAsCompleteDto.userId = Number(localStorage.getItem('agentId'));

    this.commondata.MarkAsComplete(this.markAsCompleteDto).subscribe(
      (res: any) => {
        if (res.message === 'Success Responded') {
          //   this.route.navigateByUrl('/all-inboxes');
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
        this.closeTeamList();
        this.route.navigateByUrl('/all-inboxes/focused/all');
        this.loadModuleService.updateModule('all-inboxes');
        localStorage.setItem('assignedProfile', '');
      },
      (error) => {
        if (error.error.message === 'User Information Not added Team') {
          this.reloadComponent('noAgentSelected');
        }
      }
    );
  }
  AlterMsg: any;
  toastermessage = false;
  reloadComponent(type: any) {
    if (type == 'spam') {
      this.AlterMsg = 'Profile(s) has been marked as spam!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'removeSpam') {
      this.AlterMsg = 'Profile(s) has been removed from spam items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'block') {
      this.AlterMsg = 'Profile(s) has been marked as blacklisted';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'unblock') {
      this.AlterMsg = 'Profile(s) has been removed from Blacklisted items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'starred') {
      this.AlterMsg = 'Profile(s) has been marked as starred!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'RemoveStarred') {
      this.AlterMsg = 'Profile(s) has been removed from starred items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
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
      this.AlterMsg = 'Profile Allocated to Another Ag ent';
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
  commentStatusDto = new CommentStatusDto();
  markAllAsRead(comId: number = 0, type: string = '') {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = localStorage.getItem('parent') || '{}';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    // this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));

    this.commonService.MarkAllAsRead(this.commentStatusDto).subscribe(
      (res: any) => {
        this.reloadComponent('markAllAsRead');
        if(this.KEBaseUrl == true){
          this.markAsComplete();
        }
        

        // this.FbUnrespondedCmntCountByCustomer = 0;
        // this.WtsapUnrespondedCmntCountByCustomer = 0;
        // this.WcUnrespondedCmntCountByCustomer = 0;
        // this.SmsUnrespondedCmntCountByCustomer = 0;
        // this.TwitterUnrespondedCmntCountByCustomer = 0;
        // this.InstaUnrespondedCmntCountByCustomer = 0;
        // this.EmailUnrespondedCmntCountByCustomer = 0;
        // this.YoutubeUnrespondedCmntCountByCustomer = 0;
        // this.LinkedInUnrespondedCmntCountByCustomer = 0;
        // this.totalFbUnrespondedCountByCustomer = 0;
        // this.totalInstaUnrespondedCountByCustomer = 0;
        // this.totalTwitterUnrespondedCountByCustomer = 0;
        // this.FbUnrespondedMsgCountByCustomer = 0;
        // this.TwitterUnrespondedMsgCountByCustomer = 0;
      },
      (error: any) => {
        this.reloadComponent('alreadyAllQueriesMarkedRead');
        if(this.KEBaseUrl == true){
          this.markAsComplete();
        }
      }
    );
  }

  itemsToBeUpdated: any[] = [];

  InsertTagInProfile(tagName: string, type: string, profileId: any) {
    const ProfileId = localStorage.getItem('assignedProfile');
    var obj = {
      feedId: profileId,
      tagName: tagName,
      type: type,
      platform: this.activeChannel,
    };
    this.itemsToBeUpdated.push(obj);
    this.commondata
      .InsertTagInProfile(this.itemsToBeUpdated)
      .subscribe((res: any) => {
        if (res.message === 'Data Added Successfully') {
          this.markAllAsRead();
          if (tagName == 'black_list') {
            this.commondata.RemoveAssignedQuery(ProfileId).subscribe(() => {
              localStorage.setItem('assignedProfile', '');
            });
          }
          this.itemsToBeUpdated = [];
          this.reloadComponent(tagName);
          localStorage.setItem('assignedProfile', '');
          this.route.navigateByUrl('/all-inboxes/focused/all');
          this.lodeModuleService.updateModule('all-inboxes');
        }
      });
  }

  RemoveTagInProfile(tagName: string, type: string, profileId: any) {
    var obj = {
      feedId: profileId,
      tagName: tagName,
      type: type,
      platform: this.activeChannel,
    };
    this.itemsToBeUpdated.push(obj);
    this.commondata
      .RemoveTagInProfile(this.itemsToBeUpdated)
      .subscribe((res: any) => {
        if (res.message === 'Data Deleted Successfully') {
          this.itemsToBeUpdated = [];
          this.reloadComponent('undo' + tagName);
          this._route.navigateByUrl('all-inboxes/black_list/all');
        }
      });
  }
  // spamStatus: boolean = false;
  // blockStatus: boolean = false;

  // Spam(id: any) {
  //   var obj = {
  //     channel: '',
  //     flag: 'spam',
  //     status: true,
  //     messageId: 0,
  //     profileId: id,
  //   };
  //   this.itemsToBeUpdated.push(obj);
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.spamStatus = true;
  //         this.reloadComponent('spam');
  //       }
  //     });
  // }

  // RemoveSpam(id: any) {
  //   var obj = {
  //     channel: '',
  //     flag: 'spam',
  //     status: false,
  //     messageId: 0,
  //     profileId: id,
  //   };
  //   this.itemsToBeUpdated.push(obj);
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.spamStatus = false;
  //         this.reloadComponent('removeSpam');
  //       }
  //     });
  // }

  // Block(id: any) {
  //   var obj = {
  //     channel: '',
  //     flag: 'blacklist',
  //     status: true,
  //     messageId: 0,
  //     profileId: id,
  //   };
  //   this.itemsToBeUpdated.push(obj);
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.markAllAsRead();
  //         this.itemsToBeUpdated = [];
  //         this.blockStatus = true;
  //         this.reloadComponent('block');
  //         localStorage.setItem('assignedProfile', '');
  //         this.route.navigateByUrl('/all-inboxes/focused/all');
  //         this.lodeModuleService.updateModule('all-inboxes');
  //       }
  //     });
  // }

  // Unblock(id: any) {
  //   var obj = {
  //     channel: '',
  //     flag: 'blacklist',
  //     status: false,
  //     messageId: 0,
  //     profileId: id,
  //   };
  //   this.itemsToBeUpdated.push(obj);
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.blockStatus = false;
  //         this.reloadComponent('unblock');
  //         this._route.navigateByUrl('all-inboxes/black_list/all');
  //       }
  //     });
  // }
}
