import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { ApplySentimentService } from 'src/app/services/ApplySentimentService/apply-sentiment.service';
import { ConnectionIdService } from 'src/app/services/connectionId/connection-id.service';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { RulesGroupIdsService } from 'src/app/services/RulesGroupIds/rules-group-ids.service';
import { SkillIdsService } from 'src/app/services/sendSkillIds/skill-ids.service';
import { SkillslugService } from 'src/app/services/skillSlug/skillslug.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

// import {  Editor, Toolbar } from 'ngx-editor';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  @Input() name: string = '';
  @Input() subname: string = '';
  @Input() imagename: string = '';
  @Input() linkname: string = 'javascript:;';
  // editor!: Editor
  ckEditorConfig: any = {
    toolbar: [
      [
        'Source',
        'Templates',
        'Bold',
        'Italic',
        'Underline',
        'Strike',
        'Subscript',
        'Superscript',
        '-',
        'CopyFormatting',
        'RemoveFormat',
      ],
      ['underline'],
      ['Undo', 'Redo', 'Table'],
      ['Find', 'Replace', '-', 'SelectAll', '-'],
      [
        'NumberedList',
        'BulletedList',
        '-',
        'Outdent',
        '-',
        'JustifyLeft',
        'JustifyCenter',
        'JustifyRight',
        'JustifyBlock',
        '-',
        'BidiLtr',
        'BidiRtl',
      ],
      // [ 'Styles', 'Format', 'Font', 'FontSize' ],
      ['TextColor', 'BGColor'],
    ],
  };
  Emails: any;
  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  queryType = this.getQueryTypeService.getQueryType();
  parentPlatform = this.fetchId.platform;

  pageNumber: any = 1;
  pageSize: any = 10;
  newReply: any;

  filterDto = new FiltersDto();

  show = false;
  isOpen = false;
  active = false;
  expandedEmailBody: boolean = false;
  activeTag = false;
  TodayDate: any;
  queryStatus: any;

  spinner1running = false;
  spinner2running = false;

  public Subscription!: Subscription;
  public criteria!: SortCriteria;
  searchText: string = '';
  flag: string = '';
  messagesStatus: any[] = [];
  Sentiments: any[] = [];

  emailReplyForm!: FormGroup;
  constructor(
    private fetchId: FetchIdService,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService: UpdateCommentsService,
    private queryStatusService: QueryStatusService,
    private replyService: ReplyService,
    private unrespondedCountService: UnRespondedCountService,
    private getQueryTypeService: GetQueryTypeService,
    private router: Router,
    private stor: StorageService,
    private userInfoService: UserInformationService,
    private getWing: GetWingsService,
    private getRulesGroupIdsService: RulesGroupIdsService,
    private getSkillSlug: SkillslugService,
    private getConnectionId: ConnectionIdService
  ) {
    // this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
    //   this.id = null;
    //   this.id = res;
    //   this.getEmails();
    // });

    this.emailReplyForm = new FormGroup({
      text: new FormControl(''),
      commentId: new FormControl(0),
      // teamId: new FormControl(0),
      platform: new FormControl(''),
      contentType: new FormControl(''),
      to: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4}[\s;]*)*$/),
      ]),
      cc: new FormControl('', [
        Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4}[\s;]*)*$/),
      ]),
      bcc: new FormControl('', [
        Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4}[\s;]*)*$/),
      ]),
      subject: new FormControl(''),
      profileId: new FormControl(''),
      profilePageId: new FormControl(''),
      userProfileId: new FormControl(0),
      connectionId: new FormControl(''),
    });
  }

  profileId: string = '';

  ngOnInit(): void {
    this.flag = this.router.url.split('/')[2];
    this.fullName = localStorage.getItem('storeOpenedId') || '{}';

    const menu = this.stor.retrive('Tags', 'O').local;
    menu.forEach((item: any) => {
      if (item.name == 'Tags') {
        item.subTags.forEach((singleTagObj: any) => {
          if (!this.TagsList.includes(singleTagObj)) {
            this.TagsList.push(singleTagObj);
          }
        });
      }
      if (item.name == 'Messages Status') {
        item.subTags.forEach((messagesStatusObj: any) => {
          if (!this.messagesStatus.includes(messagesStatusObj)) {
            this.messagesStatus.push(messagesStatusObj);
          }
        });
      }
      if (item.name == 'Sentiments') {
        item.subTags.forEach((sentimentObj: any) => {
          if (!this.Sentiments.includes(sentimentObj)) {
            this.Sentiments.push(sentimentObj);
          }
        });
      }
    });

    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
    this.TodayDate = new Date();

    this.getEmails();
    // this.getTagList();

    this.Subscription = this.addTagService.receiveTags().subscribe((res) => {
      this.addTags = res;
      this.addTagDataListener();
    });
    this.Subscription = this.removeTagService.receiveTags().subscribe((res) => {
      this.removeTags = res;
      this.removeTagDataListener();
    });
    this.Subscription = this.updateCommentsService
      .receiveComment()
      .subscribe((res) => {
        this.updatedComments = res;
        this.updateCommentsDataListener();
      });
    this.Subscription = this.queryStatusService
      .receiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateQueryStatusDataListener();
      });
    this.Subscription = this.replyService.receiveReply().subscribe((res) => {
      this.newReply = res;
      this.replyDataListener();
    });
    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        var assignedProfileId = Number(localStorage.getItem('assignedProfile'));
        if (
          this.flag == 'focused' ||
          this.flag == 'assigned_to_me' ||
          this.flag == 'follow_up'
        ) {
          if (res.contentCount.profileId == assignedProfileId) {
            if (
              res.contentCount.contentType == 'Mail' ||
              res.contentCount.contentType == 'OMail'
            ) {
              this.totalUnrespondedCmntCountByCustomer =
                res.contentCount.unrespondedCount;
            }
          }
        }
      });
    this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListener();
      });

    // this.Subscription = this.applySentimentService
    //   .receiveSentiment()
    //   .subscribe((res) => {
    //     this.applySentimentListner(res);
    //   });
  }

  commentDto = new commentsDto();

  updatedComments: any;
  senderEmailAddress: any;

  updateCommentsDataListener() {
    if (!this.id) {
      this.id = localStorage.getItem('storeOpenedId') || '{}';
    }
    this.updatedComments.forEach((xyz: any) => {
      if (this.id == xyz.userId) {
        this.commentDto = {
          id: xyz.id,
          postId: xyz.postId,
          commentId: xyz.commentId,
          message: xyz.message,
          contentType: xyz.contentType,
          userName: xyz.userName || xyz.userId,
          queryStatus: xyz.queryStatus,
          createdDate: xyz.createdDate,
          fromUserProfilePic: xyz.profilePic,
          body: xyz.body,
          to: xyz.toId,
          cc: xyz.cc,
          bcc: xyz.bcc,
          attachments: xyz.mediaAttachments,
          replies: [],
          sentiment: xyz.sentiment,
          tags: [],
        };
        this.Emails?.forEach((item: any) => {
          this.commentsArray = [];
          item.comments.push(this.commentDto);
          item.comments.forEach((cmnt: any) => {
            this.commentsArray.push(cmnt);
          });

          let groupedItemsByDate = this.commentsArray.reduce(
            (acc: any, item: any) => {
              const date = item.createdDate?.split('T')[0];
              if (!acc[date]) {
                acc[date] = {};
              }
              if (!acc[date][item.message]) {
                acc[date][item.message] = {
                  createdDate: item.createdDate,
                  items: [],
                };
              }
              acc[date][item.message].items.push(item);
              return acc;
            },
            {}
          );

          this.result = Object.keys(groupedItemsByDate).map((date) => {
            const subjects = Object.keys(groupedItemsByDate[date]).map(
              (message) => ({
                message,
                createdDate: groupedItemsByDate[date][message].createdDate,
                items: groupedItemsByDate[date][message],
              })
            );
            return {
              date,
              subjects,
            };
          });
          console.log(this.result);

          this.result?.forEach((sbjct: any) => {
            sbjct.subjects?.forEach((group: any) => {
              group.items.items.forEach((email: any) => {
                this.multipleTo = [];
                this.multipleCc = [];
                email.to?.forEach((singleTo: any) => {
                  if (!this.multipleTo.includes(singleTo.emailAddress)) {
                    this.multipleTo.push(singleTo.emailAddress);
                  }
                  email['multipleTo'] = this.multipleTo.join(', ');
                });

                email.cc?.forEach((singleCc: any) => {
                  if (!this.multipleCc.includes(singleCc.emailAddress)) {
                    this.multipleCc.push(singleCc.emailAddress);
                  }
                  email['multipleCc'] = this.multipleCc.join(', ');
                });
              });
            });
          });

          this.result?.forEach((sbjct: any) => {
            sbjct.subjects?.forEach((group: any) => {
              group.items.items.forEach((email: any) => {
                email.replies?.forEach((reply: any) => {
                  this.multipleToInReply = [];
                  this.multipleCcInReply = [];
                  this.multipleBccInReply = [];
                  reply.to?.forEach((singleTo: any) => {
                    if (
                      !this.multipleToInReply.includes(singleTo.emailAddress)
                    ) {
                      this.multipleToInReply.push(singleTo.emailAddress);
                    }
                    reply['multipleToInReply'] =
                      this.multipleToInReply.join(', ');
                  });

                  reply.cc?.forEach((singleCc: any) => {
                    if (
                      !this.multipleCcInReply.includes(singleCc.emailAddress)
                    ) {
                      this.multipleCcInReply.push(singleCc.emailAddress);
                    }
                    reply['multipleCcInReply'] =
                      this.multipleCcInReply.join(', ');
                  });
                  reply.bcc?.forEach((singleBcc: any) => {
                    if (
                      !this.multipleBccInReply.includes(singleBcc.emailAddress)
                    ) {
                      this.multipleBccInReply.push(singleBcc.emailAddress);
                    }
                    reply['multipleBccInReply'] =
                      this.multipleBccInReply.join(', ');
                  });
                });
              });
            });
          });
        });
        this.totalUnrespondedCmntCountByCustomer =
          this.totalUnrespondedCmntCountByCustomer + 1;

        this.Emails?.forEach((msg: any) => {
          const data = msg?.comments[0]?.to[0]?.emailAddress;
          const changedata = JSON.parse(data);
          changedata.forEach((x: any) => {
            this.To = x;
          });
        });
      }
    });
    this.changeDetect.detectChanges();
  }

  To: any;
  totalUnrespondedCmntCountByCustomer: number = 0;
  TotalQueryCount: number = 0;

  commentsArray: any[] = [];
  groupArrays: any[] = [];
  fullName: string = '';
  replyAttachments: any[] = [];
  multipleTo: any[] = [];
  multipleCc: any[] = [];

  multipleToInReply: any[] = [];
  multipleCcInReply: any[] = [];
  multipleBccInReply: any[] = [];
  userInformation: any;
  getEmails() {
    this.flag = this.router.url.split('/')[2];
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: this.parentPlatform,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        hasBlueTick: false,

        queryType: this.queryType,
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        skills: this.getSkillSlug.getSkillSlug(),
      };

      this.SpinnerService.show();
      this.spinner1running = true;
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.spinner1running = false;
          this.Emails = res.List;
          this.userInformation = res?.List[0]?.user;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.fullName = this.Emails[0].user.userName?.split('<')[0];
          this.senderEmailAddress =
            this.Emails[0].user.userId.split(/[<>]/)[1] ||
            this.Emails[0].user.userId;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.TotalQueryCount = res.TotalQueryCount;

          this.commentsArray = [];
          this.Emails?.forEach((item: any) => {
            this.commentsArray = [];
            item.comments.forEach((cmnt: any) => {
              this.commentsArray.push(cmnt);
            });
            let groupedItemsByDate = this.commentsArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate?.split('T')[0];
                if (!acc[date]) {
                  acc[date] = {};
                }
                if (!acc[date][item.message]) {
                  acc[date][item.message] = {
                    createdDate: item.createdDate,
                    items: [],
                  };
                }
                acc[date][item.message].items.push(item);
                return acc;
              },
              {}
            );

            this.result = Object.keys(groupedItemsByDate).map((date) => {
              const subjects = Object.keys(groupedItemsByDate[date]).map(
                (message) => ({
                  message,
                  createdDate: groupedItemsByDate[date][message].createdDate,
                  items: groupedItemsByDate[date][message],
                })
              );
              return {
                date,
                subjects,
              };
            });
            console.log(this.result);

            this.result?.forEach((sbjct: any) => {
              sbjct.subjects?.forEach((group: any) => {
                group.items.items.forEach((email: any) => {
                  this.multipleTo = [];
                  this.multipleCc = [];
                  email.to?.forEach((singleTo: any) => {
                    if (!this.multipleTo.includes(singleTo.emailAddress)) {
                      this.multipleTo.push(singleTo.emailAddress);
                    }
                    email['multipleTo'] = this.multipleTo.join(', ');
                  });

                  email.cc?.forEach((singleCc: any) => {
                    if (!this.multipleCc.includes(singleCc.emailAddress)) {
                      this.multipleCc.push(singleCc.emailAddress);
                    }
                    email['multipleCc'] = this.multipleCc.join(', ');
                  });
                });
              });
            });

            this.result?.forEach((sbjct: any) => {
              sbjct.subjects?.forEach((group: any) => {
                group.items.items.forEach((email: any) => {
                  email.replies?.forEach((reply: any) => {
                    this.multipleToInReply = [];
                    this.multipleCcInReply = [];
                    this.multipleBccInReply = [];
                    reply.to?.forEach((singleTo: any) => {
                      if (
                        !this.multipleToInReply.includes(singleTo.emailAddress)
                      ) {
                        this.multipleToInReply.push(singleTo.emailAddress);
                      }
                      reply['multipleToInReply'] =
                        this.multipleToInReply.join(', ');
                    });

                    reply.cc?.forEach((singleCc: any) => {
                      if (
                        !this.multipleCcInReply.includes(singleCc.emailAddress)
                      ) {
                        this.multipleCcInReply.push(singleCc.emailAddress);
                      }
                      reply['multipleCcInReply'] =
                        this.multipleCcInReply.join(', ');
                    });
                    reply.bcc?.forEach((singleBcc: any) => {
                      if (
                        !this.multipleBccInReply.includes(
                          singleBcc.emailAddress
                        )
                      ) {
                        this.multipleBccInReply.push(singleBcc.emailAddress);
                      }
                      reply['multipleBccInReply'] =
                        this.multipleBccInReply.join(', ');
                    });
                  });
                });
              });
            });
          });

          this.Emails?.forEach((item: any) => {
            const data = item?.comments[0]?.to[0]?.emailAddress;
            const changedata = JSON.parse(data);
            changedata.forEach((x: any) => {
              this.To = x;
            });
          });
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: this.parentPlatform,
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false,
        queryType: this.queryType,
        hasBlueTick: false,
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        skills: this.getSkillSlug.getSkillSlug(),
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.Emails = res.List;
        this.userInformation = res?.List[0]?.user;
        this.userInfoService.shareUserInformation(res.List[0].user);
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.senderEmailAddress =
          this.Emails[0].user.userId.split(/[<>]/)[1] ||
          this.Emails[0].user.userId;
        this.fullName = this.Emails[0].user?.userName?.split('<')[0];
        this.TotalQueryCount = res.TotalQueryCount;

        this.commentsArray = [];
        this.Emails?.forEach((item: any) => {
          this.commentsArray = [];
          item.comments.forEach((cmnt: any) => {
            this.commentsArray.push(cmnt);
          });
          let groupedItemsByDate = this.commentsArray.reduce(
            (acc: any, item: any) => {
              const date = item.createdDate?.split('T')[0];
              if (!acc[date]) {
                acc[date] = {};
              }
              if (!acc[date][item.message]) {
                acc[date][item.message] = {
                  createdDate: item.createdDate,
                  items: [],
                };
              }
              acc[date][item.message].items.push(item);
              return acc;
            },
            {}
          );

          this.result = Object.keys(groupedItemsByDate).map((date) => {
            const subjects = Object.keys(groupedItemsByDate[date]).map(
              (message) => ({
                message,
                createdDate: groupedItemsByDate[date][message].createdDate,
                items: groupedItemsByDate[date][message],
              })
            );
            return {
              date,
              subjects,
            };
          });
          console.log(this.result);

          this.result?.forEach((sbjct: any) => {
            sbjct.subjects?.forEach((group: any) => {
              group.items.items.forEach((email: any) => {
                this.multipleTo = [];
                this.multipleCc = [];
                email.to?.forEach((singleTo: any) => {
                  if (!this.multipleTo.includes(singleTo.emailAddress)) {
                    this.multipleTo.push(singleTo.emailAddress);
                  }
                  email['multipleTo'] = this.multipleTo.join(', ');
                });

                email.cc?.forEach((singleCc: any) => {
                  if (!this.multipleCc.includes(singleCc.emailAddress)) {
                    this.multipleCc.push(singleCc.emailAddress);
                  }
                  email['multipleCc'] = this.multipleCc.join(', ');
                });
              });
            });
          });

          this.result?.forEach((sbjct: any) => {
            sbjct.subjects?.forEach((group: any) => {
              group.items.items.forEach((email: any) => {
                email.replies?.forEach((reply: any) => {
                  this.multipleToInReply = [];
                  this.multipleCcInReply = [];
                  this.multipleBccInReply = [];
                  reply.to?.forEach((singleTo: any) => {
                    if (
                      !this.multipleToInReply.includes(singleTo.emailAddress)
                    ) {
                      this.multipleToInReply.push(singleTo.emailAddress);
                    }
                    reply['multipleToInReply'] =
                      this.multipleToInReply.join(', ');
                  });

                  reply.cc?.forEach((singleCc: any) => {
                    if (
                      !this.multipleCcInReply.includes(singleCc.emailAddress)
                    ) {
                      this.multipleCcInReply.push(singleCc.emailAddress);
                    }
                    reply['multipleCcInReply'] =
                      this.multipleCcInReply.join(', ');
                  });
                  reply.bcc?.forEach((singleBcc: any) => {
                    if (
                      !this.multipleBccInReply.includes(singleBcc.emailAddress)
                    ) {
                      this.multipleBccInReply.push(singleBcc.emailAddress);
                    }
                    reply['multipleBccInReply'] =
                      this.multipleBccInReply.join(', ');
                  });
                });
              });
            });
          });
        });

        this.Emails?.forEach((item: any) => {
          const data = item?.comments[0]?.to[0]?.emailAddress;
          const changedata = JSON.parse(data);
          changedata.forEach((x: any) => {
            this.To = x;
          });
        });
      });
    } else {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: localStorage.getItem('storeOpenedId') || '{}',
        pageId: '',
        plateForm: localStorage.getItem('parent') || '{}',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        hasBlueTick: false,
        queryType: this.queryType,
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        skills: this.getSkillSlug.getSkillSlug(),
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.Emails = res.List;
          this.userInformation = res?.List[0]?.user;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.TotalQueryCount = res.TotalQueryCount;
          this.senderEmailAddress =
            this.Emails[0].user.userId.split(/[<>]/)[1] ||
            this.Emails[0].user.userId;
          this.fullName = this.Emails[0].user?.userName?.split('<')[0];

          this.commentsArray = [];
          this.Emails?.forEach((item: any) => {
            this.commentsArray = [];
            item.comments.forEach((cmnt: any) => {
              this.commentsArray.push(cmnt);
            });
            let groupedItemsByDate = this.commentsArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate?.split('T')[0];
                if (!acc[date]) {
                  acc[date] = {};
                }
                if (!acc[date][item.message]) {
                  acc[date][item.message] = {
                    createdDate: item.createdDate,
                    items: [],
                  };
                }
                acc[date][item.message].items.push(item);
                return acc;
              },
              {}
            );

            this.result = Object.keys(groupedItemsByDate).map((date) => {
              const subjects = Object.keys(groupedItemsByDate[date]).map(
                (message) => ({
                  message,
                  createdDate: groupedItemsByDate[date][message].createdDate,
                  items: groupedItemsByDate[date][message],
                })
              );
              return {
                date,
                subjects,
              };
            });
            console.log(this.result);

            this.result?.forEach((sbjct: any) => {
              sbjct.subjects?.forEach((group: any) => {
                group.items.items.forEach((email: any) => {
                  this.multipleTo = [];
                  this.multipleCc = [];
                  email.to?.forEach((singleTo: any) => {
                    if (!this.multipleTo.includes(singleTo.emailAddress)) {
                      this.multipleTo.push(singleTo.emailAddress);
                    }
                    email['multipleTo'] = this.multipleTo.join(', ');
                  });

                  email.cc?.forEach((singleCc: any) => {
                    if (!this.multipleCc.includes(singleCc.emailAddress)) {
                      this.multipleCc.push(singleCc.emailAddress);
                    }
                    email['multipleCc'] = this.multipleCc.join(', ');
                  });
                });
              });
            });

            this.result?.forEach((sbjct: any) => {
              sbjct.subjects?.forEach((group: any) => {
                group.items.items.forEach((email: any) => {
                  email.replies?.forEach((reply: any) => {
                    this.multipleToInReply = [];
                    this.multipleCcInReply = [];
                    this.multipleBccInReply = [];
                    reply.to?.forEach((singleTo: any) => {
                      if (
                        !this.multipleToInReply.includes(singleTo.emailAddress)
                      ) {
                        this.multipleToInReply.push(singleTo.emailAddress);
                      }
                      reply['multipleToInReply'] =
                        this.multipleToInReply.join(', ');
                    });

                    reply.cc?.forEach((singleCc: any) => {
                      if (
                        !this.multipleCcInReply.includes(singleCc.emailAddress)
                      ) {
                        this.multipleCcInReply.push(singleCc.emailAddress);
                      }
                      reply['multipleCcInReply'] =
                        this.multipleCcInReply.join(', ');
                    });
                    reply.bcc?.forEach((singleBcc: any) => {
                      if (
                        !this.multipleBccInReply.includes(
                          singleBcc.emailAddress
                        )
                      ) {
                        this.multipleBccInReply.push(singleBcc.emailAddress);
                      }
                      reply['multipleBccInReply'] =
                        this.multipleBccInReply.join(', ');
                    });
                  });
                });
              });
            });
          });

          this.Emails?.forEach((item: any) => {
            const data = item?.comments[0]?.to[0]?.emailAddress;
            const changedata = JSON.parse(data);
            changedata.forEach((x: any) => {
              this.To = x;
            });
          });
        });
    }
  }
  result: any[] = [];

  expandEmailBody() {
    this.expandedEmailBody = !this.expandedEmailBody;
  }

  markRead: boolean = false;
  opened: boolean = false;
  replyId: any[] = [];
  emailId: any;
  selectedIndex: any;

  openEmail(id: any) {
    this.Emails.forEach((xyz: any) => {
      xyz.comments.forEach((email: any) => {
        if (email.id == id) {
          this.emailId = email.id;
          this.opened = true;
          this.markRead = !this.markRead;
        }
        email.replies.forEach((reply: any) => {
          if (reply.id == id) {
            if (this.replyId.includes(id)) {
              this.replyId.splice(id);
              this.opened = false;
              this.markRead = !this.markRead;
            } else {
              this.replyId.push(reply.id);
              this.opened = true;
              this.markRead = !this.markRead;
            }
          }
        });
      });
    });

    if (this.selectedIndex === id) {
      this.selectedIndex = 'collapsed unread';
    } else {
      this.selectedIndex = '';
    }
  }

  insertTagsForFeedDto = new InsertTagsForFeedDto();
  checkTag = false;

  insertTagsForFeed(comId: number, tagName: string) {
    this.insertTagsForFeedDto = {
      feedId: comId,
      tagName: tagName,
      type: 'Tag',
      platform: 'Email',
      wings: this.getWing.wings,
      connectionId: this.getConnectionId.connectionId,
    };

    this.Emails.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          if (comment.tags.length == 0) {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');

                this.activeTag = true;
                this.checkTag = true;
              });
          } else if (comment.tags.length > 0) {
            const value = comment.tags.find((x: any) => x.name == tagName);
            if (value != null || value != undefined) {
              this.removeTagFromFeed(comId, tagName);
            } else {
              this.commondata
                .InsertTag(this.insertTagsForFeedDto)
                .subscribe((res: any) => {
                  this.reloadComponent('ApplyTag');

                  this.activeTag = true;
                  this.checkTag = true;
                });
            }
          }
        }
      });
    });
  }

  removeTagFromFeed(feedId: number, tagName: any) {
    if (this.flag == 'focused' || this.flag == 'assigned_to_me') {
      this.insertTagsForFeedDto = {
        feedId: feedId,
        tagName: tagName,
        type: 'Tag',
        platform: 'Email',
        wings: this.getWing.wings,
        connectionId: this.getConnectionId.connectionId,
      };

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');

          this.activeTag = false;
          this.checkTag = false;
        });
    }
  }
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  appliedSentiment: string = '';

  // insertSentiment(feedId: any, sentimenName: any, type: any) {
  //   this.insertSentimentForFeedDto.feedId = feedId.toString();
  //   this.insertSentimentForFeedDto.sentiment = sentimenName;
  //   this.insertSentimentForFeedDto.feedType = type;
  //   this.insertSentimentForFeedDto.userId = Number(
  //     localStorage.getItem('agentId')
  //   );

  //   this.commondata
  //     .InsertSentiment(this.insertSentimentForFeedDto)
  //     .subscribe((res: any) => {
  //       this.reloadComponent('Sentiment');
  //       this.appliedSentiment = sentimenName;
  //     });
  // }
  insertSentimentForFeed(feedId: number, sentimenName: any) {
    this.insertTagsForFeedDto = {
      feedId: feedId,
      tagName: sentimenName,
      type: 'Sentiment',
      platform: 'Email',
      wings: this.getWing.wings,
      connectionId: this.getConnectionId.connectionId
    };

    this.commondata
      .InsertSentiment(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
  }

  TagsList: any[] = [];
  Keywords: any[] = [];

  getTagList() {
    const menu = this.stor.retrive('Tags', 'O').local;
    menu.forEach((item: any) => {
      if (item.name == 'Tags') {
        item.subTags.forEach((parentags: any) => {
          parentags?.subTags?.forEach((singleTagObj: any) => {
            if (!this.Keywords.includes(singleTagObj)) {
              this.Keywords.push(singleTagObj);
            }
          });
        });
      }
    });
  }

  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }

  replyDto = new ReplyDto();

  agentId: string = '';
  platform: string = '';
  postType: string = '';
  emailTo: any;
  emailCc: string = '';
  emailBcc: string = '';
  emailSubject: string = '';
  emailFrom: any[] = [];
  emailFromInString: string = '';
  emailCcInString: string = '';

  emailCcArray: any[] = [];
  emailToArray: any[] = [];

  sendReplyAllInformation(id: any) {
    this.Emails.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == id) {
          // populate comment

          this.emailId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.profileId = xyz.post.profile.profile_Id;
          this.postType = comment.contentType;
          this.emailTo = comment.to;
          this.userProfileId = this.Emails[0].user.id;
          this.text = '';

          if (comment.bcc) {
            this.emailBcc = comment.bcc;
          }
          this.emailSubject = comment.message;

          this.emailFrom = this.emailTo;
          const index = this.emailFrom.find(
            (x: any) => x.emailAddress == this.To
          );
          if (index != -1) {
            this.emailFrom.splice(index, 1);
            this.emailFrom.unshift({
              name: this.fullName,
              emailAddress: this.senderEmailAddress,
            });
          }
          this.emailFromInString = '';
          this.emailToArray = [];
          comment.to?.forEach((item: any) => {
            if (!this.emailToArray.includes(item.emailAddress)) {
              this.emailToArray.push(item.emailAddress);
            }
            this.emailFromInString = this.emailToArray.join(', ');
          });
          if (comment.cc) {
            this.emailCc = comment.cc;
          }
          this.emailCcInString = '';
          this.emailCcArray = [];
          if (comment.cc) {
            comment.cc?.forEach((item: any) => {
              if (!this.emailCcArray.includes(item.emailAddress)) {
                this.emailCcArray.push(item.emailAddress);
              }
              this.emailCcInString = this.emailCcArray.join(', ');
            });
          } else {
            this.emailCcInString = '';
          }
        }
      });
    });
  }

  sendReplyInformation(id: any) {
    this.emailFrom = [];
    this.Emails.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == id) {
          // populate comment

          this.emailFrom.unshift({
            name: this.fullName,
            emailAddress: this.senderEmailAddress,
          });
          this.emailId = comment.id;
          // this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.profileId = xyz.post.profile.profile_Id;
          this.postType = comment.contentType;
          this.emailSubject = comment.message;
          this.emailFromInString = this.senderEmailAddress;
          this.emailCcInString = '';
          this.userProfileId = this.Emails[0].user.id;
          this.text = '';
        }
      });
    });
  }
  text: string = '';

  sendForwardInformation(id: any) {
    this.emailFrom = [];
    this.Emails.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == id) {
          // populate comment

          this.emailFrom.unshift({
            name: this.fullName,
            emailAddress: this.senderEmailAddress,
          });
          this.emailId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.postType = 'ForwardEmail';
          this.profileId = xyz.post.profile.profile_Id;
          this.emailSubject = comment.message;
          this.emailFromInString = '';
          this.emailCcInString = '';
          this.text = this.convertHtmlToPlainText(comment.body);
          this.userProfileId = this.Emails[0].user.id;
        }
      });
    });
  }

  convertHtmlToPlainText(html: any): string {
    const parser = new DOMParser();
    const document = parser.parseFromString(html.toString(), 'text/html');
    return document.body.textContent || '';
  }

  ImageName: any;
  ImageArray: any[] = [];
  userProfileId = 0;

  sendBtnClicked: boolean = false;

  replyTo: any[] = [];
  replyCc: any[] = [];
  replyBcc: any[] = [];
  submitEmailReply() {
    this.sendBtnClicked = true;
    this.showCcBtn = true;
    this.showBccBtn = true;
    this.showCcInput = false;
    this.showBccInput = false;
    this.replyTo = [];
    this.replyCc = [];
    this.replyBcc = [];
    if (!this.emailReplyForm.get('to')?.dirty) {
      this.emailReplyForm.patchValue({
        to: JSON.stringify(this.emailFrom),
      });
    } else {
      if (this.emailReplyForm.value.to) {
        const to = this.emailReplyForm.value.to.split(';');
        to.forEach((item: any) => {
          this.replyTo.push({ name: '', emailAddress: item });
        });
        this.emailReplyForm.patchValue({
          to: JSON.stringify(this.replyTo),
        });
      }
    }
    if (!this.emailReplyForm.get('cc')?.dirty) {
      if (this.emailCc != '') {
        this.emailReplyForm.patchValue({
          cc: JSON.stringify(this.emailCc),
        });
      }
    } else {
      if (this.emailReplyForm.value.cc) {
        const cc = this.emailReplyForm.value.cc.split(';');
        cc.forEach((item: any) => {
          this.replyCc.push({ name: '', emailAddress: item });
        });
        this.emailReplyForm.patchValue({
          cc: JSON.stringify(this.replyCc),
        });
      }
    }
    if (!this.emailReplyForm.get('bcc')?.dirty) {
      if (this.emailBcc != '') {
        this.emailReplyForm.patchValue({
          bcc: JSON.stringify(this.emailBcc),
        });
      }
    } else {
      if (this.emailReplyForm.value.bcc) {
        const bcc = this.emailReplyForm.value.bcc.split(';');
        bcc.forEach((item: any) => {
          this.replyBcc.push({ name: '', emailAddress: item });
        });
        this.emailReplyForm.patchValue({
          bcc: JSON.stringify(this.replyBcc),
        });
      }
    }
    if (!this.emailReplyForm.get('subject')?.dirty) {
      this.emailReplyForm.patchValue({
        subject: this.emailSubject,
      });
    }
    if (!this.emailReplyForm.get('text')?.dirty) {
      this.emailReplyForm.patchValue({
        text: this.text,
      });
    }
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }

    this.emailReplyForm.patchValue({
      commentId: this.emailId,
      // teamId: this.agentId,
      platform: this.platform,
      contentType: this.postType,
      userProfileId: this.userProfileId,
      text: this.text,
      profileId: this.profileId,
      connectionId: this.getConnectionId.connectionId,
    });

    formData.append('CommentReply', JSON.stringify(this.emailReplyForm.value));

    this.spinner1running = true;
    this.SpinnerService.show();
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.spinner1running = false;
        this.SpinnerService.hide();
        this.reloadComponent('comment');
        this.closeReplyModal();
        this.emailReplyForm.reset();
        this.clearInputField();
      },
      (error) => {
        alert(error.error.message);
        this.spinner1running = false;
        this.SpinnerService.hide();
      }
    );
  }

  onFileChanged() {
    Array.from(this.fileInput.nativeElement.files).forEach((file: any) => {
      if (file.size > 4 * 1024 * 1024) {
        this.reloadComponent('Attachments');
      } else if (this.fileInput.nativeElement.files.length > 0) {
        this.isAttachment = true;

        const filesArray = Array.from(this.fileInput.nativeElement.files);
        filesArray.forEach((attachment: any) => {
          this.ImageArray.push(attachment);
        });
        const files = this.ImageArray.map((file: any) => file); // Create a new array with the remaining files
        const newFileList = new DataTransfer();
        files.forEach((file: any) => newFileList.items.add(file)); // Add the files to a new DataTransfer object
        this.ImageName = newFileList.files;
      }
    });
  }

  clearInputField() {
    this.emailCcArray = [];
    this.emailCc = '';
    this.show = false;
    this.emailId = '';
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.emailTo = '';
    this.emailBcc = '';
    this.emailSubject = '';
    this.fileInput.nativeElement.value = '';
    this.detectChanges();
    this.ImageArray = [];
  }
  toastermessage = false;
  AlterMsg: any = '';
  reloadComponent(type: any) {
    if (type == 'Attachments') {
      this.AlterMsg = 'File size must be less than 4MB';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'comment') {
      this.AlterMsg = 'Email Sent Successfully!';
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
    if (type == 'error') {
      this.AlterMsg = 'Something went wrong';
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
  querryCompleted = false;
  storeComId: any;

  showCcBtn: boolean = true;
  showBccBtn: boolean = true;
  showCcInput: boolean = false;
  showBccInput: boolean = false;

  OpenCc() {
    this.showCcBtn = false;
    this.showCcInput = true;
  }
  OpenBcc() {
    this.showBccBtn = false;
    this.showBccInput = true;
  }
  closeReplyModal() {
    this.showCcBtn = true;
    this.showBccBtn = true;
    this.showCcInput = false;
    this.showBccInput = false;
    this.clearInputField();
  }

  expandReply() {}
  Emojies = [
    { id: 1, emoji: '🙁', tile: 'sad' },
    { id: 2, emoji: '😀', tile: 'happy' },
    { id: 3, emoji: '😇', tile: 'bleassed' },
    { id: 4, emoji: '😊', tile: 'smile' },
    { id: 5, emoji: '😔', tile: 'ohh' },
    { id: 6, emoji: '😧', tile: 'worried' },
    { id: 7, emoji: '👌', tile: 'superb' },
    { id: 8, emoji: '👍', tile: 'thumbs up' },
    { id: 9, emoji: '🤩', tile: 'wow' },
  ];

  @ViewChild('textarea')
  textarea!: ElementRef;

  insertAtCaret(text: string) {
    const textarea = this.textarea.nativeElement;
    textarea.focus();
    if (typeof textarea.selectionStart != 'undefined') {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const scrollTop = textarea.scrollTop;
      textarea.value =
        textarea.value.substring(0, startPos) +
        text +
        textarea.value.substring(endPos, textarea.value.length);
      textarea.selectionStart = startPos + text.length;
      textarea.selectionEnd = startPos + text.length;
      textarea.scrollTop = scrollTop;
      // // console.log(this.textarea.nativeElement.value);
    }
  }

  insertEmoji(emoji: any) {
    this.insertAtCaret(emoji);
    // // console.log(this.textarea.nativeElement.value);
  }

  commentStatus(comId: any, type: any) {
    this.commentStatusDto = {
      id: comId,
      type: type,
      plateForm: localStorage.getItem('parent') || '{}',
      profileId: Number(localStorage.getItem('profileId')),
      wings: this.getWing.wings,
      skillSlug: this.getSkillSlug.skillSlug[0],
      connectionId: this.getConnectionId.connectionId,
    };

    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {});
  }

  markAsComplete = false;

  markAsCompleteExpanded(comId: any) {
    this.Emails.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          this.markAsComplete = !this.markAsComplete;
        }
      });
    });
  }

  addTags: any;
  removeTags: any;

  addTagDataListener() {
    this.result.forEach((grp: any) => {
      grp.subjects.forEach((cmnt: any) => {
        cmnt.items.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.addTags.feedId) {
            if (this.addTags.type == 'Tag') {
              if (singleCmnt.tags.length == 0) {
                singleCmnt.tags.push(this.addTags);
              } else if (singleCmnt.tags.length > 0) {
                const tag = singleCmnt.tags.find(
                  (x: any) => x.name == this.addTags.name
                );
                if (tag != null || tag != undefined) {
                  const index = singleCmnt.tags.indexOf(tag);
                  if (index !== -1) {
                    singleCmnt.tags.splice(index, 1);
                  }
                } else {
                  if (!singleCmnt.tags.includes(this.addTags)) {
                    singleCmnt.tags.push(this.addTags);
                  }
                }
              }
            }
            if (this.addTags.type == 'Sentiment') {
              singleCmnt.sentiment = this.addTags;
            }
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }
  // applySentimentListner(res: any) {
  //     this.result.forEach((grp: any) => {
  //       grp.subjects.forEach((cmnt:any) => {
  //         cmnt.items.items.forEach((singleCmnt: any) => {
  //           if (singleCmnt.id == res.feedId) {
  //             singleCmnt.sentiment = res;
  //           }
  //         });
  //       });

  //     });
  //   this.changeDetect.detectChanges();
  // }
  removeTagDataListener() {
    this.result.forEach((grp: any) => {
      grp.subjects.forEach((cmnt: any) => {
        cmnt.items.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.removeTags.feedId) {
            var tag = singleCmnt.tags.find(
              (x: any) => x.name == this.removeTags.tagName
            );
            const index = singleCmnt.tags.indexOf(tag);
            if (index !== -1) {
              singleCmnt.tags.splice(index, 1);
            }
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }

  updateQueryStatusDataListener() {
    this.result.forEach((grp: any) => {
      grp.subjects.forEach((cmnt: any) => {
        cmnt.items.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.queryStatus.queryId) {
            singleCmnt.queryStatus = this.queryStatus.queryStatus;
            singleCmnt.isLikedByAdmin = this.queryStatus.isLikes;
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }

  updateBulkQueryStatusDataListener() {
    this.result.forEach((grp: any) => {
      grp.subjects.forEach((cmnt: any) => {
        cmnt.items.items.forEach((singleCmnt: any) => {
          this.queryStatus.forEach((qs: any) => {
            if (singleCmnt.id == qs.queryId) {
              singleCmnt.queryStatus = qs.queryStatus;
              this.totalUnrespondedCmntCountByCustomer = 0;
            }
          });
        });
      });
    });
    this.changeDetect.detectChanges();
  }

  replyDataListener() {
    this.result.forEach((grp: any) => {
      grp.subjects.forEach((cmnt: any) => {
        cmnt.items.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.newReply.commentId) {
            singleCmnt.replies.push(this.newReply);
            singleCmnt.queryStatus = this.newReply.queryStatus;

            singleCmnt.replies.forEach((reply: any) => {
              this.multipleToInReply = [];
              this.multipleCcInReply = [];
              this.multipleBccInReply = [];
              reply.to?.forEach((singleTo: any) => {
                if (!this.multipleToInReply.includes(singleTo.emailAddress)) {
                  this.multipleToInReply.push(singleTo.emailAddress);
                }
                reply['multipleToInReply'] = this.multipleToInReply.join(', ');
              });

              reply.cc?.forEach((singleCc: any) => {
                if (!this.multipleCcInReply.includes(singleCc.emailAddress)) {
                  this.multipleCcInReply.push(singleCc.emailAddress);
                }
                reply['multipleCcInReply'] = this.multipleCcInReply.join(', ');
              });
              reply.bcc?.forEach((singleBcc: any) => {
                if (!this.multipleBccInReply.includes(singleBcc.emailAddress)) {
                  this.multipleBccInReply.push(singleBcc.emailAddress);
                }
                reply['multipleBccInReply'] =
                  this.multipleBccInReply.join(', ');
              });
            });
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }

  onScroll() {
    if (this.TotalQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getEmails();
    }
  }

  isAttachment = false;

  removeAttachedFile(index: any) {
    const filesArray = Array.from(this.ImageName);
    filesArray.splice(index, 1);
    this.ImageArray.splice(index, 1);

    const files = filesArray.map((file: any) => file); // Create a new array with the remaining files
    const newFileList = new DataTransfer();
    files.forEach((file) => newFileList.items.add(file)); // Add the files to a new DataTransfer object

    this.fileInput.nativeElement.files = newFileList.files;
    this.detectChanges();

    if (this.ImageName.length == 0) {
      this.isAttachment = false;
    }
  }

  detectChanges(): void {
    this.ImageName = this.fileInput.nativeElement.files;
    this.text = this.textarea.nativeElement.value;
  }
  trimText(text: string): string {
    if (text.length < 50) {
      return text;
    } else {
      return text.slice(0, 1000) + '...';
    }
    // console.log(text);
  }

  download(url: string, name: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // console.log(url);
  }

  // isImage(attachment: any): boolean {
  //
  //   return attachment.mediaType?.toLowerCase().startsWith('image');
  // }
  isImage(attachment: any): boolean {
    if (attachment && attachment.mediaType) {
      const contentTypeMatch = attachment.mediaType.match(/image\/(\w+)/i);
      return contentTypeMatch !== null;
    }

    return false;
  }

  isVideo(attachment: any): boolean {
    if (attachment && attachment.mediaType) {
      const contentTypeMatch = attachment.mediaType.match(/video\/(\w+)/i);
      return contentTypeMatch !== null;
    }

    return false;
  }

  isAudio(attachment: any): boolean {
    if (attachment && attachment.mediaType) {
      const contentTypeMatch = attachment.mediaType.match(/audio\/(\w+)/i);
      return contentTypeMatch !== null;
    }

    return false;
  }

  isOther(attachment: any): boolean {
    return (
      !this.isImage(attachment) &&
      !this.isVideo(attachment) &&
      !this.isAudio(attachment)
    );
  }

  get emailControlTo() {
    return this.emailReplyForm.get('to');
  }

  get emailControlCc() {
    return this.emailReplyForm.get('cc');
  }

  get emailControlBcc() {
    return this.emailReplyForm.get('bcc');
  }

  // validateEmails(control: FormControl) {
  //   const emails = control.value.split(',');
  //   const emailRegex = /^\s*[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\s*$/i;

  //   for (const email of emails) {
  //     if (!emailRegex.test(email.trim())) {
  //       return { email: true };
  //     }
  //   }

  //   return null;
  // }
}
