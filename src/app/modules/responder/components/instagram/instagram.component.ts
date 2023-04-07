import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { InstagramCommentReplyDto } from 'src/app/shared/Models/InstagramCommentReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { commentsDto } from 'src/app/shared/Models/concersationDetailDto';
import { Subscription } from 'rxjs';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss'],
})
export class InstagramComponent implements OnInit {
  InstagramData: any;

  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();

  public Subscription!: Subscription;

  pageNumber: any = 1;
  pageSize: any = 10;

  // Instagram Comment
  InstacommentId: any;
  agentTeamId: number = 0;
  platform: string = '';
  postType: string = '';
  instaCommentText: string = '';
  commentReply: string = '';
  quickReplySearchText:string='';

  instagramCommentReplyDto = new InstagramCommentReplyDto();

  show = false;
  isOpen = false;
  active = false;

  spinner1running = false;
  spinner2running = false;

  commentStatusDto = new CommentStatusDto();

  querryCompleted = false;

  storeComId: any;
  queryStatus: any;
  searchText: string='';

  TagsList: any;
  Keywords: any[] = [];
  agentName = localStorage.getItem('agentName');

  insertTagsForFeedDto = new InsertTagsForFeedDto();

  getAppliedTagsList: any;
  newReply: any;

  activeTag = false;
  checkTag = false;
  postId: any = 0;
  filterDto = new FiltersDto();
  likes: any = '';
  comments: any = '';
  views: any = '';
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  QuickReplies: any;
  toastermessage = false;
  AlterMsg: any = '';
  totalUnrespondedCmntCountByCustomer: number = 0;
  pageName: any;
  TodayDate: any;

  commentsArray: any[] = [];
  groupArrays: any[] = [];
  public criteria!: SortCriteria;

  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private _route: Router,
    private SpinnerService: NgxSpinnerService,
    private commondata: CommonDataService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService: UpdateCommentsService,
    private queryStatusService: QueryStatusService,
    private replyService: ReplyService,
    private unrespondedCountService: UnRespondedCountService,
    private createTicketService: CreateTicketService
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
      this.id = res;
      this.getInstagramData();
    });
  }

  ngOnInit(): void {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
    this.TodayDate = new Date();

    this.getInstagramData();
    this.getTagList();
    this.quickReplyList();

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
    this.Subscription = this.queryStatusService
      .receiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateQueryStatusDataListner();
      });
    this.Subscription = this.replyService.receiveReply().subscribe((res) => {
      ;
      this.newReply = res;
      this.replyDataListner();
    });
    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        this.totalUnrespondedCmntCountByCustomer = res.contentCount.unrespondedCount;
      });
      this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListner();
      });
  }

  commentDto = new commentsDto();

  updatedComments: any;
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
        };

        this.InstagramData.forEach((item: any) => {
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
        this.totalUnrespondedCmntCountByCustomer = (this.totalUnrespondedCmntCountByCustomer + 1)
      }
    });
    this.changeDetect.detectChanges();
  }

  ReplyDto = new ReplyDto();

  getInstagramData() {
    
    if (this.id != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Instagram',
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
          this.InstagramData = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.pageName = this.InstagramData[0]?.post.profile.page_Name;

          this.commentsArray = [];

          this.InstagramData.forEach((item: any) => {
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

            item['groupedComments'] = Object.keys(groupedItems).map(
              (createdDate) => {
                return {
                  createdDate,
                  items: groupedItems[createdDate],
                };
              }
            );
          });

          this.instaStats();
        });
    } else if (this.slaId != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Instagram',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.spinner1running = false;
        this.InstagramData = res.List;
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.pageName = this.InstagramData[0]?.post.profile.page_Name;

        this.commentsArray = [];

        this.InstagramData.forEach((item: any) => {
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

          item['groupedComments'] = Object.keys(groupedItems).map(
            (createdDate) => {
              return {
                createdDate,
                items: groupedItems[createdDate],
              };
            }
          );
        });

        this.instaStats();
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
        this.InstagramData = res.List;
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.pageName = this.InstagramData[0]?.post.profile.page_Name;

        this.commentsArray = [];

        this.InstagramData.forEach((item: any) => {
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

          item['groupedComments'] = Object.keys(groupedItems).map(
            (createdDate) => {
              return {
                createdDate,
                items: groupedItems[createdDate],
              };
            }
          );
        });

        this.instaStats();
      });
    }
    
  }

  instagramCommentReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId) 
  });

  profileId: string = '';
  profilePageId: string = '';
  userProfileId=0;

  SendInstagramCommentInformation(comId: any) {
    this.InstagramData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.InstacommentId = comment.id;
          this.agentTeamId = 2;
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
          this.userProfileId = this.InstagramData[0].user.id
        }
      });
    });
  }
  ImageName: any[] = [];
  submitInstagramCommentReply() {
    if(this.InstacommentId == undefined || this.InstacommentId == '' || this.InstacommentId == null){
      this.reloadComponent('selectComment');
    }
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }

    this.instagramCommentReplyForm.patchValue({
      commentId: this.InstacommentId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
      profileId: this.profileId,
      profilePageId: this.profilePageId,
      userProfileId : this.userProfileId
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.instagramCommentReplyForm.value)
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

  commentStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'IC';
    this.commentStatusDto.plateForm = 'Instagram';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {});
  }
  queryCompleted(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'IC';
    this.commentStatusDto.plateForm = 'Instagram';
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
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

  insertTagsForFeed(id: any, comId: any) {
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'IC';
    this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.InstagramData.forEach((abc: any) => {
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
              this.removeTagFromFeed(id, comId);
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

  removeTagFromFeed(id: any, comId: any) {
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'IC';
    this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.commondata
      .RemoveTag(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('RemoveTag');

        this.activeTag = false;
        this.checkTag = false;
      });
  }

  postIdForStats: any;
  pageIdForStats: any;

  instaStats() {
    if (this.InstagramData != null || undefined) {
      this.InstagramData.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post.postId;
        this.pageIdForStats = post.post.profile.page_Id;

        await this.commondata
          .GetInstaPostStats(this.pageIdForStats, this.postIdForStats)
          .subscribe((postStats: any) => {
            post.post['postStats'] = postStats;
          });
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

  insertSentimentForFeed(feedId: any, sentimenName: any) {
    this.insertSentimentForFeedDto.feedId = feedId.toString();
    this.insertSentimentForFeedDto.sentiment = sentimenName;
    this.insertSentimentForFeedDto.feedType = 'IC';
    this.insertSentimentForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.commondata
      .InsertSentiment(this.insertSentimentForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);

    this.instaCommentText = abc?.text;

    // this.instagramCommentReplyForm.patchValue({ text: this.instaCommentText });
    this.insertAtCaret(this.instaCommentText)
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      // console.log('Quick Reply List ==>', this.QuickReplies);
    });
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
      if (isLiked == true) {
        this.reloadComponent('Like');
      }
      if (isLiked == false) {
        this.reloadComponent('disLike');
      }
    });
  }

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
  clearInputField() {
    this.commentReply = '';
    this.instaCommentText = '';
    this.show = false;
    this.InstacommentId = '';
    this.agentTeamId = 0;
    this.platform = '';
    this.postType = '';
  }
  markAsComplete = false;
  markAsCompleteExpanded(comId: any) {
    this.InstagramData.forEach((abc: any) => {
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
      // console.log(this.textarea.nativeElement.value);
    }
  }

  insertEmoji(emoji: any) {
    this.insertAtCaret(emoji);
    // console.log(this.textarea.nativeElement.value);
  }

  addTags: any;
  removeTags: any;

  addTagDataListner() {
    this.InstagramData.forEach((post: any) => {
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
    this.InstagramData.forEach((post: any) => {
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
    this.InstagramData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.queryStatus.queryId) {
            singleCmnt.queryStatus = this.queryStatus.queryStatus;
            singleCmnt.isLikedByAdmin = this.queryStatus.isLikes;
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }

  replyDataListner() {
    this.InstagramData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.newReply.commentId) {
            singleCmnt.replies.push(this.newReply);
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
      this.getInstagramData();
    }
  }

  updateBulkQueryStatusDataListner() {
    
    this.InstagramData.forEach((post: any) => {
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
}
