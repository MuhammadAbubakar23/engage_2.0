import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto, conversationDetailDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-sms-details',
  templateUrl: './sms-details.component.html',
  styleUrls: ['./sms-details.component.scss']
})
export class SmsDetailsComponent implements OnInit {

  SmsData: any;

  id = this.fetchId.id;

  public Subscription!: Subscription;

  show = false;
  isOpen = false;
  active = false;
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();

  TagsList: any;
  Keywords: any[] = [];
  insertTagsForFeedDto = new InsertTagsForFeedDto();

  getAppliedTagsList: any;

  activeTag = false;
  checkTag = false;
  QuickReplies: any;
  commentStatusDto = new CommentStatusDto();

  querryCompleted = false;

  storeComId: any;
  smsId:number=0;
  agentTeamId:number=0;
  platform:string="";
  postType:string="";
  ReplyDto = new ReplyDto()

  smsText:string="";
  smsReply:string="";
  AlterMsg:any;
  toastermessage=false;
  ConverstationDetailDto = new conversationDetailDto();
  filterDto = new FiltersDto();
  totalUnrespondedCmntCountByCustomer:number=0;
  To:any;

  constructor(private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private _route: Router,
    private SpinnerService : NgxSpinnerService,
    private commondata : CommonDataService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef) { 
      this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res)=>{
        this.id = res;
        this.getSmsData();
      })
    }

  ngOnInit(): void {

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.getSmsData();
    this.getSlaSmsData();
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
          this.SmsData[0].comments.push(this.commentDto);
        }
      });
      this.changeDetect.detectChanges();
    });
  };
  getSmsData(){
    
    if (this.id != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'SMS',
        pageNumber: 0,
        pageSize: 0,
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.ConverstationDetailDto = res;
          this.SmsData = this.ConverstationDetailDto.List;

         this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
         this.SmsData.forEach((msg:any) => {
          this.To = msg.comments[0].to;
        });
        });
    }

  }
  slaId = this.fetchId.getSlaId();
  getSlaSmsData(){
    
    if (this.slaId != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'SMS',
        pageNumber: 0,
        pageSize: 0,
      };

      this.SpinnerService.show();
      this.commondata
        .GetSlaDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.ConverstationDetailDto = res;
          this.SmsData = this.ConverstationDetailDto.List;

         this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
         this.SmsData.forEach((msg:any) => {
          this.To = msg.comments[0].to;
        });
        });
    }

  }

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

  insertTags(id: any, comId: any) {
     
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'SMS';

    this.SmsData.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          if (comment.tags.length > 0) {
            for (let len = 0; len < comment.tags.length; len++) {
              comment.tags.forEach((tag: any) => {
                if (tag.id == id) {
                  this.removeTag(id, comId);
                }
              });
            }
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                //  alert(res.message);
                this.getSmsData();
                this.getSlaSmsData();
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          } else {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                //  alert(res.message);
                this.getSmsData();
                this.getSlaSmsData();
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          }
        }
      });
    });
   
  }

  removeTag(id: any, comId: any) {
     
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'SMS';

    this.commondata
      .RemoveTag(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        //  alert(res.message);
        this.getSmsData();
        this.getSlaSmsData();
        this.reloadComponent('RemoveTag');

        this.activeTag = false;
        this.checkTag = false;
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

  insertSentiment(feedId: any, sentimenName: any, type:any) {
    
    this.insertSentimentForFeedDto.feedId = feedId.toString();
    this.insertSentimentForFeedDto.sentiment = sentimenName;
    this.insertSentimentForFeedDto.feedType = type;

    this.commondata
      .InsertSentiment(this.insertSentimentForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');

      });
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);

   this.smsText = abc?.text;

   this.SmsReplyForm.patchValue({ text: this.smsText });
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  smsStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'SMS';
    this.commentStatusDto.plateForm = 'SMS';
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
        this.storeComId = comId;
        alert(res.message);
        this.getSmsData();
        this.getSlaSmsData();
      });
  }

  SendSmsInformation(comId:any){
    this.SmsData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.smsId = comment.id;
          this.agentTeamId = 2;
          this.platform = xyz.platform;
          this.postType = comment.contentType;
        }
      });
    });
  }
  
  SmsReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

  submitSmsReply() {
    
    var formData = new FormData();
    

    this.SmsReplyForm.patchValue({
      commentId: this.smsId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.SmsReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.getSmsData();
        this.getSlaSmsData();

        this.reloadComponent('comment');
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  clearInputField() {
    this.smsReply = '';
    this.smsText = '';
    this.show = false;
    this.smsId = 0;
    this.agentTeamId = 0;
    this.platform = '';
    this.postType = '';
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
}
