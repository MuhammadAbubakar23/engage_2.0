import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, pipe, Subscription } from 'rxjs';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UpdateMessagesService } from 'src/app/services/UpdateMessagesService/update-messages.service';
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

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss'],
})
export class TwitterComponent implements OnInit {
  checkTag = false;
  activeTag = false;
  TagsList: any;

  userIdsDto = this.fetchId.getIds();
  ImageName: any;
  TwitterConversation: any;
  TwitterMessage: any[] = [];

  pageNumber: any = 1;
  pageSize: any = 10;
  totalUnrespondedCmntCountByCustomer: number = 0;

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
  queryStatus:any;

  isLikedByAdmin: any;
  ticketId: any;

  tweetId: any;
  newReply:any;

  commentStatusDto = new CommentStatusDto();

  querryCompleted = false;

  storeComId: any;
  insertTagsForFeedDto = new InsertTagsForFeedDto();

  getAppliedTagsList: any;
  totalUnrespondedMsgCountByCustomer: any;
  TodayDate: any;

  public Subscription!: Subscription;
  public criteria!: SortCriteria;
  searchText: string='';
  spinner1running = false;
  spinner2running = false;

  quickReplySearchText:string='';
  
  constructor(
    private fetchId: FetchIdService,
    private changeDetect: ChangeDetectorRef,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService : UpdateCommentsService,
    private updateMessagesService : UpdateMessagesService,
    private queryStatusService : QueryStatusService,
    private replyService : ReplyService,
    private unrespondedCountService : UnRespondedCountService,
    private createTicketService: CreateTicketService,
    private toggleService : ToggleService
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
      this.id = res;
      this.getTwitterData();
      this.getTwitterMessages();
    });
  }

  ngOnInit(): void {

    this.criteria = {
      property: 'createdDate',
      descending: true,
    };

    this.TodayDate = new Date();
    this.getTwitterData();
    this.getTagList();
    this.getTwitterMessages();
    this.quickReplyList();

    this.Subscription = this.addTagService.receiveTags().subscribe((res) => {
      this.addTags = res;
      this.addTagDataListner();
    });
    this.Subscription = this.removeTagService.receiveTags().subscribe((res) => {
      this.removeTags = res;
      this.removeTagDataListener();
    });
    this.Subscription = this.updateCommentsService.receiveComment().subscribe((res) => {
      this.updatedComments = res;
      this.updateCommentsDataListener();
    });
    this.Subscription = this.updateMessagesService.receiveMessage().subscribe((res) => {
      this.updatedMessages = res;
      this.updateMessagesDataListener();
    });
    this.Subscription = this.queryStatusService.receiveQueryStatus().subscribe((res) => {
      
      this.queryStatus = res;
      this.updateQueryStatusDataListner();
    });
    this.Subscription = this.replyService.receiveReply().subscribe((res) => {
      this.newReply = res;
      this.replyDataListner();
    });
    this.Subscription = this.unrespondedCountService.getUnRespondedCount().subscribe((res) => {
      
      if(res.contentCount.contentType == 'TT'){
        this.totalUnrespondedCmntCountByCustomer = res.contentCount.unrespondedCount;
      }
      if(res.contentCount.contentType == 'TM'){
        this.totalUnrespondedMsgCountByCustomer = res.contentCount.unrespondedCount;
      }
      
    });
    this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListner();
      });
  }


  commentDto = new commentsDto();
  messageDto = new messagesDto();

  updatedComments:any;
  updatedMessages:any;

  updateCommentsDataListener() {
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
            }
            this.TwitterConversation.forEach((item: any) => {
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
          }
        });
        this.changeDetect.detectChanges();
  };

  updateMessagesDataListener() {
        this.updatedMessages.forEach((xyz: any) => {
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
              customerSocailProfileId : xyz.agentId,
              profileId: xyz.profileId,
              profilePageId: xyz.profilePageId,
            }
            this.messagesArray.push(this.messageDto);
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

            this.groupedMessages = Object.keys(groupedItems).map((date) => {
              return {
                date,
                items: groupedItems[date],
              };
            });
            // console.log('Messages ==>', this.groupedMessages);
          }
        });
        this.changeDetect.detectChanges();
  };
  filterDto = new FiltersDto();
  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  commentsArray: any[] = [];
  groupArrays: any[] = [];

  messagesArray: any[] = [];
  groupedMessages: any[] = [];
  repliesArray: any[] = [];
  groupRepliesArray: any[] = [];

  getTwitterData() {
    if (this.id != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.spinner1running = false;
          this.TwitterConversation = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.pageName = this.TwitterConversation[0]?.post.profile?.page_Name;

          // group by date function
          this.commentsArray = [];
          this.TwitterConversation.forEach((item: any) => {
            this.commentsArray = [];
            item.comments.forEach((cmnt: any) => {
              this.commentsArray.push(cmnt);

              cmnt.replies.forEach((reply: any) => {
                this.repliesArray.push(reply);
              });
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

            item['groupedComments'] = Object.keys(groupedItems).map((createdDate) => {
              return {
                createdDate,
                items: groupedItems[createdDate],
              };
            });
            this.tweetStats();
          });
        });
      setTimeout(() => {
        this.SpinnerService.hide();
      }, 3000);
    } else  if (this.slaId != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false
      };  
      
      this.spinner1running = true
      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.spinner1running = false
        this.TwitterConversation = res.List;
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.pageName = this.TwitterConversation[0].post.profile?.page_Name;

        this.commentsArray = [];
        this.TwitterConversation.forEach((item: any) => {
          this.commentsArray = [];
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

          item['groupedComments'] = Object.keys(groupedItems).map((createdDate) => {
            return {
              createdDate,
              items: groupedItems[createdDate],
            };
          });
          // console.log('hello', this.groupArrays);
          this.tweetStats();
        });
      });
      setTimeout(() => {
        this.SpinnerService.hide();
      }, 3000);
    }
    else {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: localStorage.getItem('storeOpenedId') || '{}',
        pageId: '',
        plateForm: localStorage.getItem('parent') || '{}',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false
      }; 
      
      this.spinner1running = true
      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.spinner1running = false
        this.TwitterConversation = res.List;
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.pageName = this.TwitterConversation[0].post.profile?.page_Name;

        this.commentsArray = [];
        this.TwitterConversation.forEach((item: any) => {
          this.commentsArray = [];
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

          item['groupedComments'] = Object.keys(groupedItems).map((createdDate) => {
            return {
              createdDate,
              items: groupedItems[createdDate],
            };
          });
          // console.log('hello', this.groupArrays);
          this.tweetStats();
        });
      });
      setTimeout(() => {
        this.SpinnerService.hide();
      }, 3000);
    }
    
  }

  pageName?: any;

  getTwitterMessages() {
    if (this.id != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false
      };
      this.spinner1running = true
      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.spinner1running = false
          this.TwitterMessage = res.List?.dm;
          this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
          this.pageName = this.TwitterMessage[0]?.toName;

          this.messagesArray = [];
          this.groupedMessages = [];

          this.TwitterMessage.forEach((item: any) => {
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

            this.groupedMessages = Object.keys(groupedItems).map((createdDate) => {
              return {
                createdDate,
                items: groupedItems[createdDate],
              };
            });
            // console.log('Messages ==>', this.groupedMessages);
          });
        });
    } else if (this.slaId != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.TwitterMessage = res.List.dm;
        this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
        this.pageName = this.TwitterMessage[0]?.toName;

        this.messagesArray = [];
        this.groupedMessages = [];

        this.TwitterMessage.forEach((item: any) => {
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

          this.groupedMessages = Object.keys(groupedItems).map((createdDate) => {
            return {
              createdDate,
              items: groupedItems[createdDate],
            };
          });
          // console.log('Messages ==>', this.groupedMessages);
        });
      });
    }
    else {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: localStorage.getItem('storeOpenedId') || '{}',
        pageId: '',
        plateForm: localStorage.getItem('parent') || '{}',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.TwitterMessage = res.List.dm;
        this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
        this.pageName = this.TwitterMessage[0]?.toName;

        this.messagesArray = [];
        this.groupedMessages = [];

        this.TwitterMessage.forEach((item: any) => {
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

          this.groupedMessages = Object.keys(groupedItems).map((createdDate) => {
            return {
              createdDate,
              items: groupedItems[createdDate],
            };
          });
          // console.log('Messages ==>', this.groupedMessages);
        });
      });
    }
  }


  //   getTwitterReplies(){
  //
  //   this.twitterdata.GetTwitterReplies(this.userIdsDto).subscribe((res:any)=>{

  //     this.TwitterReplies = res.result;
  //     // console.log("Twitter Replies ==>", this.TwitterReplies)
  //   })
  // }

  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }
  // toggle(child: string) {
  //   let routr = this._route.url;
  //   let parent = localStorage.getItem('parent');

  //   this.isOpen = !this.isOpen;
  //   if (this.isOpen) {
  //     this._route.navigateByUrl(
  //       'all-inboxes/' + '(c1:' + parent + '//c2:' + child + ')'
  //     );

  //     this.toggleService.addTogglePanel('panelToggled');
  //   } else {
  //     this._route.navigateByUrl('all-inboxes/' + '(c1:' + parent + ')');
  //     this.toggleService.addTogglePanel('');
  //   }
  // }

  toggle(child: string, cmntId: any) {
    if (localStorage.getItem('child') == child) {
      this.toggleService.addTogglePanel('');
    } else {
      this.toggleService.addTogglePanel(child);
    }

    this.createTicketService.setCommentId(cmntId);
  }
  profileIdForStats:any;
  tweetIdForStats:any;

  tweetStats() {
    
    if (this.TwitterConversation != null || undefined) {
      this.TwitterConversation.forEach(async (tweet: any): Promise<void> => {
        this.profileIdForStats = tweet.post.profile.profile_Id;
        tweet.comments.forEach(async (cmnt:any) => {
          this.tweetIdForStats = cmnt?.postId;

          await this.commondata
          .GetTwitterTweetStats(this.profileIdForStats, this.tweetIdForStats)
          .subscribe((postStats: any) => {
            
            cmnt['postStats'] = postStats;

            // console.log("Stats==>", this.TwitterConversation)
          });
        });
        

        
      });
    }
  }

  commentStatus(comId: any, type: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'Twitter';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
      });
  }

  insertTagsForFeed(id: any, comId: string, type: any) {
    if (type == 'TT') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'TT';
      this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

      this.TwitterConversation.forEach((abc: any) => {
        abc.comments.forEach((comment: any) => {
          if (comment.id == comId) {
            if(comment.tags.length == 0){
              this.commondata.InsertTag(this.insertTagsForFeedDto).subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
            }
            else if(comment.tags.length > 0){
              const value = comment.tags.find((x:any)=>x.id == id)
              if(value != null || value != undefined){
                this.removeTagFromFeed(id, comId, type);
              } else {
                this.commondata.InsertTag(this.insertTagsForFeedDto).subscribe((res: any) => {
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
    if (type == 'TM') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'TM';
      this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

      this.TwitterMessage.forEach((msg: any) => {
        if (msg.id == comId) {
          if(msg.tags.length == 0){
            this.commondata.InsertTag(this.insertTagsForFeedDto).subscribe((res: any) => {
              this.reloadComponent('ApplyTag');

              this.activeTag = true;
              this.checkTag = true;
            });
          }
          else if(msg.tags.length > 0){
            const value = msg.tags.find((x:any)=>x.id == id)
            if(value != null || value != undefined){
              this.removeTagFromFeed(id, comId, type);
            } else {
              this.commondata.InsertTag(this.insertTagsForFeedDto).subscribe((res: any) => {
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
    if (type == 'TT') {
      this.insertTagsForFeedDto.tagId = tagid;
      this.insertTagsForFeedDto.feedId = feedId.toString();
      this.insertTagsForFeedDto.feedType = 'TT';
      this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');

          this.activeTag = false;
          this.checkTag = false;
        });
    }
    if (type == 'TM') {
      this.insertTagsForFeedDto.tagId = tagid;
      this.insertTagsForFeedDto.feedId = feedId.toString();
      this.insertTagsForFeedDto.feedType = 'TM';
      this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

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

  Keywords: any[] = [];
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

  insertSentimentForFeedDto = new InsertSentimentForFeedDto();

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

  insertSentimentForFeed(feedId: any, sentimenName: any, type: any) {
    if (type == 'TT') {
      this.insertSentimentForFeedDto.feedId = feedId.toString();
      this.insertSentimentForFeedDto.feedType = 'TT';
      this.insertSentimentForFeedDto.sentiment = sentimenName;
      this.insertSentimentForFeedDto.userId = Number(localStorage.getItem('agentId'));

      this.commondata
        .InsertSentiment(this.insertSentimentForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('Sentiment');
        });
    }
    if (type == 'TM') {
      this.insertSentimentForFeedDto.feedId = feedId.toString();
      this.insertSentimentForFeedDto.feedType = 'TM';
      this.insertSentimentForFeedDto.sentiment = sentimenName;
      this.insertSentimentForFeedDto.userId = Number(localStorage.getItem('agentId'));

      this.commondata
        .InsertSentiment(this.insertSentimentForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('Sentiment');
        });
    }
  }

  QuickReplies: any;

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      // console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  agentTeamId: number = 0;
  platform: string = '';
  postType: string = '';
  profileId: string = '';
  profilePageId: string = '';

  ReplyDto = new ReplyDto();

  SendCommentInformation(comId: any) {
    this.TwitterConversation.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.tweetId = comment.id;
          this.agentTeamId = 2;
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
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
  });

  submitTwitterReply() {
    if(this.tweetId == undefined || this.tweetId == '' || this.tweetId == null){
      this.reloadComponent('selectComment');
    }
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }

    this.TwitterRepliesForm.patchValue({
      commentId: this.tweetId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
      profileId: this.profileId,
      profilePageId: this.profilePageId,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.TwitterRepliesForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();

        this.reloadComponent('comment');
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  UploadedFile: FormData = new FormData();

  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      this.ImageName = event.target.files;
    }
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);
    this.commentText = abc?.text;
    // this.TwitterRepliesForm.patchValue({ text: this.commentText });
    // this.twitterMessageReplyForm.patchValue({ text: this.commentText });
    this.insertAtCaret(this.commentText)
  }

  twitterMsgId: any;

  SendMessageInformation(id: any) {
    this.TwitterMessage.forEach((msg: any) => {
      if (msg.id == id) {
        // show mentioned reply
        this.show = true;
        this.twitterMsgId = msg.id;
        this.agentTeamId = 2;
        this.platform = this.fetchId.platform;
        this.postType = msg.contentType;
        this.profileId = msg.profileId;
        this.profilePageId = msg.profilePageId;
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
  });
  submitTwitterMessageReply() {
    if(this.twitterMsgId == undefined || this.twitterMsgId == '' || this.twitterMsgId == null){
      this.reloadComponent('selectComment');
    }
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }

    this.twitterMessageReplyForm.patchValue({
      commentId: this.twitterMsgId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
      profileId: this.profileId,
      profilePageId: this.profilePageId,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.twitterMessageReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();

        this.reloadComponent('fbmessage');
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  likeByAdminDto = new LikeByAdminDto();

  likeByAdmin(comId: any, isLiked: boolean, userId:any, platform:any,profilePageId:any, profileId:any) {
    
    isLiked = !isLiked;

    this.likeByAdminDto ={
      platform : platform,
      commentId : comId,
      isLiked : isLiked,
      profilePageId : profilePageId,
      profileId : profileId,
      userFromId : userId
    }
    this.commondata.LikedByAdmin(this.likeByAdminDto).subscribe((res: any) => {

      if (isLiked == true) {
        this.reloadComponent('Like');
      }
      if (isLiked == false) {
        this.reloadComponent('disLike');
      }
    });
  }

  toastermessage = false;
  AlterMsg: any = '';

  reloadComponent(type: any) {
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

  commentReply: any;

  clearInputField() {
    this.commentReply = '';
    this.msgText = '';
    this.show = false;
    this.tweetId = '';
    this.agentTeamId = 0;
    this.platform = '';
    this.postType = '';
  }

  TTReply: boolean = true;
  TMReply: boolean = false;

  twitterTweetReply() {
    this.TTReply = true;
    this.TMReply = false;
  }

  twitterMessageReply() {
    this.TTReply = false;
    this.TMReply = true;
  }

  queryCompleted(comId: any, type: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'Twitter';
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }

  markAsComplete = false;

  markAsCompleteExpanded(comId: any) {
    this.TwitterConversation.forEach((abc: any) => {
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
  ]

  @ViewChild('textarea')
  textarea!: ElementRef;
  
  insertAtCaret(text: string) {
    const textarea = this.textarea.nativeElement;
    textarea.focus();
    if (typeof textarea.selectionStart != 'undefined') {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const scrollTop = textarea.scrollTop;
      textarea.value = textarea.value.substring(0, startPos) + text + textarea.value.substring(endPos, textarea.value.length);
      textarea.selectionStart = startPos + text.length;
      textarea.selectionEnd = startPos + text.length;
      textarea.scrollTop = scrollTop;
      // console.log(this.textarea.nativeElement.value);
    }
  }

  insertEmoji(emoji:any) {
    this.insertAtCaret(emoji);
    // console.log(this.textarea.nativeElement.value);
  }

  addTags: any;
  removeTags: any;

  addTagDataListner() {
    if(this.addTags.feedType == 'TT'){
    this.TwitterConversation.forEach((post: any) => {
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
    if(this.addTags.feedType == 'TM'){
      this.TwitterMessage.forEach((msg: any) => {
            if (msg.id == this.addTags.feedId) {
              if (msg.tags.length == 0) {
                msg.tags.push(this.addTags);
              } else if (msg.tags.length > 0) {
                const tag = msg.tags.find(
                  (x: any) => x.id == this.addTags.feedId
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
        
      });
    }
    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
    if(this.removeTags.feedType == 'TT'){
    this.TwitterConversation.forEach((post: any) => {
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
  if(this.removeTags.feedType == 'TM'){
    this.TwitterMessage.forEach((msg: any) => {
          if (msg.id == this.removeTags.feedId) {
            var tag = msg.tags.find(
              (x: any) => x.id == this.removeTags.tagId
            );
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
    
    this.TwitterConversation.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.queryStatus.queryId) {
            singleCmnt.queryStatus = this.queryStatus.queryStatus
            singleCmnt.isLikedByAdmin = this.queryStatus.isLikes
          }
        });
      });
    });
    this.TwitterMessage.forEach((msg: any) => {
      if (msg.id == this.queryStatus.queryId) {
        msg.queryStatus = this.queryStatus.queryStatus
      }
  
});
    this.changeDetect.detectChanges();
  }

  replyDataListner() {
    this.TwitterConversation.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.newReply.commentId) {
            singleCmnt.replies.push(this.newReply)
            singleCmnt.queryStatus = this.newReply.queryStatus;
          }
        });
      });
    });
    this.TwitterMessage.forEach((msg: any) => {
      if (msg.id == this.newReply.commentId) {
        msg.replies.push(this.newReply)
        msg.queryStatus = this.newReply.queryStatus;
      }
  
});
    this.changeDetect.detectChanges();
  }

  onScroll() {
    if(this.totalUnrespondedCmntCountByCustomer > 10){
      this.pageSize = this.pageSize + 10
      this.getTwitterData();
    }
    if(this.totalUnrespondedMsgCountByCustomer > 10){
      this.pageSize = this.pageSize + 10
      this.getTwitterMessages();
    }
  }

  updateBulkQueryStatusDataListner() {
    
    this.TwitterConversation.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          this.queryStatus.forEach((querry:any) => {
            if (singleCmnt.id == querry.queryId) {
              singleCmnt.queryStatus = querry.queryStatus;
              this.totalUnrespondedCmntCountByCustomer = 0;
            }
          });
          
        });
      });
    });
    this.TwitterMessage.forEach((msg: any) => {
      this.queryStatus.forEach((querry:any) => {
        if (msg.id == querry.queryId) {
          msg.queryStatus = querry.queryStatus;
          this.totalUnrespondedMsgCountByCustomer = 0;
        }
      });
    });
    this.changeDetect.detectChanges();
  }
}
