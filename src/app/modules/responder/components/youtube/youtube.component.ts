import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
})
export class YoutubeComponent implements OnInit {
  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();

  public Subscription!: Subscription;

  YoutubeData: any;
  pageNumber: number = 1;
  pageSize: number = 10;
  commentReply: any;
  postId: any = 0;
  viewCOunt: any = '';
  likeCount: any = '';
  favoriteCount: any = '';
  commentCount: any = '';
  youtubecommentId: number=0;
  youtubecommentText: any;
  agentId: string='';
  platform: string = '';
  postType: string = '';
  QuickReplies: any;
  TagsList: any;
  getAppliedTagsList: any;
  storeComId: any;
  AlterMsg: any = '';
  Keywords: any[] = [];
  queryStatus:any;
  newReply:any;
  totalUnrespondedCmntCountByCustomer:number=0;

  filterDto = new FiltersDto();
  ReplyDto = new ReplyDto();
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();
  commentStatusDto = new CommentStatusDto();

  show = false;
  isOpen = false;
  active = false;
  activeTag = false;
  checkTag = false;
  markAsComplete = false;
  toastermessage = false;
  querryCompleted = false;

  spinner1running = false;
  spinner2running = false;

  commentsArray: any[] = [];
  groupArrays: any[] = [];
  TodayDate: any;

  public criteria!: SortCriteria;
  searchText: string='';
  quickReplySearchText:string='';

  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService : UpdateCommentsService,
    private queryStatusService : QueryStatusService,
    private replyService : ReplyService,
    private createTicketService: CreateTicketService,
    private ticketResponseService : TicketResponseService
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
      this.id = res;
      this.getYoutubeData();
    });
  }

  ngOnInit(): void {
    // this.criteria = {
    //   property: 'createdDate',
    //   descending: true,
    // };

    this.TodayDate = new Date();

    this.getYoutubeData();
    this.quickReplyList();
    this.getTagList();
    
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
    this.Subscription = this.queryStatusService.receiveQueryStatus().subscribe((res) => {
      
      this.queryStatus = res;
      this.updateQueryStatusDataListner();
    });
    this.Subscription = this.replyService.receiveReply().subscribe((res) => {
      this.newReply = res;
      this.replyDataListner();
    });
    this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListner();
      });
      this.ticketResponseService.getTicketId().subscribe(res=>{
        this.updateTicketId(res)
      });
  }

  commentDto = new commentsDto();

  updatedComments:any;


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
            this.YoutubeData.forEach((item: any) => {
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

  pageName: any;
  getYoutubeData() {
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Youtube',
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
          this.YoutubeData = res.List;
          this.pageName = this.YoutubeData[0]?.post.profile.page_Name;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

          this.commentsArray = [];

          this.YoutubeData.forEach((item: any) => {
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
          });

          let finalObj: any = {};
          this.YoutubeData.forEach((item: any) => {
            item.comments.forEach((cmnt: any) => {
              const date = cmnt.createdDate.split('T')[0];
              if (finalObj[date]) {
                finalObj[date].push(cmnt);
              } else {
                finalObj[date] = [cmnt];
              }
              // console.log(finalObj);
            });
          });

          this.YoutubeData.forEach((c: any) => {
            this.postId = c.postId;
            this.youtubePostStats();
          });
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Youtube',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.spinner1running = false;
        this.YoutubeData = res.List;
          this.pageName = this.YoutubeData[0]?.post.profile.page_Name;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

        this.commentsArray = [];

        this.YoutubeData.forEach((item: any) => {
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
        });

        this.YoutubeData.forEach((c: any) => {
          this.postId = c.postId;
          this.youtubePostStats();
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
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata.GetChannelConversationDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.spinner1running = false;
        this.YoutubeData = res.List;
          this.pageName = this.YoutubeData[0]?.post.profile.page_Name;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

        this.commentsArray = [];

        this.YoutubeData.forEach((item: any) => {
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
        });

        this.YoutubeData.forEach((c: any) => {
          this.postId = c.postId;
          this.youtubePostStats();
        });
      });
    }
  }


  postIdForStats: any;

  youtubePostStats() {
    if (this.YoutubeData != null || undefined) {
      this.YoutubeData.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post.postId;

        await this.commondata
          .GetYoutubePostStats(this.postIdForStats)
          .subscribe((postStats: any) => {
            post.post['postStats'] = postStats;
          });
          // console.log("Youtube stats", this.YoutubeData)
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

  youtubeCommentReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
  });
  profileId: string = '';
  profilePageId: string = '';

  sendYoutubeCommentInformation(comId: any) {
    this.YoutubeData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.youtubecommentId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
        }
      });
    });
  }

  text:string="";

  submitYoutubeCommentReply() {
    if(this.youtubecommentId == 0){
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if(this.text !== ""){
        this.youtubeCommentReplyForm.patchValue({
          text: this.text
        })
    }
      this.youtubeCommentReplyForm.patchValue({
        commentId: this.youtubecommentId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
      });
  
      formData.append(
        'CommentReply',
        JSON.stringify(this.youtubeCommentReplyForm.value)
      );
      if(this.youtubeCommentReplyForm.value.text !== ""){
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.clearInputField();
            this.reloadComponent('comment');
          },
          ({ error }) => {
          //  alert(error.message);
          }
        );
      } else {
        this.reloadComponent('empty-input-field')
      }
    }
  }

  likeByAdminDto = new LikeByAdminDto();

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
    });
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

  insertSentimentForFeed(feedId: any, sentimenName: any) {
    this.insertSentimentForFeedDto.feedId = feedId.toString();
    this.insertSentimentForFeedDto.sentiment = sentimenName;
    this.insertSentimentForFeedDto.feedType = 'YC';
    this.insertSentimentForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.commondata
      .InsertSentiment(this.insertSentimentForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);

    this.text = abc?.text + " ";

    // this.youtubeCommentReplyForm.patchValue({
    //   text: this.youtubecommentText,
    // });
    this.insertAtCaret(this.youtubecommentText)
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      // console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  detectChanges(): void {
    this.text = this.textarea.nativeElement.value
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

  insertTagsForFeed(id: any, comId: string) {
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'YC';
    this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.YoutubeData.forEach((abc: any) => {
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
              this.removeTagFromFeed(id, comId);
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

  removeTagFromFeed(id: any, comId: string) {
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'YC';
    this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.commondata.RemoveTag(this.insertTagsForFeedDto).subscribe(
      (res: any) => {
        this.reloadComponent('RemoveTag');

        this.activeTag = false;
        this.checkTag = false;
      },
      ({ error }) => {
        // alert(error.message || error.title)
      }
    );
  }

  commentStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'YC';
    this.commentStatusDto.plateForm = 'Youtube';
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    this.commondata.CommentRespond(this.commentStatusDto).subscribe(
      (res: any) => {
      },
      ({ error }) => {
        alert(error.message || error.title);
      }
    );
  }

  queryCompleted(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'YC';
    this.commentStatusDto.plateForm = 'Youtube';
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }

  markAsCompleteExpanded(comId: any) {
    this.YoutubeData.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          this.markAsComplete = !this.markAsComplete;
        }
      });
    });
  }

  reloadComponent(type: any) {
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
    this.youtubeCommentReplyForm.reset();
    this.youtubecommentText = '';
    this.show = false;
    this.youtubecommentId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
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
      this.detectChanges();
    }
  }

  insertEmoji(emoji:any) {
    this.insertAtCaret(' ' + emoji + ' ');
  }

  addTags: any;
  removeTags: any;

  addTagDataListner() {
    this.YoutubeData.forEach((post: any) => {
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
    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
    this.YoutubeData.forEach((post: any) => {
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
    this.changeDetect.detectChanges();
  }

  updateQueryStatusDataListner() {
    
    this.YoutubeData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.queryStatus.queryId) {
            singleCmnt.queryStatus = this.queryStatus.queryStatus
            singleCmnt.isLikedByAdmin = this.queryStatus.isLikes
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }

  replyDataListner() {
    this.YoutubeData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.newReply.commentId) {
            singleCmnt.replies.push(this.newReply)
            singleCmnt.queryStatus = this.newReply.queryStatus;
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }
  
  onScroll() {
    if(this.totalUnrespondedCmntCountByCustomer > 10){
      this.pageSize = this.pageSize + 10
      this.getYoutubeData();
    }
  }

  updateBulkQueryStatusDataListner() {
    
    this.YoutubeData.forEach((post: any) => {
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

    this.changeDetect.detectChanges();
  }


  updateTicketId(res:any){
    this.YoutubeData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == res.queryId) {
            singleCmnt.ticketId = res.ticketId;
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }
}
