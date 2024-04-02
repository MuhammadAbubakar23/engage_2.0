import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { RulesGroupIdsService } from 'src/app/services/RulesGroupIds/rules-group-ids.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UpdateMessagesService } from 'src/app/services/UpdateMessagesService/update-messages.service';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import {
  commentsDto,
  messagesDto,
} from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('radioInput', { static: false })
  radioInput!: ElementRef<HTMLInputElement>;

  checkTag = false;
  activeTag = false;
  TagsList: any[] = [];

  userIdsDto = this.fetchId.getIds();
  queryType = this.getQueryTypeService.getQueryType();
  ImageName: any;
  ImageArray: any[] = [];
  ChannelCommentsOrTweets: any[] = [];
  ChannelMessages: any[] = [];
  ChannelMentions: any[] = [];

  pageNumber: any = 1;
  pageSize: any = 10;
  totalUnrespondedCmntCountByCustomer: number = 0;
  totalUnrespondedMsgCountByCustomer: number = 0;
  totalUnrespondedMentionCountByCustomer: number = 0;

  TotalCmntQueryCount: number = 0;
  TotalMsgQueryCount: number = 0;
  TotalMentionQueryCount: number = 0;

  pageName: string = '';

  show = false;
  isOpen = false;
  active = false;

  statusId: any;
  commentText: any;
  msgText: any;
  authorUserId: any;
  authorFullName: any;
  authorName: any;
  inReplyToStatusId: any;
  inReplyToUserId: any;
  inReplyToScreenName: any;
  authorProfilePic: any;
  isAuthorVerified: any;
  insertionDate: any;
  isDeleted: any;
  authorFollowers: any;
  queryStatus: any;

  isLikedByAdmin: any;
  ticketId: any;

  tweetId: number = 0;
  newReply: any;

  commentStatusDto = new CommentStatusDto();

  querryCompleted = false;

  storeComId: any;
  insertTagsForFeedDto = new InsertTagsForFeedDto();

  getAppliedTagsList: any;

  TodayDate: any;

  public Subscription!: Subscription;
  public criteria!: SortCriteria;
  searchText: string = '';
  spinner1running = false;
  spinner2running = false;

  quickReplySearchText: string = '';

  flag: string = '';
  teamPermissions: any;

  commentDto = new commentsDto();
  messageDto = new messagesDto();

  updatedComments: any;
  // updatedMessages: any;
  userProfileId = 0;
  filterDto = new FiltersDto();
  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  commentsArray: any[] = [];
  groupArrays: any[] = [];

  messagesArray: any[] = [];
  mentionsArray: any[] = [];
  groupedMessages: any[] = [];
  groupedMentions: any[] = [];
  repliesArray: any[] = [];
  groupRepliesArray: any[] = [];
  userInfo: any;
  profileIdForStats: any;
  tweetIdForStats: any;
  Keywords: any[] = [];
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  QuickReplies: any;
  agentId: string = '';
  platform: string = '';
  postType: string = '';
  profileId: string = '';
  profilePageId: string = '';

  ReplyDto = new ReplyDto();
  text: string = '';
  UploadedFile: FormData = new FormData();
  isAttachment = false;
  twitterMsgId: number = 0;
  twitterMentionId: number = 0;
  likeByAdminDto = new LikeByAdminDto();
  toastermessage = false;
  AlterMsg: any = '';
  commentReply: any;
  TTReply: boolean = true;
  TMReply: boolean = false;
  TDMReply: boolean = false;
  markAsComplete = false;
  @ViewChild('textarea')
  textarea!: ElementRef;
  addTags: any;
  removeTags: any;

  messagesStatus: any[] = [];
  Sentiments: any[] = [];

  constructor(
    private fetchId: FetchIdService,
    private changeDetect: ChangeDetectorRef,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService: UpdateCommentsService,
    private updateMessagesService: UpdateMessagesService,
    private queryStatusService: QueryStatusService,
    private replyService: ReplyService,
    private unrespondedCountService: UnRespondedCountService,
    private createTicketService: CreateTicketService,
    private toggleService: ToggleService,
    private ticketResponseService: TicketResponseService,
    private getQueryTypeService: GetQueryTypeService,
    private router: Router,
    private stor: StorageService,
    private userInfoService: UserInformationService,
    private getWing: GetWingsService,
    private getRulesGroupIdsService : RulesGroupIdsService
  ) {
    // this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
    //   this.id = res;
    //   this.getChannelCommentsOrTweets();
    //   this.getTwitterDM();
    // });
  }

  ngOnInit(): void {
    this.teamPermissions = this.stor.retrive('permissionteam', 'O').local;

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

    this.flag = this.router.url.split('/')[2];
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };

    this.TodayDate = new Date();
    this.getChannelCommentsOrTweets();
    this.getTwitterDM();
    this.getChannelMentions();
    this.quickReplyList();

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
    this.Subscription = this.updateMessagesService
      .receiveMessage()
      .subscribe((res) => {
        this.updateMessagesDataListener(res);
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
        if (
          this.flag == 'focused' ||
          this.flag == 'assigned_to_me' ||
          this.flag == 'follow_up'
        ) {
          if (res.contentCount.contentType == 'TT') {
            this.totalUnrespondedCmntCountByCustomer =
              res.contentCount.unrespondedCount;
          }
        }
      });
    this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListener();
      });

    this.ticketResponseService.getTicketId().subscribe((res) => {
      this.updateTicketId(res);
    });

    // this.Subscription = this.applySentimentService
    //   .receiveSentiment()
    //   .subscribe((res) => {
    //     this.applySentimentListner(res);
    //   });

    // this.Subscription = this.queryStatusService
    //   .receiveQueryStatus()
    //   .subscribe((res) => {
    //     this.updateMessageStatusDataListener(res);
    //   });
  }

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
          sentiment: '',
          tags: [],
        };
        this.ChannelCommentsOrTweets.forEach((item: any) => {
          this.commentsArray = [];
          if (item.post.postId == xyz.postId) {
            item.comments.push(this.commentDto);
            item.comments.forEach((cmnt: any) => {
              this.commentsArray.push(cmnt);
            });

            let groupedItems = this.commentsArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate?.split('T')[0];
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              },
              {}
            );

            item['groupedComments'] = Object.keys(groupedItems).map(
              (createdDate) => {
                return {
                  createdDate,
                  items: groupedItems[createdDate],
                };
              }
            );
          }
        });
        this.totalUnrespondedCmntCountByCustomer =
          this.totalUnrespondedCmntCountByCustomer + 1;
      }
    });
    this.changeDetect.detectChanges();
  }

  updateMessagesDataListener(res: any) {
    res.forEach((xyz: any) => {
      if (xyz.contentType == 'TDM') {
        if (this.id == xyz.fromId) {
          this.messageDto = {
            id: xyz.id,
            contentType: xyz.contentType,
            queryStatus: xyz.queryStatus,
            createdDate: xyz.createdDate,
            attachments: xyz.mediaAttachments,
            replies: [],
            sentiment: '',
            tags: [],
            msgId: xyz.msgId,
            fromId: xyz.fromId,
            fromName: xyz.fromName,
            fromProfilePic: xyz.fromProfilePic,
            toId: xyz.toId,
            toName: xyz.toName,
            msgText: xyz.msgText,
            agentId: xyz.agentId,
            customerSocailProfileId: xyz.agentId,
            profileId: xyz.profileId,
            profilePageId: xyz.profilePageId,
          };
          this.ChannelMessages.unshift(this.messageDto);
          this.messagesArray.push(this.messageDto);
          let groupedItems = this.messagesArray.reduce(
            (acc: any, item: any) => {
              const date = item.createdDate?.split('T')[0];
              if (!acc[date]) {
                acc[date] = [];
              }
              acc[date].push(item);
              return acc;
            },
            {}
          );

          this.groupedMessages = Object.keys(groupedItems).map((date) => {
            return {
              date,
              items: groupedItems[date],
            };
          });
          this.totalUnrespondedMsgCountByCustomer =
            this.totalUnrespondedMsgCountByCustomer + 1;
        }
      }
    });

    res.forEach((xyz: any) => {
      if (xyz.contentType == 'TM') {
        if (this.id == xyz.fromId) {
          this.messageDto = {
            id: xyz.id,
            contentType: xyz.contentType,
            queryStatus: xyz.queryStatus,
            createdDate: xyz.createdDate,
            attachments: xyz.mediaAttachments,
            replies: [],
            sentiment: '',
            tags: [],
            msgId: xyz.msgId,
            fromId: xyz.fromId,
            fromName: xyz.fromName,
            fromProfilePic: xyz.fromProfilePic,
            toId: xyz.toId,
            toName: xyz.toName,
            msgText: xyz.msgText,
            agentId: xyz.agentId,
            customerSocailProfileId: xyz.agentId,
            profileId: xyz.profileId,
            profilePageId: xyz.profilePageId,
          };
          this.ChannelMentions.unshift(this.messageDto);
          this.mentionsArray.push(this.messageDto);
          let groupedItems = this.mentionsArray.reduce(
            (acc: any, item: any) => {
              const date = item.createdDate?.split('T')[0];
              if (!acc[date]) {
                acc[date] = [];
              }
              acc[date].push(item);
              return acc;
            },
            {}
          );

          this.groupedMentions = Object.keys(groupedItems).map((date) => {
            return {
              date,
              items: groupedItems[date],
            };
          });
          this.totalUnrespondedMentionCountByCustomer =
            this.totalUnrespondedMentionCountByCustomer + 1;
        }
      }
    });
    this.changeDetect.detectChanges();
  }

  getChannelCommentsOrTweets() {
    
    this.flag = this.router.url.split('/')[2];
    if (this.id != null || this.id != undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: this.fetchId.platform,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: 'TTR',
        text: '',
        flag: this.flag,
        hasBlueTick:false,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.spinner1running = false;
            this.TTReply = true;
            this.ChannelCommentsOrTweets = res.List;

            this.userInfoService.shareUserInformation(res.List[0].user);
            this.TotalCmntQueryCount = res.TotalQueryCount;
            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            // this.pageName = this.ChannelCommentsOrTweets[0]?.post.profile.page_Name;

            this.commentsArray = [];

            this.ChannelCommentsOrTweets.forEach((item: any) => {
              this.commentsArray = [];
              item.comments.forEach((cmnt: any) => {
                this.commentsArray.push(cmnt);

                let groupedItems = this.commentsArray.reduce(
                  (acc: any, aa: any) => {
                    const date = aa.createdDate.split('T')[0];
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(aa);
                    return acc;
                  },
                  {}
                );

                item['groupedComments'] = Object.keys(groupedItems).map(
                  (createdDate) => {
                    return {
                      createdDate,
                      items: groupedItems[createdDate],
                    };
                  }
                );
              });
            });
            // this.tweetStats();
          }
        });
    } else if (this.slaId != null || this.slaId != undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        hasBlueTick:false,
        isAttachment: false,
        queryType: 'TTR',
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.TTReply = true;
          this.ChannelCommentsOrTweets = res.List;
          this.TotalCmntQueryCount = res.TotalQueryCount;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          // this.pageName = this.ChannelCommentsOrTweets[0]?.post.profile.page_Name;

          this.commentsArray = [];

          this.ChannelCommentsOrTweets.forEach((item: any) => {
            this.commentsArray = [];
            item.comments.forEach((cmnt: any) => {
              this.commentsArray.push(cmnt);

              let groupedItems = this.commentsArray.reduce(
                (acc: any, aa: any) => {
                  const date = aa.createdDate.split('T')[0];
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(aa);
                  return acc;
                },
                {}
              );

              item['groupedComments'] = Object.keys(groupedItems).map(
                (createdDate) => {
                  return {
                    createdDate,
                    items: groupedItems[createdDate],
                  };
                }
              );
            });
          });
          // this.tweetStats();
        }
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
        hasBlueTick:false,

        isAttachment: false,
        queryType: 'TTR',
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };

      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.spinner1running = false;
            this.TTReply = true;
            this.ChannelCommentsOrTweets = res.List;
            this.userInfoService.shareUserInformation(res.List[0].user);
            // this.headerCountService.shareUnresponedCount(res.TotalCount);
            this.TotalCmntQueryCount = res.TotalQueryCount;
            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            // this.pageName = this.ChannelCommentsOrTweets[0]?.post.profile.page_Name;

            this.commentsArray = [];

            this.ChannelCommentsOrTweets.forEach((item: any) => {
              this.commentsArray = [];
              item.comments.forEach((cmnt: any) => {
                this.commentsArray.push(cmnt);

                let groupedItems = this.commentsArray.reduce(
                  (acc: any, aa: any) => {
                    const date = aa.createdDate.split('T')[0];
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(aa);
                    return acc;
                  },
                  {}
                );

                item['groupedComments'] = Object.keys(groupedItems).map(
                  (createdDate) => {
                    return {
                      createdDate,
                      items: groupedItems[createdDate],
                    };
                  }
                );
              });
            });
            // this.tweetStats();
          }
        });
    }
  }

  getTwitterDM() {
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: 'TDM',
        hasBlueTick:false,
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };

      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.spinner1running = false;
            this.ChannelMessages = res.List?.dm;
            this.userInfo = res.List?.user;

            this.userInfoService.shareUserInformation(res.List.user);
            // this.pageName = res.List?.profile.page_Name;
            this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
            this.TotalMsgQueryCount = res.TotalQueryCount;

            if (
              this.ChannelCommentsOrTweets.length == 0 &&
              this.ChannelMentions.length == 0
            ) {
              this.TTReply = false;
              this.TMReply = false;
              this.TDMReply = true;
            }

            if (this.ChannelCommentsOrTweets.length == 0) {
              this.TTReply = false;
              this.TMReply = false;
              this.TDMReply = true;
            }

            this.messagesArray = [];
            this.groupedMessages = [];

            this.ChannelMessages.forEach((item: any) => {
              this.messagesArray.push(item);
              let groupedItems = this.messagesArray.reduce(
                (acc: any, item: any) => {
                  const date = item.createdDate?.split('T')[0];
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(item);
                  return acc;
                },
                {}
              );

              this.groupedMessages = Object.keys(groupedItems).map(
                (createdDate) => {
                  return {
                    createdDate,
                    items: groupedItems[createdDate],
                  };
                }
              );
            });
          }
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: 'TDM',
        hasBlueTick:false,
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.ChannelMessages = res.List?.dm;
          this.userInfoService.shareUserInformation(res.List.user);
          this.userInfo = res.List?.user;
          // this.pageName = res.List?.profile.page_Name;
          this.TotalMsgQueryCount = res.TotalQueryCount;
          this.totalUnrespondedMsgCountByCustomer = res.TotalCount;

          if (
            this.ChannelCommentsOrTweets.length == 0 &&
            this.ChannelMentions.length == 0
          ) {
            this.TTReply = false;
            this.TMReply = false;
            this.TDMReply = true;
          }

          this.messagesArray = [];
          this.groupedMessages = [];

          this.ChannelMessages.forEach((item: any) => {
            this.messagesArray.push(item);
            let groupedItems = this.messagesArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate?.split('T')[0];
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              },
              {}
            );

            this.groupedMessages = Object.keys(groupedItems).map(
              (createdDate) => {
                return {
                  createdDate,
                  items: groupedItems[createdDate],
                };
              }
            );
          });
        }
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
        hasBlueTick:false,
        isAttachment: false,
        queryType: 'TDM',
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };

      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.ChannelMessages = res.List?.dm;
            this.userInfoService.shareUserInformation(res.List.user);
            // this.headerCountService.shareUnresponedCount(res.TotalCount);
            this.userInfo = res.List?.user;
            // this.pageName = res.List?.profile.page_Name;
            this.TotalMsgQueryCount = res.TotalQueryCount;
            this.totalUnrespondedMsgCountByCustomer = res.TotalCount;

            if (
              this.ChannelCommentsOrTweets.length == 0 &&
              this.ChannelMentions.length == 0
            ) {
              this.TTReply = false;
              this.TMReply = false;
              this.TDMReply = true;
            }

            this.messagesArray = [];
            this.groupedMessages = [];

            this.ChannelMessages.forEach((item: any) => {
              this.messagesArray.push(item);
              let groupedItems = this.messagesArray.reduce(
                (acc: any, item: any) => {
                  const date = item.createdDate?.split('T')[0];
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(item);
                  return acc;
                },
                {}
              );

              this.groupedMessages = Object.keys(groupedItems).map(
                (createdDate) => {
                  return {
                    createdDate,
                    items: groupedItems[createdDate],
                  };
                }
              );
              this.SpinnerService.hide();
              this.spinner1running = false;
            });
          }
        });
    }
  }

  getChannelMentions() {
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false,
        hasBlueTick:false,
        queryType: 'TM',
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.spinner1running = false;
            this.ChannelMentions = res.List?.dm;

            this.userInfoService.shareUserInformation(res.List.user);
            this.userInfo = res.List?.user;
            this.totalUnrespondedMentionCountByCustomer = res.TotalCount;
            this.pageName = res?.List?.profile?.page_Name;
            this.TotalMentionQueryCount = res.TotalQueryCount;

            if (this.ChannelCommentsOrTweets.length == 0) {
              this.TTReply = false;
              this.TMReply = true;
              this.TDMReply = false;
            }

            this.mentionsArray = [];
            this.groupedMentions = [];

            this.ChannelMentions.forEach((item: any) => {
              this.mentionsArray.push(item);
              let groupedItems = this.mentionsArray.reduce(
                (acc: any, item: any) => {
                  const date = item.createdDate?.split('T')[0];
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(item);
                  return acc;
                },
                {}
              );

              this.groupedMentions = Object.keys(groupedItems).map(
                (createdDate) => {
                  return {
                    createdDate,
                    items: groupedItems[createdDate],
                  };
                }
              );
              // // console.log('Messages ==>', this.groupedMessages);
            });
          }
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: 0,
        pageSize: 0,
        hasBlueTick:false,
        isAttachment: false,
        queryType: 'TM',
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.ChannelMentions = res.List?.dm;
          this.userInfoService.shareUserInformation(res.List.user);
          this.userInfo = res.List?.user;
          this.totalUnrespondedMentionCountByCustomer = res.TotalCount;
          this.TotalMentionQueryCount = res.TotalQueryCount;
          this.pageName = res?.List?.profile?.page_Name;

          if (this.ChannelCommentsOrTweets.length == 0) {
            this.TTReply = false;
            this.TMReply = true;
            this.TDMReply = false;
          }

          this.mentionsArray = [];
          this.groupedMentions = [];

          this.ChannelMentions.forEach((item: any) => {
            this.mentionsArray.push(item);
            let groupedItems = this.mentionsArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate?.split('T')[0];
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              },
              {}
            );

            this.groupedMentions = Object.keys(groupedItems).map(
              (createdDate) => {
                return {
                  createdDate,
                  items: groupedItems[createdDate],
                };
              }
            );
            // console.log('Messages ==>', this.groupedMessages);
          });
        }
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
        hasBlueTick:false,
        queryType: 'TM',
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.ChannelMentions = res.List?.dm;
            this.userInfoService.shareUserInformation(res.List.user);
            // this.headerCountService.shareUnresponedCount(res.TotalCount);
            this.userInfo = res.List?.user;
            this.totalUnrespondedMentionCountByCustomer = res.TotalCount;
            this.TotalMentionQueryCount = res.TotalQueryCount;
            this.pageName = res?.List?.profile?.page_Name;

            if (this.ChannelCommentsOrTweets.length == 0) {
              this.TTReply = false;
              this.TMReply = true;
              this.TDMReply = false;
            }

            this.mentionsArray = [];
            this.groupedMentions = [];

            this.ChannelMentions.forEach((item: any) => {
              this.mentionsArray.push(item);
              let groupedItems = this.mentionsArray.reduce(
                (acc: any, item: any) => {
                  const date = item.createdDate?.split('T')[0];
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(item);
                  return acc;
                },
                {}
              );

              this.groupedMentions = Object.keys(groupedItems).map(
                (createdDate) => {
                  return {
                    createdDate,
                    items: groupedItems[createdDate],
                  };
                }
              );
            });
          }
        });
    }
  }

  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }

  toggle(child: string, cmntId: any) {
    if (localStorage.getItem('child') == child) {
      this.toggleService.addTogglePanel('');
    } else {
      this.toggleService.addTogglePanel(child);
    }

    this.createTicketService.setCommentId(cmntId);
  }

  tweetStats() {
    if (this.ChannelCommentsOrTweets != null || undefined) {
      this.ChannelCommentsOrTweets.forEach(
        async (tweet: any): Promise<void> => {
          this.profileIdForStats = tweet.post.profile.profile_Id;
          tweet.comments.forEach(async (cmnt: any) => {
            this.tweetIdForStats = cmnt?.postId;

            await this.commondata
              .GetTwitterTweetStats(
                this.profileIdForStats,
                this.tweetIdForStats
              )
              .subscribe((postStats: any) => {
                cmnt['postStats'] = postStats;
              });
          });
        }
      );
    }
  }

  commentStatus(comId: any, type: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'Twitter';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {});
  }

  insertTagsForFeed(comId: number, tagName: string) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = tagName;
    this.insertTagsForFeedDto.type = 'Tag';
    this.insertTagsForFeedDto.platform = 'Twitter';

    this.ChannelCommentsOrTweets.forEach((abc: any) => {
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

    this.ChannelMessages.forEach((msg: any) => {
      if (msg.id == comId) {
        if (msg.tags.length == 0) {
          this.commondata
            .InsertTag(this.insertTagsForFeedDto)
            .subscribe((res: any) => {
              this.reloadComponent('ApplyTag');

              this.activeTag = true;
              this.checkTag = true;
            });
        } else if (msg.tags.length > 0) {
          const value = msg.tags.find((x: any) => x.name == tagName);
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
    this.ChannelMentions.forEach((mention: any) => {
      if (mention.id == comId) {
        if (mention.tags.length == 0) {
          this.commondata
            .InsertTag(this.insertTagsForFeedDto)
            .subscribe((res: any) => {
              this.reloadComponent('ApplyTag');

              this.activeTag = true;
              this.checkTag = true;
            });
        } else if (mention.tags.length > 0) {
          const value = mention.tags.find((x: any) => x.name == tagName);
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
  }

  removeTagFromFeed(feedId: number, tagName: any) {
    if (this.flag == 'focused' || this.flag == 'assigned_to_me') {
      this.insertTagsForFeedDto.tagName = tagName;
      this.insertTagsForFeedDto.feedId = feedId;
      this.insertTagsForFeedDto.type = 'Tag';
      this.insertTagsForFeedDto.platform = 'Twitter';
      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');
          this.activeTag = false;
          this.checkTag = false;
        });
    }
  }

  openDropdown() {
    this.active = !this.active;
  }

  getTagList() {
    this.commondata.GetTagsList().subscribe((res: any) => {
      this.TagsList = res;
      this.TagsList.forEach((xyz: any) => {
        xyz.keywordList.forEach((abc: any) => {
          this.Keywords.push(abc);
        });
      });
    });
  }

  insertSentimentForFeed(comId: number, sentimenName: any) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = sentimenName;
    this.insertTagsForFeedDto.type = 'Sentiment';
    this.insertTagsForFeedDto.platform = 'Twitter';

    this.commondata
      .InsertSentiment(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      // // console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  SendCommentInformation(comId: any) {
    this.ChannelCommentsOrTweets.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.tweetId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
          this.userProfileId = this.ChannelCommentsOrTweets[0].user.id;
        }
      });
    });
  }

  TwitterRepliesForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
  });

  submitTweetReply() {
    if (this.tweetId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      // if (!this.TwitterRepliesForm.get('text')?.dirty) {
      if (this.text !== '') {
        this.TwitterRepliesForm.patchValue({
          text: this.text,
        });
      }
      // } else {
      //   if (this.TwitterRepliesForm.value.text) {
      //     this.TwitterRepliesForm.patchValue({
      //       to: this.TwitterRepliesForm.value.text
      //     });
      //   }
      // }
      this.TwitterRepliesForm.patchValue({
        commentId: this.tweetId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.TwitterRepliesForm.value)
      );
      if (
        (this.TwitterRepliesForm.value.text !== '' &&
          this.TwitterRepliesForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        this.spinner1running = true;
        this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('comment');
            if (this.radioInput != undefined) {
              this.radioInput.nativeElement.checked = false;
            }
            this.TwitterRepliesForm.reset();
          },
          (error) => {
            alert(error.message);
            this.spinner1running = false;
            this.SpinnerService.hide();
          }
        );
      } else {
        this.reloadComponent('empty-input-field');
      }
    }
    this.quickReplySearchText = '';
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

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);
    this.text = abc?.text + ' ';
    this.insertAtCaret(this.text);
  }

  detectChanges(): void {
    // this.ImageName = this.fileInput.nativeElement.files;
    this.text = this.textarea.nativeElement.value;
  }

  SendMessageInformation(id: any) {
    this.ChannelMessages.forEach((msg: any) => {
      if (msg.id == id) {
        // show mentioned reply
        this.show = true;
        this.twitterMsgId = msg.id;
        this.agentId = localStorage.getItem('agentId') || '{}';
        // this.platform = this.fetchId.platform;
        this.platform = localStorage.getItem('parent') || '';
        this.postType = msg.contentType;
        this.profileId = msg.profileId;
        this.profilePageId = msg.profilePageId;
        this.userProfileId = this.ChannelMessages[0].fromId;
      }
    });
  }

  SendMentionInformation(id: any) {
    this.ChannelMentions.forEach((mention: any) => {
      if (mention.id == id) {
        // show mentioned reply
        this.show = true;
        this.twitterMentionId = mention.id;
        this.agentId = localStorage.getItem('agentId') || '{}';
        this.platform = localStorage.getItem('parent') || '';
        this.postType = mention.contentType;
        this.profileId = mention.profileId;
        this.profilePageId = mention.profilePageId;
        this.userProfileId = this.ChannelMentions[0].fromId;
      }
    });
  }
  twitterMessageReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
  });
  submitTwitterMessageReply() {
    if (this.twitterMsgId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      if (!this.twitterMessageReplyForm.get('text')?.dirty) {
        if (this.text !== '') {
          this.twitterMessageReplyForm.patchValue({
            text: this.text,
          });
        }
      } else {
        if (this.twitterMessageReplyForm.value.text) {
          this.twitterMessageReplyForm.patchValue({
            to: this.twitterMessageReplyForm.value.text,
          });
        }
      }
      this.twitterMessageReplyForm.patchValue({
        commentId: this.twitterMsgId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.twitterMessageReplyForm.value)
      );
      if (
        (this.twitterMessageReplyForm.value.text !== '' &&
          this.twitterMessageReplyForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        this.spinner1running = true;
        this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('comment');
            if (this.radioInput != undefined) {
              this.radioInput.nativeElement.checked = false;
            }
            this.twitterMessageReplyForm.reset();
          },
          (error) => {
            alert(error.message);
            this.spinner1running = false;
            this.SpinnerService.hide();
          }
        );
      } else {
        this.reloadComponent('empty-input-field');
      }
    }
    this.quickReplySearchText = '';
  }

  submitTwitterMentionReply() {
    if (this.twitterMentionId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      if (!this.twitterMessageReplyForm.get('text')?.dirty) {
        if (this.text !== '') {
          this.twitterMessageReplyForm.patchValue({
            text: this.text,
          });
        }
      } else {
        if (this.twitterMessageReplyForm.value.text) {
          this.twitterMessageReplyForm.patchValue({
            to: this.twitterMessageReplyForm.value.text,
          });
        }
      }
      this.twitterMessageReplyForm.patchValue({
        commentId: this.twitterMentionId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.twitterMessageReplyForm.value)
      );
      if (
        (this.twitterMessageReplyForm.value.text !== '' &&
          this.twitterMessageReplyForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        this.spinner1running = true;
        this.SpinnerService.show();

        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('comment');
            if (this.radioInput != undefined) {
              this.radioInput.nativeElement.checked = false;
            }
            this.twitterMessageReplyForm.reset();
          },
          (error) => {
            alert(error.message);
            this.spinner1running = false;
            this.SpinnerService.hide();
          }
        );
      } else {
        this.reloadComponent('empty-input-field');
      }
    }
    this.quickReplySearchText = '';
  }

  likeByAdmin(
    comId: any,
    isLiked: boolean,
    userId: any,
    platform: any,
    profilePageId: any,
    profileId: any
  ) {
    isLiked = !isLiked;

    this.likeByAdminDto = {
      platform: platform,
      commentId: comId,
      isLiked: isLiked,
      profilePageId: profilePageId,
      profileId: profileId,
      userFromId: userId,
    };
    this.commondata.LikedByAdmin(this.likeByAdminDto).subscribe((res: any) => {
      if (isLiked == true) {
        this.reloadComponent('Like');
      }
      if (isLiked == false) {
        this.reloadComponent('disLike');
      }
    });
  }

  reloadComponent(type: any) {
    if (type == 'Attachments') {
      this.AlterMsg = 'File size must be less than 4MB';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'empty-input-field') {
      this.AlterMsg = 'Please write something!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'selectComment') {
      this.AlterMsg = 'No comment or message is selected!';
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

  clearInputField() {
    this.ImageArray = [];
    this.msgText = '';
    this.show = false;
    this.tweetId = 0;
    this.twitterMsgId = 0;
    this.twitterMentionId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    // this.fileInput.nativeElement.value = '';
    this.detectChanges();
  }

  twitterTweetReply() {
    this.TTReply = true;
    this.TMReply = false;
    this.TDMReply = false;
  }

  twitterMessageReply() {
    this.TTReply = false;
    this.TMReply = false;
    this.TDMReply = true;
  }

  twitterMentionReply() {
    this.TTReply = false;
    this.TMReply = true;
    this.TDMReply = false;
  }

  queryCompleted(comId: any, type: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'Twitter';
    // this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }

  markAsCompleteExpanded(comId: any) {
    this.ChannelCommentsOrTweets.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          this.markAsComplete = !this.markAsComplete;
        }
      });
    });
  }
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
      this.detectChanges();
    }
  }

  insertEmoji(emoji: any) {
    this.insertAtCaret(' ' + emoji + ' ');
  }

  addTagDataListener() {
    this.ChannelCommentsOrTweets?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
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
    this.ChannelMessages?.forEach((msg: any) => {
      if (msg.id == this.addTags.feedId) {
        if (this.addTags.type == 'Tag') {
          if (msg.tags.length == 0) {
            msg.tags.push(this.addTags);
          } else if (msg.tags.length > 0) {
            const tag = msg.tags.find(
              (x: any) => x.name == this.addTags.tagName
            );
            if (tag != null || tag != undefined) {
              const index = msg.tags.indexOf(tag);
              if (index !== -1) {
                msg.tags.splice(index, 1);
              }
            } else {
              msg.tags.push(this.addTags);
            }
          }
        }
        if (this.addTags.type == 'Sentiment') {
          msg.sentiment = this.addTags;
        }
      }
    });
    this.ChannelMentions.forEach((mention: any) => {
      if (mention.id == this.addTags.feedId) {
        if (this.addTags.type == 'Tag') {
          if (mention.tags.length == 0) {
            mention.tags.push(this.addTags);
          } else if (mention.tags.length > 0) {
            const index = mention.tags.findIndex(
              (x: any) => x.name == this.addTags.tagName
            );
            if (index !== -1) {
              mention.tags.splice(index, 1);
            } else {
              mention.tags.push(this.addTags);
            }
          }
        }
        if (this.addTags.type == 'Sentiment') {
          mention.sentiment = this.addTags;
        }
      }
    });
    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
    this.ChannelCommentsOrTweets?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
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
    this.ChannelMessages?.forEach((msg: any) => {
      if (msg.id == this.removeTags.feedId) {
        var tag = msg.tags.find((x: any) => x.name == this.removeTags.tagName);
        const index = msg.tags.indexOf(tag);
        if (index !== -1) {
          msg.tags.splice(index, 1);
        }
      }
    });
    this.ChannelMentions.forEach((mention: any) => {
      if (mention.id == this.removeTags.feedId) {
        var tag = mention.tags.find(
          (x: any) => x.name == this.removeTags.tagName
        );
        const index = mention.tags.indexOf(tag);
        if (index !== -1) {
          mention.tags.splice(index, 1);
        }
      }
    });
    this.changeDetect.detectChanges();
  }

  updateQueryStatusDataListener() {
    this.ChannelCommentsOrTweets.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.queryStatus.queryId) {
            singleCmnt.queryStatus = this.queryStatus.queryStatus;
            singleCmnt.isLikedByAdmin = this.queryStatus.isLikes;
          }
        });
      });
    });
    this.ChannelMessages.forEach((msg: any) => {
      if (msg.id == this.queryStatus.queryId) {
        msg.queryStatus = this.queryStatus.queryStatus;
      }
    });
    this.ChannelMentions.forEach((mention: any) => {
      if (mention.id == this.queryStatus.queryId) {
        mention.queryStatus = this.queryStatus.queryStatus;
      }
    });
    this.changeDetect.detectChanges();
  }

  replyDataListener() {
    this.ChannelCommentsOrTweets.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.newReply.commentId) {
            singleCmnt.replies.push(this.newReply);
            singleCmnt.queryStatus = this.newReply.queryStatus;
          }
        });
      });
    });
    this.ChannelMessages.forEach((msg: any) => {
      if (msg.id == this.newReply.commentId) {
        msg.replies.push(this.newReply);
        msg.queryStatus = this.newReply.queryStatus;
      }
    });

    this.ChannelMentions.forEach((msg: any) => {
      if (msg.id == this.newReply.commentId) {
        msg.replies.push(this.newReply);
        msg.queryStatus = this.newReply.queryStatus;
      }
    });
    this.changeDetect.detectChanges();
  }

  updateBulkQueryStatusDataListener() {
    this.ChannelCommentsOrTweets.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          this.queryStatus.forEach((querry: any) => {
            if (singleCmnt.id == querry.queryId) {
              singleCmnt.queryStatus = querry.queryStatus;
              this.totalUnrespondedCmntCountByCustomer = 0;
            }
          });
        });
      });
    });
    this.ChannelMessages.forEach((msg: any) => {
      this.queryStatus.forEach((querry: any) => {
        if (msg.id == querry.queryId) {
          msg.queryStatus = querry.queryStatus;
          this.totalUnrespondedMsgCountByCustomer = 0;
        }
      });
    });
    this.ChannelMentions.forEach((mention: any) => {
      this.queryStatus.forEach((querry: any) => {
        if (mention.id == querry.queryId) {
          mention.queryStatus = querry.queryStatus;
          this.totalUnrespondedMentionCountByCustomer = 0;
        }
      });
    });
    this.changeDetect.detectChanges();
  }

  updateTicketId(res: any) {
    this.ChannelCommentsOrTweets.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == res.queryId) {
            singleCmnt.ticketId = res.ticketId;
          }
        });
      });
    });
    this.ChannelMessages.forEach((msg: any) => {
      if (msg.id == res.queryId) {
        msg.ticketId = res.ticketId;
      }
    });
    this.changeDetect.detectChanges();
  }
  onScrollComments() {
    if (this.TotalCmntQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getChannelCommentsOrTweets();
    }
  }
  onScrollMessages() {
    if (this.TotalMsgQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getTwitterDM();
    }
  }

  closeQuickResponseSidebar() {
    this.quickReplySearchText = '';
    if (this.radioInput != undefined) {
      this.radioInput.nativeElement.checked = false;
    }
  }

  isImage(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('image');
  }

  isVideo(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('video');
  }
}
