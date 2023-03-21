import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto, conversationDetailDto, listDto, messagesDto, postStatsDto } from 'src/app/shared/Models/concersationDetailDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { FacebookMessageReplyDto } from 'src/app/shared/Models/FacebookMessageReplyDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { Tooltip } from 'bootstrap';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { Subscription } from 'rxjs';

declare var toggleEmojis: any;
@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss'],
})
export class FacebookComponent implements OnInit {
  FacebookData: any;
  FacebookMessages: any;
  TagsList: any;
  totalUnrespondedMsgCountByCustomer: any = 0;
  pageNumber: any = 0;
  pageSize: any = 0;
  TodayDate: any;
  facebookcommentdata: any;
  facebookmessagedata: any;
  commentIdForStats: any;

  chatText: any;
  commentId: any;
  agentTeamId: any;
  platform: any;
  postType: any;
  dmMsg: any = '';
  msgText: any = '';
  msgId: any;
  filesToUpload: any;
  ImageName: any[] = [];
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

  PostStatsArray: postStatsDto[] = [];
  CommentStatsDto: any[] = [];
  QuickReplies: any[] = [];
  HumanAgentTags: any[] = [];
  Keywords: any[] = [];

  public Subscription!: Subscription;

  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private _route: Router,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res)=>{
      this.id = res;
      this.getFacebookComments();
      this.getFacebookMessages();
    })
  }

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));

    this.TodayDate = new Date();

    this.getFacebookComments();
    this.getSlaFacebookComments();
    this.getFacebookMessages();
    this.getSlaFacebookMessages();
    this.getTagList();
    this.quickReplyList();
    this.humanAgentTags();

   // this.signalRService.startConnection();
   // this.addTransferChatDataListener();
  }

  getFacebookComments() {
    ;
    if (this.id != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: this.fetchId.platform,
        pageNumber: 0,
        pageSize: 0,
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.ConverstationDetailDto = res;
          this.FacebookData = this.ConverstationDetailDto.List;
          this.pageName = this.FacebookData[0].post.profile.page_Name;

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.fbStats();
        });
    }
  }

  commentDto = new commentsDto();
  messageDto = new messagesDto();
  
  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on('SendData', (data) => {
      
      if(data.signalRConversiontions != null){
        data.signalRConversiontions.forEach((xyz: any) => {
          if (this.id == xyz.userId) {
            this.commentDto = xyz;
            this.FacebookData[0].comments.push(this.commentDto);
          }
        });
        this.changeDetect.detectChanges();
      }
      if(data.signalRDMConversations != null){
        data.signalRDMConversations.forEach((xyz: any) => {
          if (this.id == xyz.fromId) {
            this.messageDto = xyz;
            this.FacebookMessages.push(this.messageDto);
          }
        });
        this.changeDetect.detectChanges();
      } 
    });
  };

  getSlaFacebookComments() {
    if (this.slaId != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Facebook',
        pageNumber: 0,
        pageSize: 0,
      };
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.FacebookData = res.List;
        this.pageName = this.FacebookData[0].post.profile.page_Name;

        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.fbStats();
      });
    }
  }

  getFacebookMessages() {
    if (this.id != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Facebook',
        pageNumber: 0,
        pageSize: 0,
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.FacebookMessages = res.List.dm;
          this.pageName = this.FacebookMessages[0].toName;

          this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
        });
    }
  }
  getSlaFacebookMessages() {
    if (this.slaId != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Facebook',
        pageNumber: 0,
        pageSize: 0,
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.FacebookMessages = res.List.dm;
        this.pageName = this.FacebookMessages[0].toName;

        this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
      });
    }
  }

  isAttachment = false;

  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      this.isAttachment = true;
      this.ImageName = event.target.files;
    }
  }

  fbStats() {
    if (this.FacebookData != null || undefined) {
      this.FacebookData.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post.postId;
        this.pageIdForStats = post.post.postId.split('_')[0];

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

  facebookReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

  facebookMessageReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

  SendCommentInformation(comId: any) {
    this.FacebookData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.commentId = comment.id;
          this.agentTeamId = 2;
          this.platform = xyz.platform;
          this.postType = comment.contentType;
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
        this.agentTeamId = 2;
        this.platform = this.fetchId.platform;
        this.postType = 'FCP';
      }
    });
  }

  closeMentionedReply() {
    this.show = false;
    this.commentId = '';
    this.agentTeamId = '';
    this.platform = '';
    this.postType = '';
  }

  submitFacebookReply() {
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }

    this.facebookReplyForm.patchValue({
      commentId: this.commentId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.facebookReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.getFacebookComments();
        this.getSlaFacebookComments();

        this.reloadComponent('comment');
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  clearInputField() {
    this.commentReply = '';
    this.msgText = '';
    this.show = false;
    this.commentId = '';
    this.agentTeamId = '';
    this.platform = '';
    this.postType = '';
  }

  submitFacebookMessageReply() {
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }

    this.facebookMessageReplyForm.patchValue({
      commentId: this.msgId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.facebookMessageReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.getFacebookMessages();
        this.getSlaFacebookMessages();

        this.reloadComponent('fbmessage');
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  toggle(child: string) {
    if (localStorage.getItem('child') == child) {
      this.toggleService.addTogglePanel('');
    } else {
      this.toggleService.addTogglePanel(child);
    }

    // let routr = this._route.url;
    // let parent = localStorage.getItem('parent');

    // this.isOpen = !this.isOpen;
    // if (this.isOpen) {
    //   this._route.navigateByUrl(
    //     'all-inboxes/' + '(c1:' + parent + '//c2:' + child + ')'
    //   );

    //   this.toggleService.addTogglePanel('panelToggled');
    // } else {
    //   this._route.navigateByUrl('all-inboxes/' + '(c1:' + parent + ')');
    //   this.toggleService.addTogglePanel('');
    // }
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);

    this.chatText = abc?.text;

    this.facebookReplyForm.patchValue({ text: this.chatText });
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
        console.log('keywords==>', this.Keywords);
      });
      console.log('TagList', this.TagsList);
    });
  }

  insertTagsForFeed(id: any, comId: string, type: any) {
    if (type == 'FC') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'FC';

      this.FacebookData.forEach((abc: any) => {
        abc.comments.forEach((comment: any) => {
          if (comment.id == comId) {
            if (comment.tags.length > 0) {
              for (let len = 0; len < comment.tags.length; len++) {
                comment.tags.forEach((tag: any) => {
                  if (tag.id == id) {
                    this.removeTagFromFeed(id, comId, type);
                  }
                });
              }
              this.commondata
                .InsertTag(this.insertTagsForFeedDto)
                .subscribe((res: any) => {
                  this.reloadComponent('ApplyTag');
                  this.getFacebookComments();
                  this.getSlaFacebookComments();

                  // alert(res.message);

                  this.activeTag = true;
                  this.checkTag = true;
                });
            } else {
              this.commondata
                .InsertTag(this.insertTagsForFeedDto)
                .subscribe((res: any) => {
                  this.getFacebookComments();
                  this.getSlaFacebookComments();
                  this.reloadComponent('ApplyTag');
                  // alert(res.message);

                  this.activeTag = true;
                  this.checkTag = true;
                });
            }
          }
        });
      });
    }
    if (type == 'FCP') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'FCP';

      this.FacebookMessages.forEach((msg: any) => {
        if (msg.id == comId) {
          if (msg.tags.length > 0) {
            for (let len = 0; len < msg.tags.length; len++) {
              msg.tags.forEach((tag: any) => {
                if (tag.id == id) {
                  this.removeTagFromFeed(id, comId, type);
                }
              });
            }
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
                this.getFacebookMessages();
                this.getSlaFacebookMessages();
                // alert(res.message);

                this.activeTag = true;
                this.checkTag = true;
              });
          } else {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
                this.getFacebookMessages();
                this.getSlaFacebookMessages();
                // alert(res.message);

                this.activeTag = true;
                this.checkTag = true;
              });
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

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');
          this.getFacebookComments();
          this.getSlaFacebookComments();
          // alert(res.message);

          this.activeTag = false;
          this.checkTag = false;
        });
    }
    if (type == 'FCP') {
      this.insertTagsForFeedDto.tagId = tagid;
      this.insertTagsForFeedDto.feedId = feedId.toString();
      this.insertTagsForFeedDto.feedType = 'FCP';

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');
          this.getFacebookMessages();
          this.getSlaFacebookMessages();
          // alert(res.message);

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

      this.commondata
        .InsertSentiment(this.insertSentimentForFeedDto)
        .subscribe((res: any) => {
          this.getFacebookComments();
          this.getSlaFacebookComments();
          this.reloadComponent('Sentiment');
        });
    }
    if (type == 'FCP') {
      this.insertSentimentForFeedDto.feedId = feedId.toString();
      this.insertSentimentForFeedDto.sentiment = sentimenName;
      this.insertSentimentForFeedDto.feedType = 'FCP';

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
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
        this.storeComId = comId;
        alert(res.message);
        this.getFacebookMessages();
        this.getSlaFacebookMessages();
      });
  }

  likeByAdmin(comId: any, isLiked: boolean) {
    isLiked = !isLiked;

    this.commondata.LikedByAdmin(comId, isLiked).subscribe((res: any) => {
      this.getFacebookComments();
      this.getSlaFacebookComments();
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

  removeAttachedFile(i: any) {
    this.ImageName.forEach((xyz: any) => {
      if (i == xyz) {
        this.ImageName.slice(i, 1);
      }
    });

    console.log('This is image array=====>', this.ImageName);
  }
}