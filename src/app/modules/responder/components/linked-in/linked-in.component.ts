import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto, conversationDetailDto, listDto, postStatsDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-linked-in',
  templateUrl: './linked-in.component.html',
  styleUrls: ['./linked-in.component.scss']
})
export class LinkedInComponent implements OnInit {

  id = this.fetchId.getOption();

  LinkedInData:any;
  pageName:any;
  totalUnrespondedCmntCountByCustomer:any;

  public Subscription!: Subscription;


  filterDto =new FiltersDto();
  ConverstationDetailDto = new conversationDetailDto();


  TagsList: any;
  pageNumber: any = 0;
  pageSize: any = 0;
  TodayDate: any;

  chatText: any;
  commentId: any;
  agentTeamId: any;
  platform: any;
  postType: any;
  
  filesToUpload: any;
  ImageName: any[]=[];
 
  commentReply: any;
  getAppliedTagsList: any;
 
  storeComId: any;
  AlterMsg: any = '';

  slaId = this.fetchId.getSlaId();

  ReplyDto = new ReplyDto();
  
 
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  commentStatusDto = new CommentStatusDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();

  listDto = new listDto();
  UploadedFile: FormData = new FormData();

  show = false;
  isOpen = false;
  active = false;

  checkTag = false;
  activeTag = false;
  querryCompleted = false;
  markAsComplete = false;
  toastermessage = false;

  PostStatsArray: postStatsDto[] = [];
  QuickReplies: any[] = [];
  HumanAgentTags: any[] = [];
  Keywords: any[] = [];

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
      this.getLinkedInComments();
    })
  }

  ngOnInit(): void {

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.TodayDate = new Date();

    this.getLinkedInComments();
    this.getSlaLinkedInComments();
    this.getTagList();
    this.quickReplyList();
    this.humanAgentTags();
   // this.signalRService.startConnection();
   // this.addTransferChatDataListener();
  }

  commentDto = new commentsDto();
  
  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on('SendData', (data) => {
      data.signalRConversiontions.forEach((xyz: any) => {
        if (this.id == xyz.userId) {
          this.commentDto = xyz;
          this.LinkedInData[0].comments.push(this.commentDto);
        }
      });
      this.changeDetect.detectChanges();
    });
  };
  getLinkedInComments() {
    
    if (this.id != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'LinkedIn',
        pageNumber: 0,
        pageSize: 0,
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.ConverstationDetailDto = res;
          this.LinkedInData = this.ConverstationDetailDto.List;
          this.pageName = this.LinkedInData[0].post.profile.page_Name;

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

          console.log('Fb Data==>', this.LinkedInData);
        });
    }
  }

  getSlaLinkedInComments() {
    if (this.slaId != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'LinkedIn',
        pageNumber: 0,
        pageSize: 0,
      };
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.LinkedInData = res.List;
        this.pageName = this.LinkedInData[0].post.profile.page_Name;

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

      });
    }
  }

  imageSize:any;
  onFileChanged(event: any) {
    
    if (event.target.files.length > 0) {
      this.isAttachment = true
      this.ImageName = event.target.files;
    }
  }

  removeAttachedFile(i:any){
    
    //var rec= this.ImageName.find(x=>x.name==i.name);
    
    this.ImageName=this.ImageName.filter(x=>x.name!==i.name)

    console.log("This is image array=====>",this.ImageName)
  }

  linkedInReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

  SendCommentInformation(comId: any) {
    this.LinkedInData.forEach((xyz: any) => {
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

  closeMentionedReply() {
    this.show = false;
    this.commentId = '';
    this.agentTeamId = '';
    this.platform = '';
    this.postType = '';
  }

  isAttachment = false;

  submitLinkedInCommentReply() {
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }

    this.linkedInReplyForm.patchValue({
      commentId: this.commentId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.linkedInReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.getLinkedInComments();
        this.getSlaLinkedInComments();

        this.reloadComponent('comment');
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  clearInputField() {
    this.commentReply = '';
    this.show = false;
    this.commentId = '';
    this.agentTeamId = '';
    this.platform = '';
    this.postType = '';
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

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);

    this.chatText = abc?.text;

    this.linkedInReplyForm.patchValue({ text: this.chatText });
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

    this.linkedInReplyForm.patchValue({ text: this.chatText });
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

  insertTags(id: any, comId: string, type: any) {
    
    if (type == 'LIC') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'LIC';

      this.LinkedInData.forEach((abc: any) => {
        abc.comments.forEach((comment: any) => {
          if (comment.id == comId) {
            if (comment.tags.length > 0) {
              for (let len = 0; len < comment.tags.length; len++) {
                comment.tags.forEach((tag: any) => {
                  if (tag.id == id) {
                    this.removeTag(id, comId, type);
                  }
                });
              }
              this.commondata
                .InsertTag(this.insertTagsForFeedDto)
                .subscribe((res: any) => {
                  this.reloadComponent('ApplyTag');
                  this.getLinkedInComments();
                  this.getSlaLinkedInComments();

                  // alert(res.message);

                  this.activeTag = true;
                  this.checkTag = true;
                });
            } else {
              this.commondata
                .InsertTag(this.insertTagsForFeedDto)
                .subscribe((res: any) => {
                  this.getLinkedInComments();
                  this.getSlaLinkedInComments();
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
  }

  removeTag(tagid: any, feedId: string, type: any) {
    if (type == 'LIC') {
      this.insertTagsForFeedDto.tagId = tagid;
      this.insertTagsForFeedDto.feedId = feedId.toString();
      this.insertTagsForFeedDto.feedType = 'LIC';

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');
          this.getLinkedInComments();
          this.getSlaLinkedInComments();
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

  insertSentiment(feedId: string, sentimenName: any, type: any) {
    if (type == 'LIC') {
      this.insertSentimentForFeedDto.feedId = feedId.toString();
      this.insertSentimentForFeedDto.sentiment = sentimenName;
      this.insertSentimentForFeedDto.feedType = 'LIC';

      this.commondata
        .InsertSentiment(this.insertSentimentForFeedDto)
        .subscribe((res: any) => {
          this.getLinkedInComments();
          this.getSlaLinkedInComments();
          this.reloadComponent('Sentiment');
        });
    }
  }

  commentStatus(comId: any, type:any) {
    
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'LinkedIn';
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
        this.storeComId = comId;
        alert(res.message);
        this.getLinkedInComments();
        this.getSlaLinkedInComments();
      });
  }

  likeByAdmin(comId: any, isLiked: boolean) {
    isLiked = !isLiked;

    this.commondata.LikedByAdmin(comId, isLiked).subscribe((res: any) => {
      this.getLinkedInComments();
      this.getSlaLinkedInComments();
      if (isLiked == true) {
        this.reloadComponent('Like');
      }
      if (isLiked == false) {
        this.reloadComponent('disLike');
      }
    });
  }

  markAsCompleteExpanded(comId: any) {
    this.LinkedInData.forEach((abc: any) => {
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
    // toggleEmojis();
  }

}
