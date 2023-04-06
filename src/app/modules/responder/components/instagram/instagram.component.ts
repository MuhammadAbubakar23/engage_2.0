import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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
import { Tooltip } from 'bootstrap';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { commentsDto } from 'src/app/shared/Models/concersationDetailDto';
import { Subscription } from 'rxjs';

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

  pageNumber: any = 0;
  pageSize: any = 0;

  // Instagram Comment
  InstacommentId: any;
  agentTeamId : number=0;
  platform : string="";
  postType : string = "";
  instaCommentText:string=""
  commentReply:string=""

  instagramCommentReplyDto = new InstagramCommentReplyDto();

  show = false;
  isOpen = false;
  active = false;

  commentStatusDto = new CommentStatusDto();

  querryCompleted = false;

  storeComId: any;

  TagsList: any;
  Keywords: any[] = [];
  agentName = localStorage.getItem('agentName');

  insertTagsForFeedDto = new InsertTagsForFeedDto();

  getAppliedTagsList: any;

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
  totalUnrespondedCmntCountByCustomer:number=0;
  pageName:any;

  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private _route: Router,
    private SpinnerService: NgxSpinnerService,
    private commondata: CommonDataService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res)=>{
      this.id = res;
      this.getInstagramData();
    })
  }

  ngOnInit(): void {

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.getInstagramData();
    this.getSlaInstagramData();
    this.getTagList();
    this.quickReplyList();
   // this.signalRService.startConnection();
   // this.addTransferChatDataListener();
  }

  commentDto = new commentsDto();
  
  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on('SendData', (data) => {
      data.signalRConversiontions.forEach((xyz: any) => {
        if (this.id == xyz.userId) {
          this.commentDto = xyz;
          this.InstagramData[0].comments.push(this.commentDto);
        }
      });
      this.changeDetect.detectChanges();
    });
  };
  ReplyDto = new ReplyDto();

  getInstagramData() {
    
    if(this.id != null || undefined){
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Instagram',
        pageNumber: 0,
        pageSize: 0,
      };
    }
    

    this.SpinnerService.show();
    this.commondata
      .GetChannelConversationDetail(this.filterDto)
      .subscribe((res: any) => {
        this.SpinnerService.hide();
        this.InstagramData = res.List;
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.pageName = this.InstagramData[0].post.profile.page_Name;

        this.instaStats();
      });
  }

  getSlaInstagramData() {
    
    if(this.slaId != null || undefined){
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Instagram',
        pageNumber: 0,
        pageSize: 0,
      };
    }
    

    this.SpinnerService.show();
    this.commondata
      .GetSlaDetail(this.filterDto)
      .subscribe((res: any) => {
        this.SpinnerService.hide();
        this.InstagramData = res.List;
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.pageName = this.InstagramData[0].post.profile.page_Name;

        this.instaStats();
      });
  }
  instagramCommentReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

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
        }
      });
    });
  }
  submitInstagramCommentReply() {
    
      var formData = new FormData();

    this.instagramCommentReplyForm.patchValue({
      commentId: this.InstacommentId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.instagramCommentReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.getInstagramData();
        this.getSlaInstagramData();

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
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
        this.storeComId = comId;
        alert(res.message);
        this.getInstagramData();
        this.getSlaInstagramData();
      });
  }
  closeMentionedReply() {
    this.show = false;
  }

  toggle(child: string) {
    if(localStorage.getItem('child') == child){
      this.toggleService.addTogglePanel('');
    } else{
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

  insertTagsForFeed(id: any, comId: any) {
    
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'IC';

    this.InstagramData.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          if (comment.tags.length > 0) {
            for (let len = 0; len < comment.tags.length; len++) {
              comment.tags.forEach((tag: any) => {
                if (tag.id == id) {
                  this.removeTagFromFeed(id, comId);
                }
              });
            }
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                //  alert(res.message);
                this.getInstagramData();
                this.getSlaInstagramData();
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          } else {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                //  alert(res.message);
                this.getInstagramData();
                this.getSlaInstagramData();
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          }
        }
      });
    });
  }

  removeTagFromFeed(id: any, comId: any) {
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'IC';

    this.commondata
      .RemoveTag(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        //  alert(res.message);
        this.getInstagramData();
        this.getSlaInstagramData();
        this.reloadComponent('RemoveTag');

        this.activeTag = false;
        this.checkTag = false;
      });
  }

  postIdForStats:any;
  pageIdForStats:any;

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

    this.commondata
      .InsertSentiment(this.insertSentimentForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);

    this.instaCommentText = abc?.text;

    this.instagramCommentReplyForm.patchValue({ text: this.instaCommentText });
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  likeByAdmin(comId: any, isLiked: boolean) {
    isLiked = !isLiked;

    this.commondata.LikedByAdmin(comId, isLiked).subscribe((res: any) => {
      this.getInstagramData();
      this.getSlaInstagramData();

      // alert(res.message)
      if (isLiked == true) {
        this.reloadComponent('Like');
      }
      if (isLiked == false) {
        this.reloadComponent('disLike');
      }
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
  clearInputField() {
    this.commentReply = '';
    this.instaCommentText = '';
    this.show = false;
    this.InstacommentId = '';
    this.agentTeamId = 0;
    this.platform = '';
    this.postType = '';
  }
}
