import {
  AfterViewInit,
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
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import {
  commentsDto,
  conversationDetailDto,
  listDto,
  messagesDto,
  postStatsDto,
} from 'src/app/shared/Models/concersationDetailDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { FacebookMessageReplyDto } from 'src/app/shared/Models/FacebookMessageReplyDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { Subscription } from 'rxjs';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UpdateMessagesService } from 'src/app/services/UpdateMessagesService/update-messages.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';
import { ApplySentimentService } from 'src/app/services/ApplySentimentService/apply-sentiment.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';

declare var toggleEmojis: any;
@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss'],
})
export class FacebookComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('radioInput', { static: false })
  radioInput!: ElementRef<HTMLInputElement>;

  FacebookData: any;
  FacebookMessages: any;
  TagsList: any;
  totalUnrespondedMsgCountByCustomer: any = 0;
  pageNumber: any = 1;
  pageSize: any = 10;
  TodayDate: any;
  facebookcommentdata: any;
  facebookmessagedata: any;
  commentIdForStats: any;
  newReply: any;
  queryStatus: any;
  tagDropdown = false;

  chatText: any;
  commentId: number = 0;
  agentId: any;
  platform: any;
  postType: any;
  dmMsg: any = '';
  msgText: any = '';
  msgId: number = 0;
  filesToUpload: any;
  ImageName: any;
  ImageArray: any[] = [];
  totalUnrespondedCmntCountByCustomer: number = 0;
  postIdForStats: any;
  pageIdForStats: any;
  totalPostReactionsCount: number = 0;
  totalCommentReactionsCount: number = 0;
  pageName: any = '';
  commentReply: any;
  getAppliedTagsList: any;
  FbStats: any;
  storeComId: any;
  AlterMsg: any = '';

  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  queryType = this.getQueryTypeService.getQueryType();
  agentName = localStorage.getItem('agentName');

  ReplyDto = new ReplyDto();
  facebookMessageReplyDto = new FacebookMessageReplyDto();
  PostStatsDto = new postStatsDto();
  ConverstationDetailDto = new conversationDetailDto();
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  commentStatusDto = new CommentStatusDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();
  postStatsDto = new postStatsDto();
  listDto = new listDto();
  filterDto = new FiltersDto();
  UploadedFile: FormData = new FormData();

  show = false;
  isOpen = false;
  active = false;
  fbCmntReply = true;
  fbMsgReply = false;
  checkTag = false;
  activeTag = false;
  querryCompleted = false;
  markAsComplete = false;
  toastermessage = false;

  searchText: string = '';

  PostStatsArray: postStatsDto[] = [];
  CommentStatsDto: any[] = [];
  QuickReplies: any[] = [];
  HumanAgentTags: any[] = [];
  Keywords: any[] = [];

  commentsArray: any[] = [];
  groupArrays: any[] = [];

  messagesArray: any[] = [];
  groupedMessages: any[] = [];
  quickReplySearchText: string = '';

  public Subscription!: Subscription;
  public criteria!: SortCriteria;

  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private unrespondedCountService: UnRespondedCountService,
    private updateCommentsService: UpdateCommentsService,
    private updateMessagesService: UpdateMessagesService,
    private replyService: ReplyService,
    private queryStatusService: QueryStatusService,
    private createTicketService: CreateTicketService,
    private ticketResponseService: TicketResponseService,
    private applySentimentService: ApplySentimentService,
    private getQueryTypeService: GetQueryTypeService
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
      this.id = res;
      this.getFacebookComments();
      this.getFacebookMessages();
    });
  }

  ngOnInit(): void {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
    this.TodayDate = new Date();

    this.getFacebookComments();
    this.getFacebookMessages();
    this.getTagList();
    this.quickReplyList();
    this.humanAgentTags();

    this.Subscription = this.addTagService.receiveTags().subscribe((res) => {
      this.addTags = res;
      this.addTagDataListner();
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
        this.updatedMessages = res;
        this.updateMessagesDataListener();
      });
    this.Subscription = this.replyService.receiveReply().subscribe((res) => {
      this.newReply = res;
      this.replyDataListner();
    });
    this.Subscription = this.queryStatusService
      .receiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateQueryStatusDataListner();
      });
    this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListner();
      });
    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        if (res.contentCount.contentType == 'FC') {
          this.totalUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
        if (res.contentCount.contentType == 'FCP') {
          this.totalUnrespondedMsgCountByCustomer =
            res.contentCount.unrespondedCount;
        }
      });

    this.ticketResponseService.getTicketId().subscribe((res) => {
      this.updateTicketId(res);
    });

    this.Subscription = this.applySentimentService
      .receiveSentiment()
      .subscribe((res) => {
        this.applySentimentListner(res);
      });
  }

  totalComments: number = 0;
  totalMessages: number = 0;

  getFacebookComments() {
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
        queryType: this.queryType,
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.spinner1running = false;
          this.ConverstationDetailDto = res;
          this.FacebookData = this.ConverstationDetailDto.List;
          this.pageName = this.FacebookData[0]?.post.profile.page_Name;

          if (this.FacebookData) {
            this.fbCmntReply = true;
            this.fbMsgReply = false;
          } else if (this.FacebookMessages && !this.FacebookData) {
            this.fbCmntReply = false;
            this.fbMsgReply = true;
          }

          this.commentsArray = [];

          this.FacebookData.forEach((item: any) => {
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

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          // this.fbStats();
          // console.log('Facebook data', this.FacebookData);
        });
    } else if (this.slaId != null || this.slaId != undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Facebook',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
      };
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.FacebookData = res.List;
        this.totalComments = res.TotalCount;
        this.pageName = this.FacebookData[0].post.profile.page_Name;

        if (this.FacebookData) {
          this.fbCmntReply = true;
          this.fbMsgReply = false;
        } else if (this.FacebookMessages && !this.FacebookData) {
          this.fbCmntReply = false;
          this.fbMsgReply = true;
        }

        this.commentsArray = [];

        this.FacebookData.forEach((item: any) => {
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

        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        // this.fbStats();
      });
    }
    // if ((this.id == null || this.id == undefined) && (this.slaId == null || this.slaId == undefined))
    else {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: localStorage.getItem('storeOpenedId') || '{}',
        pageId: '',
        plateForm: localStorage.getItem('parent') || '{}',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.ConverstationDetailDto = res;
          this.FacebookData = this.ConverstationDetailDto.List;
          this.totalComments = res.TotalCount;
          this.pageName = this.FacebookData[0]?.post.profile.page_Name;

          if (this.FacebookData) {
            this.fbCmntReply = true;
            this.fbMsgReply = false;
          } else if (this.FacebookMessages && !this.FacebookData) {
            this.fbCmntReply = false;
            this.fbMsgReply = true;
          }

          this.commentsArray = [];

          this.FacebookData.forEach((item: any) => {
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

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          // this.fbStats();
          // console.log('Facebook data', this.FacebookData);
        });
    }
  }

  commentDto = new commentsDto();
  messageDto = new messagesDto();

  updatedComments: any;
  updatedMessages: any;

  spinner1running = false;
  spinner2running = false;

  updateCommentsDataListener() {
    if(!this.id){
      this.id = localStorage.getItem('storeOpenedId') || '{}'
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
        this.FacebookData.forEach((item: any) => {
          this.commentsArray = [];
          if (item.post.postId == xyz.postId) {
            item.comments.push(this.commentDto);
            item.comments.forEach((cmnt: any) => {
              this.commentsArray.push(cmnt);
            });

            let groupedItems = this.commentsArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate.split('T')[0];
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

  updateMessagesDataListener() {
    
    if(!this.id){
      this.id = localStorage.getItem('storeOpenedId') || '{}'
    }
    this.updatedMessages.forEach((xyz: any) => {
      if (this.id == xyz.fromId) {
        this.messageDto = {
          id: xyz.id,
          contentType: xyz.contentType,
          queryStatus: xyz.queryStatus,
          createdDate: xyz.createdDate,
          attachments: xyz.attachments,
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
          agentId: '',
          customerSocailProfileId: 0,
          profileId: xyz.profileId,
          profilePageId: xyz.profilePageId,
        };
        this.FacebookMessages.unshift(this.messageDto);
        this.messagesArray.unshift(this.messageDto);

        let groupedItems = this.messagesArray.reduce((acc: any, item: any) => {
          const date = item.createdDate.split('T')[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});

        this.groupedMessages = Object.keys(groupedItems).map((createdDate) => {
          return {
            createdDate,
            items: groupedItems[createdDate],
          };
        });
        // this.fbMsgReply = true;
        // console.log('Messages ==>', this.groupedMessages);
        this.totalUnrespondedMsgCountByCustomer =
          this.totalUnrespondedMsgCountByCustomer + 1;
      }
    });
    this.changeDetect.detectChanges();
  }

  addTags: any;
  removeTags: any;

  addTagDataListner() {
    if (this.addTags.feedType == 'FC') {
      this.FacebookData.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.addTags.feedId) {
              if (singleCmnt.tags.length == 0) {
                singleCmnt.tags.push(this.addTags);
              } else if (singleCmnt.tags.length > 0) {
                const tag = singleCmnt.tags.find(
                  (x: any) => x.id == this.addTags.feedId
                );
                if (tag != null || tag != undefined) {
                  const index = singleCmnt.tags.indexOf(tag);
                  if (index !== -1) {
                    singleCmnt.tags.splice(index, 1);
                  }
                } else {
                  singleCmnt.tags.push(this.addTags);
                }
              }
            }
          });
        });
      });
    }
    if (this.addTags.feedType == 'FCP') {
      this.FacebookMessages.forEach((msg: any) => {
        if (msg.id == this.addTags.feedId) {
          if (msg.tags.length == 0) {
            msg.tags.push(this.addTags);
          } else if (msg.tags.length > 0) {
            const tag = msg.tags.find((x: any) => x.id == this.addTags.feedId);
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
      });
    }
    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
    if (this.removeTags.feedType == 'FC') {
      this.FacebookData.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.removeTags.feedId) {
              var tag = singleCmnt.tags.find(
                (x: any) => x.id == this.removeTags.tagId
              );
              const index = singleCmnt.tags.indexOf(tag);
              if (index !== -1) {
                singleCmnt.tags.splice(index, 1);
              }
            }
          });
        });
      });
    }
    if (this.removeTags.feedType == 'FCP') {
      this.FacebookMessages.forEach((msg: any) => {
        if (msg.id == this.removeTags.feedId) {
          var tag = msg.tags.find((x: any) => x.id == this.removeTags.tagId);
          const index = msg.tags.indexOf(tag);
          if (index !== -1) {
            msg.tags.splice(index, 1);
          }
        }
      });
    }
    this.changeDetect.detectChanges();
  }

  updateQueryStatusDataListner() {
    this.FacebookData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.queryStatus.queryId) {
            singleCmnt.queryStatus = this.queryStatus.queryStatus;
            singleCmnt.isLikedByAdmin = this.queryStatus.isLikes;
          }
        });
      });
    });
    this.FacebookMessages.forEach((msg: any) => {
      if (msg.id == this.queryStatus.queryId) {
        msg.queryStatus = this.queryStatus.queryStatus;
      }
    });
    this.changeDetect.detectChanges();
  }

  updateBulkQueryStatusDataListner() {
    this.queryStatus.forEach((querry: any) => {
      if (querry.feedType == 'FC') {
        this.FacebookData.forEach((post: any) => {
          post.groupedComments.forEach((cmnt: any) => {
            cmnt.items.forEach((singleCmnt: any) => {
              if (singleCmnt.id == querry.queryId) {
                singleCmnt.queryStatus = querry.queryStatus;
                this.totalUnrespondedCmntCountByCustomer = 0;
              }
            });
          });
        });
      }
      if (querry.feedType == 'FCP') {
        this.FacebookMessages.forEach((msg: any) => {
          if (msg.id == querry.queryId) {
            msg.queryStatus = querry.queryStatus;
            this.totalUnrespondedMsgCountByCustomer = 0;
          }
        });
      }
    });

    this.changeDetect.detectChanges();
  }

  replyDataListner() {
    if (this.newReply.contentType == 'FC') {
      this.FacebookData.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.newReply.commentId) {
              singleCmnt.replies.push(this.newReply);
              singleCmnt.queryStatus = this.newReply.queryStatus;
            }
          });
        });
      });
    }
    if (this.newReply.contentType == 'FCP') {
      this.FacebookMessages.forEach((msg: any) => {
        if (msg.id == this.newReply.commentId) {
          msg.replies.push(this.newReply);
          msg.queryStatus = this.newReply.queryStatus;
        }
      });
    }
    this.changeDetect.detectChanges();
  }

  getFacebookMessages() {
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Facebook',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.FacebookMessages = res.List?.dm;
          this.pageName = this.FacebookMessages[0]?.toName;
          this.totalUnrespondedMsgCountByCustomer = res.TotalCount;

          this.messagesArray = [];
          this.groupedMessages = [];

          this.FacebookMessages.forEach((item: any) => {
            this.messagesArray.push(item);
            let groupedItems = this.messagesArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate.split('T')[0];
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
            // console.log('Messages ==>', this.groupedMessages);
          });
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Facebook',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.FacebookMessages = res.List?.dm;
        this.pageName = this.FacebookMessages[0].toName;
        this.totalMessages = res.TotalCount;

        this.totalUnrespondedMsgCountByCustomer = res.TotalCount;

        // if(this.FacebookData){
        //   this.fbCmntReply = true;
        //   this.fbMsgReply = false;
        // } else {
        //   this.fbCmntReply = false;
        //   this.fbMsgReply = true;
        // }

        this.messagesArray = [];
        this.groupedMessages = [];

        this.FacebookMessages.forEach((item: any) => {
          this.messagesArray.push(item);
          let groupedItems = this.messagesArray.reduce(
            (acc: any, item: any) => {
              const date = item.createdDate.split('T')[0];
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
          // console.log('Messages ==>', this.groupedMessages);
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
        queryType: this.queryType,
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.FacebookMessages = res.List?.dm;
          this.pageName = this.FacebookMessages[0].toName;
          this.totalMessages = res.TotalCount;

          this.totalUnrespondedMsgCountByCustomer = res.TotalCount;

          // if(this.FacebookData){
          //   this.fbCmntReply = true;
          //   this.fbMsgReply = false;
          // } else {
          //   this.fbCmntReply = false;
          //   this.fbMsgReply = true;
          // }

          this.messagesArray = [];
          this.groupedMessages = [];

          this.FacebookMessages.forEach((item: any) => {
            this.messagesArray.push(item);
            let groupedItems = this.messagesArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate.split('T')[0];
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
            // console.log('Messages ==>', this.groupedMessages);
          });
        });
    }
  }

  isAttachment = false;

  onFileChanged() {
    if (this.fileInput.nativeElement.files.length > 0) {
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
  }

  fbStats() {
    // this.shareFbResService.updateMessage(this.FacebookData);
    if (this.FacebookData != null || undefined) {
      this.FacebookData.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post.postId;
        this.pageIdForStats = post.post?.postId.split('_')[0];

        await this.commondata
          .GetFbPostStats(this.pageIdForStats, this.postIdForStats)
          .subscribe((postStats: any) => {
            post.post['postStats'] = postStats;

            this.totalPostReactionsCount =
              postStats.reactioinsLIst.like +
              postStats.reactioinsLIst.love +
              postStats.reactioinsLIst.wow +
              postStats.reactioinsLIst.haha +
              postStats.reactioinsLIst.sorry +
              postStats.reactioinsLIst.anger +
              postStats.reactioinsLIst.sad +
              postStats.reactioinsLIst.thankful +
              postStats.reactioinsLIst.pride +
              postStats.reactioinsLIst.cARE;
            // this.SpinnerService.hide();
          });
      });
    }
    this.FacebookData.forEach((post: any) => {
      post.comments.forEach(async (comment: any) => {
        this.commentIdForStats = comment.commentId;

        await this.commondata
          .GetFbCommentStats(this.pageIdForStats, this.commentIdForStats)
          .subscribe((commentStats: any) => {
            comment['comStats'] = commentStats;

            this.totalCommentReactionsCount =
              commentStats.reactioinsLIst.like +
              commentStats.reactioinsLIst.love +
              commentStats.reactioinsLIst.wow +
              commentStats.reactioinsLIst.haha +
              commentStats.reactioinsLIst.sorry +
              commentStats.reactioinsLIst.anger +
              commentStats.reactioinsLIst.sad +
              commentStats.reactioinsLIst.thankful +
              commentStats.reactioinsLIst.pride +
              commentStats.reactioinsLIst.cARE;
          });
      });
    });
  }

  userProfileId = 0;

  facebookReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
  });

  facebookMessageReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
  });

  profileId: string = '';
  profilePageId: string = '';

  SendCommentInformation(comId: any) {
    this.FacebookData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.commentId = comment.id;
          this.agentId = localStorage.getItem('agentId');
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
          this.userProfileId = this.FacebookData[0].user.id;
        }
      });
    });
  }
  SendMessageInformation(id: any) {
    this.FacebookMessages.forEach((msg: any) => {
      if (msg.id == id) {
        // show mentioned reply
        this.show = true;
        this.msgId = msg.id;
        this.agentId = localStorage.getItem('agentId');
        this.platform = this.fetchId.platform;
        this.postType = 'FCP';
        this.profileId = msg.profileId;
        this.profilePageId = msg.profilePageId;
        this.userProfileId = this.FacebookData[0].user.id;
      }
    });
  }

  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }

  text: string = '';

  submitFacebookReply() {
    debugger
    if (this.commentId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      // if () {
        if (this.text !== '') {
          this.facebookReplyForm.patchValue({
            text: this.text,
          });
        }
      // }
      //  else {
      //   if (this.facebookReplyForm.value.text) {
      //     this.facebookReplyForm.patchValue({
      //       to: this.facebookReplyForm.value.text,
      //     });
      //   }
      // }
      this.facebookReplyForm.patchValue({
        commentId: this.commentId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId : this.userProfileId
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.facebookReplyForm.value)
      );
      if (
        (this.facebookReplyForm.value.text !== '' &&
          this.facebookReplyForm.value.text !== null) ||
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

            this.facebookReplyForm.reset();

            this.radioInput.nativeElement.checked = false;
          },
          ({ error }) => {
            //  alert(error.message);
          }
        );
      } else {
        this.reloadComponent('empty-input-field');
      }
    }
    this.quickReplySearchText = '';
  }

  clearInputField() {
    this.ImageArray = [];
    this.msgText = '';
    this.show = false;
    this.commentId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.msgId = 0;
    this.fileInput.nativeElement.value = '';
    this.detectChanges();
  }

  submitFacebookMessageReply() {
    debugger
    if (this.msgId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      // if (!this.facebookMessageReplyForm.get('text')?.dirty) {
        if (this.text !== '') {
          this.facebookMessageReplyForm.patchValue({
            text: this.text,
          });
        }
      // } else {
      //   if (this.facebookMessageReplyForm.value.text) {
      //     this.facebookMessageReplyForm.patchValue({
      //       to: this.facebookMessageReplyForm.value.text,
      //     });
      //   }
      // }
      this.facebookMessageReplyForm.patchValue({
        commentId: this.msgId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId : this.userProfileId
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.facebookMessageReplyForm.value)
      );
      if (
        this.facebookMessageReplyForm.value.text !== '' &&
        this.facebookMessageReplyForm.value.text !== null &&
        this?.ImageName?.length > 0 &&
        this.ImageName != undefined
      ) {
        this.reloadComponent('both-text-and-attachment-added');
      } else if (
        (this.facebookMessageReplyForm.value.text !== '' &&
          this.facebookMessageReplyForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        
    this.spinner1running = true;
    this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('fbmessage');
            this.facebookMessageReplyForm.reset();

            this.radioInput.nativeElement.checked = false;
          },
          ({ error }) => {
            //  alert(error.message);
          }
        );
      } else {
        this.reloadComponent('empty-input-field');
      }
    }
    this.quickReplySearchText = '';
  }

  toggle(child: string, cmntId: any) {
    if (localStorage.getItem('child') == child) {
      this.toggleService.addTogglePanel('');
    } else {
      this.toggleService.addTogglePanel(child);
    }

    this.createTicketService.setCommentId(cmntId);
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);
    this.text = abc?.text + ' ';
    this.insertAtCaret(this.text);
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
    });
  }

  humanAgentTags() {
    this.commondata.GetHumanAgentTag().subscribe((res: any) => {
      this.HumanAgentTags = res;
    });
  }
  sendHumanAgentTag(value: any) {
    var abc = this.HumanAgentTags.find((res: any) => res.value == value);

    this.chatText = abc?.text;

    this.facebookReplyForm.patchValue({ text: this.chatText });
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
        // console.log('keywords==>', this.Keywords);
      });
      // console.log('TagList', this.TagsList);
    });
  }

  insertTagsForFeed(id: any, comId: string, type: any) {
    if (type == 'FC') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'FC';
      this.insertTagsForFeedDto.userId = Number(
        localStorage.getItem('agentId')
      );

      this.FacebookData.forEach((abc: any) => {
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
              const value = comment.tags.find((x: any) => x.id == id);
              if (value != null || value != undefined) {
                this.removeTagFromFeed(id, comId, type);
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
    if (type == 'FCP') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'FCP';
      this.insertTagsForFeedDto.userId = Number(
        localStorage.getItem('agentId')
      );

      this.FacebookMessages.forEach((msg: any) => {
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
            const value = msg.tags.find((x: any) => x.id == id);
            if (value != null || value != undefined) {
              this.removeTagFromFeed(id, comId, type);
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
  }

  removeTagFromFeed(tagid: any, feedId: string, type: any) {
    if (type == 'FC') {
      this.insertTagsForFeedDto.tagId = tagid;
      this.insertTagsForFeedDto.feedId = feedId.toString();
      this.insertTagsForFeedDto.feedType = 'FC';
      this.insertTagsForFeedDto.userId = Number(
        localStorage.getItem('agentId')
      );

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');

          this.activeTag = false;
          this.checkTag = false;
        });
    }
    if (type == 'FCP') {
      this.insertTagsForFeedDto.tagId = tagid;
      this.insertTagsForFeedDto.feedId = feedId.toString();
      this.insertTagsForFeedDto.feedType = 'FCP';
      this.insertTagsForFeedDto.userId = Number(
        localStorage.getItem('agentId')
      );

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');
          this.activeTag = false;
          this.checkTag = false;
        });
    }
  }

  Sentiments = [
    {
      id: 1,
      name: 'Positive',
      icon: 'fal fa-smile',
    },
    {
      id: 2,
      name: 'Neutral',
      icon: 'fal fa-meh-blank',
    },
    {
      id: 3,
      name: 'Negative',
      icon: 'fal fa-frown',
    },
  ];

  insertSentimentForFeed(feedId: string, sentimenName: any, type: any) {
    if (type == 'FC') {
      this.insertSentimentForFeedDto.feedId = feedId.toString();
      this.insertSentimentForFeedDto.sentiment = sentimenName;
      this.insertSentimentForFeedDto.feedType = 'FC';
      this.insertSentimentForFeedDto.userId = Number(
        localStorage.getItem('agentId')
      );

      this.commondata
        .InsertSentiment(this.insertSentimentForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('Sentiment');
        });
    }
    if (type == 'FCP') {
      this.insertSentimentForFeedDto.feedId = feedId.toString();
      this.insertSentimentForFeedDto.sentiment = sentimenName;
      this.insertSentimentForFeedDto.feedType = 'FCP';
      this.insertSentimentForFeedDto.userId = Number(
        localStorage.getItem('agentId')
      );

      this.commondata
        .InsertSentiment(this.insertSentimentForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('Sentiment');
        });
    }
  }

  commentStatus(comId: any, type: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'Facebook';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {});
  }

  queryCompleted(comId: any, type: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'Facebook';
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }

  likeByAdminDto = new LikeByAdminDto();

  likeByAdmin(
    comId: any,
    isLiked: boolean,
    platform: any,
    profilePageId: any,
    profileId: any,
    userId: any
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

  markAsCompleteExpanded(comId: any) {
    this.FacebookData.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          this.markAsComplete = !this.markAsComplete;
        }
      });
    });
  }

  reloadComponent(type: any) {
    if (type == 'both-text-and-attachment-added') {
      this.AlterMsg = 'Text and Attachment cannot be sent at the same time';
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

  emojiToggle() {
    toggleEmojis();
  }

  facebookCommentReply() {
    this.fbCmntReply = true;
    this.fbMsgReply = false;
  }

  facebookMessageReply() {
    this.fbCmntReply = false;
    this.fbMsgReply = true;
  }

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
      this.detectChanges();
    }
  }

  insertEmoji(emoji: any) {
    this.insertAtCaret(' ' + emoji + ' ');
  }
  onScrollComments() {
    this.pageSize = this.pageSize + 10;
    this.getFacebookComments();
  }
  onScrollMessages() {
    this.pageSize = this.pageSize + 10;
    this.getFacebookMessages();
  }

  updateTicketId(res: any) {
    this.FacebookData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == res.queryId) {
            singleCmnt.ticketId = res.ticketId;
          }
        });
      });
    });
    this.FacebookMessages.forEach((msg: any) => {
      if (msg.id == res.queryId) {
        msg.ticketId = res.ticketId;
      }
    });
    this.changeDetect.detectChanges();
  }

  applySentimentListner(res: any) {
    this.FacebookData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == res.feedId) {
            singleCmnt.sentiment = res;
          }
        });
      });
    });
    this.FacebookMessages.forEach((msg: any) => {
      if (msg.id == res.feedId) {
        msg.sentiment = res;
      }
    });
    this.changeDetect.detectChanges();
  }

  closeQuickResponseSidebar() {
    this.quickReplySearchText = '';
    this.radioInput.nativeElement.checked = false;
  }

  isImage(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('image');
  }

  isVideo(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('video');
  }

  isAudio(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('audio');
  }
}
