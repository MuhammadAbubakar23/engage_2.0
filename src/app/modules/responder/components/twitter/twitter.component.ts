import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto, messagesDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
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
  TwitterMessage:any[] = [];

  pageNumber: any = 0;
  pageSize: any = 0;
  totalUnrespondedCmntCountByCustomer:number=0;

  show = false;
  isOpen = false;
  active = false;

  statusId: any;
  commentText: any;
  msgText:any;
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
  profileId: any;

  isLikedByAdmin: any;
  ticketId: any;

  tweetId: any;

  commentStatusDto = new CommentStatusDto();

  querryCompleted = false;

  storeComId: any;
  insertTagsForFeedDto = new InsertTagsForFeedDto();

  getAppliedTagsList: any;
  totalUnrespondedMsgCountByCustomer:any;

  public Subscription!: Subscription;

  constructor(
    private fetchId: FetchIdService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef,
    private commondata: CommonDataService,
    private SpinnerService : NgxSpinnerService
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res)=>{
      this.id = res;
      this.getTwitterData();
      this.getTwitterMessages();
    })
  }

  ngOnInit(): void {

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));

    
    this.getTwitterData();
    this.getSlaTwitterData();
    this.getTagList();
    this.getTwitterMessages();
    this.getSlaTwitterMessages();
    this.quickReplyList();

   // this.signalRService.startConnection();
   // this.addTransferChatDataListener();
  }

  commentDto = new commentsDto();
  messageDto = new messagesDto();
  
  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on('SendData', (data) => {
      
      if(data.signalRConversiontions != null){
        data.signalRConversiontions.forEach((xyz: any) => {
          if (this.id == xyz.userId) {
            this.commentDto = xyz;
            this.TwitterConversation[0].comments.push(this.commentDto);
          }
        });
        this.changeDetect.detectChanges();
      }
      if(data.signalRDMConversations != null){
        data.signalRDMConversations.forEach((xyz: any) => {
          if (this.id == xyz.fromId) {
            this.messageDto = xyz;
            this.TwitterMessage.push(this.messageDto);
          }
        });
        this.changeDetect.detectChanges();
      } 
    });
  };
  filterDto = new FiltersDto();
  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  getTwitterData() {
    
    if(this.id != null || undefined){
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: 0,
        pageSize: 0,
      };
  
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.TwitterConversation = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
  
          
        });
        setTimeout(() => {
          this.SpinnerService.hide();
        }, 3000);
    }
    
  }

  getSlaTwitterData() {
    if(this.slaId != null || undefined){
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Twitter',
        pageNumber: 0,
        pageSize: 0,
      };
  
      this.SpinnerService.show();
      this.commondata
        .GetSlaDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.TwitterConversation = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
  
          
        });
        setTimeout(() => {
          this.SpinnerService.hide();
        }, 3000);
    }
    
  }

  getTwitterMessages(){
    
    if(this.id != null || undefined){
    this.filterDto = {
      // fromDate: new Date(),
      // toDate: new Date(),
      user: this.id,
      pageId: '',
      plateForm: 'Twitter',
      pageNumber: 0,
      pageSize: 0,
    };

    this.SpinnerService.show();
    this.commondata
      .GetChannelMessageDetail(this.filterDto)
      .subscribe((res: any) => {
        this.SpinnerService.hide();
        this.TwitterMessage = res.List.dm;
        this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
      });
    }
  }
  getSlaTwitterMessages(){
    if(this.slaId != null || undefined){
    this.filterDto = {
      // fromDate: new Date(),
      // toDate: new Date(),
      user: this.slaId,
      pageId: '',
      plateForm: 'Twitter',
      pageNumber: 0,
      pageSize: 0,
    };

    this.SpinnerService.show();
    this.commondata
      .GetSlaDM(this.filterDto)
      .subscribe((res: any) => {
        this.SpinnerService.hide();
        this.TwitterMessage = res.List.dm;
        this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
      });
    }
  }

  

  //   getTwitterReplies(){
  //
  //   this.twitterdata.GetTwitterReplies(this.userIdsDto).subscribe((res:any)=>{

  //     this.TwitterReplies = res.result;
  //     console.log("Twitter Replies ==>", this.TwitterReplies)
  //   })
  // }

  closeMentionedReply() {
    this.show = false;
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



  commentStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'TT';
    this.commentStatusDto.plateForm = 'Twitter';
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;

        this.storeComId = comId;

        // alert(res.message);
        this.getTwitterData();
        this.getSlaTwitterData();
      });
  }

  insertTagsForFeed(id: any, comId: string, type: any) {
    
    if (type == 'TT') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'TT';

      this.TwitterConversation.forEach((abc: any) => {
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
                  // this.reloadComponent('ApplyTag');
                  this.getTwitterData();
                  this.getSlaTwitterData();

                  // alert(res.message);

                  this.activeTag = true;
                  this.checkTag = true;
                });
            } else {
              this.commondata
                .InsertTag(this.insertTagsForFeedDto)
                .subscribe((res: any) => {
                  this.getTwitterData();
                  this.getSlaTwitterData();
                  // this.reloadComponent('ApplyTag');
                  // alert(res.message);

                  this.activeTag = true;
                  this.checkTag = true;
                });
            }
          }
        });
      });
    }
    if (type == 'TM') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'TM';

      this.TwitterMessage.forEach((msg: any) => {
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
                this.getTwitterMessages();
                this.getSlaTwitterMessages();

                // alert(res.message);

                this.activeTag = true;
                this.checkTag = true;
              });
          } else {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
                this.getTwitterMessages();
                this.getSlaTwitterMessages();
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
    if (type == 'TT') {
      this.insertTagsForFeedDto.tagId = tagid;
      this.insertTagsForFeedDto.feedId = feedId.toString();
      this.insertTagsForFeedDto.feedType = 'TT';

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          // this.reloadComponent('RemoveTag');
          this.getTwitterData();
          this.getSlaTwitterData();
          // alert(res.message);

          this.activeTag = false;
          this.checkTag = false;
        });
    }
    if (type == 'TM') {
      this.insertTagsForFeedDto.tagId = tagid;
      this.insertTagsForFeedDto.feedId = feedId.toString();
      this.insertTagsForFeedDto.feedType = 'TM';

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');
          this.getTwitterMessages();
          this.getSlaTwitterMessages();
          // alert(res.message);

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
        console.log('keywords==>', this.Keywords);
      });
      console.log('TagList', this.TagsList);
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

      this.commondata
        .InsertSentiment(this.insertSentimentForFeedDto)
        .subscribe((res: any) => {
          // alert(res.message);
          this.reloadComponent('Sentiment');
        });
    }
    if (type == 'TM') {
      this.insertSentimentForFeedDto.feedId = feedId.toString();
      this.insertSentimentForFeedDto.feedType = 'TM';
      this.insertSentimentForFeedDto.sentiment = sentimenName;

      this.commondata
        .InsertSentiment(this.insertSentimentForFeedDto)
        .subscribe((res: any) => {
          // alert(res.message);
          this.reloadComponent('Sentiment');
        });
    }
  }

  QuickReplies: any;

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  agentTeamId : number=0;
  platform : string="";
  postType : string = "";

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
        }
      });
    });    
  }

  TwitterRepliesForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

  

  submitTwitterReply() {
    
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
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.TwitterRepliesForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.getTwitterData();
        this.getSlaTwitterData();

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
      this.TwitterRepliesForm.patchValue({ text: this.commentText });
  }

  twitterMsgId:any;

  SendMessageInformation(id: any) {
    
    this.TwitterMessage.forEach((msg: any) => {
      if (msg.id == id) {
        // show mentioned reply
        this.show = true;
        this.twitterMsgId = msg.id;
        this.agentTeamId = 2;
        this.platform = this.fetchId.platform;
        this.postType = msg.contentType;
      }
    });
  }
  twitterMessageReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });
  submitTwitterMessageReply() {
    
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
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.twitterMessageReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.getTwitterMessages();
        this.getSlaTwitterMessages();

        this.reloadComponent('fbmessage');
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  likeByAdmin(comId: any, isLiked: boolean) {
    
    isLiked = !isLiked;

    this.commondata.LikedByAdmin(comId, isLiked).subscribe((res: any) => {
      this.getTwitterData();
      this.getSlaTwitterData();

      if(isLiked == true){
        this.reloadComponent('Like');
      }
      if(isLiked == false){
        this.reloadComponent('disLike');
      }
    });
  }

  toastermessage = false;
  AlterMsg: any = '';

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

  commentReply:any;

  clearInputField() {
    this.commentReply = '';
    this.msgText = '';
    this.show = false;
    this.tweetId = '';
    this.agentTeamId = 0;
    this.platform = '';
    this.postType = '';
  }

  TTReply:boolean=true;
  TMReply:boolean=false;

  twitterTweetReply() {
    this.TTReply = true;
    this.TMReply = false;
  }

  twitterMessageReply() {
    this.TTReply = false;
    this.TMReply = true;
  }
}
