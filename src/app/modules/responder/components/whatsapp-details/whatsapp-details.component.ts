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
import { commentsDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-whatsapp-details',
  templateUrl: './whatsapp-details.component.html',
  styleUrls: ['./whatsapp-details.component.scss']
})
export class WhatsappDetailsComponent implements OnInit {

  id = this.fetchId.id;
  slaId = this.fetchId.getSlaId();

  show = false;
  isOpen = false;
  active = false;
  toastermessage = false;
   querryCompleted = false;
  activeTag = false;
  checkTag = false;

  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  filterDto = new  FiltersDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();
  commentStatusDto = new CommentStatusDto();
  ReplyDto = new ReplyDto();


  AlterMsg: any = '';
  WhatsappData: any;
  senderId : string = "";
  totalUnrespondedCmntCountByCustomer:number=0;
  TagsList: any;
  getAppliedTagsList: any;
  QuickReplies: any;
  storeComId: any;
  WhatsappMsgId: any;
  agentTeamId : number=0;
  platform : string="";
  postType : string = "";
  WhatsappMsgText:string="";
  WhatsappMsgReply:string="";
  ImageName:any;
  Keywords: any[] = [];

  public Subscription!: Subscription;

  constructor(private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private _route: Router,
    private SpinnerService : NgxSpinnerService,
    private commondata : CommonDataService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef) { 
      this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res)=>{
        this.id = res;
        this.getWhatsappData();
      })
    }

  ngOnInit(): void {

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.getWhatsappData();
    this.getSlaWhatsappData();
    this.getTagList();
    this.quickReplyList();
   // this.signalRService.startConnection();
   // this.addTransferChatDataListener();
  }

  commentDto = new commentsDto();
  
  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on('SendData', (data) => {
      debugger
      data.signalRConversiontions.forEach((xyz: any) => {
        if (this.id == xyz.userId) {
          this.commentDto = xyz;
          this.WhatsappData[0].comments.push(this.commentDto);
        }
      });
      this.changeDetect.detectChanges();
    });
  };

  getWhatsappData(){
    debugger
    if(this.id != null || undefined){
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'WhatsApp',
        pageNumber: 0,
        pageSize: 0,
      };
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.WhatsappData = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
  
          this.WhatsappData.forEach((msg:any) => {
            this.senderId = msg.comments[0].to;
          });
  
       });
     }
    
  }

  getSlaWhatsappData(){
    if(this.slaId != null || undefined){
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'WhatsApp',
        pageNumber: 0,
        pageSize: 0,
      };
      this.SpinnerService.show();
      this.commondata
        .GetSlaDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.WhatsappData = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
  
          this.WhatsappData.forEach((msg:any) => {
            this.senderId = msg.comments[0].to;
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
    this.insertTagsForFeedDto.feedType = 'WM';

    this.WhatsappData.forEach((abc: any) => {
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
                this.getWhatsappData();
                this.getSlaWhatsappData();
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          } else {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                //  alert(res.message);
                this.getWhatsappData();
                this.getSlaWhatsappData();
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          }
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

  removeTag(id: any, comId: any) {
     
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'WM';

    this.commondata
      .RemoveTag(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        //  alert(res.message);
        this.getWhatsappData();
        this.getSlaWhatsappData();
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

   this.WhatsappMsgText = abc?.text;

   this.WhatsappReplyForm.patchValue({ text: this.WhatsappMsgText });
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  whatsappStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'WM';
    this.commentStatusDto.plateForm = 'WhatsApp';
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
        this.storeComId = comId;
        alert(res.message);
        this.getWhatsappData();
        this.getSlaWhatsappData();
      });
  }

  SendWhatsappInformation(comId:any){
    
    this.WhatsappData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.WhatsappMsgId = comment.id;
          this.agentTeamId = 2;
          this.platform = xyz.platform;
          this.postType = comment.contentType;
        }
      });
    });
  }
  
  WhatsappReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

  submitWhatsappReply() {
    
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }

    this.WhatsappReplyForm.patchValue({
      commentId: this.WhatsappMsgId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.WhatsappReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.getWhatsappData();
        this.getSlaWhatsappData();

        this.reloadComponent('comment');
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  onFileChanged(event: any) {
    if (event.target.files.length > 0) {
      this.ImageName = event.target.files;
    }
  }

  clearInputField() {
    this.WhatsappMsgReply = '';
    this.WhatsappMsgText = '';
    this.show = false;
    this.WhatsappMsgId = '';
    this.agentTeamId = 0;
    this.platform = '';
    this.postType = '';
  }

  closeToaster() {
    this.toastermessage = false;
  }
}
