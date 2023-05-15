import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Tooltip } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  Emails: any;

  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();

  pageNumber: any = 0;
  pageSize: any = 0;

  filterDto = new FiltersDto();

  show = false;
  isOpen = false;
  active = false;
  expandedEmailBody: boolean = false;
  activeTag = false;

  public Subscription!: Subscription;

  constructor(
    private fetchId: FetchIdService,
    private commondata: CommonDataService,
    private SpinnerService : NgxSpinnerService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res)=>{
      this.id = res;
      this.getEmails();
    })
  }

  ngOnInit(): void {

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.getEmails();
    this.getSlaEmails();
    this.getTagList();
    
   // this.signalRService.startConnection();
  //  this.addTransferChatDataListener();
  }

  commentDto = new commentsDto();
  
  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on('SendData', (data) => {
      data.signalRConversiontions.forEach((xyz: any) => {
        if (this.id == xyz.userId) {
          this.commentDto = xyz;
          this.Emails[0].comments.push(this.commentDto);
        }
      });
      this.changeDetect.detectChanges();
    });
  };
  To:string=""
  totalUnrespondedCmntCountByCustomer:number=0;

  getEmails() {
    if(this.id != null || undefined){
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Email',
        pageNumber: 0,
        pageSize: 0,
      };
  
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.Emails = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
  
          this.Emails.forEach((msg:any) => {
            this.To = msg.comments[0].to;
          });
        });
    }
  }
  getSlaEmails() {
    if(this.slaId != null || undefined){
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Email',
        pageNumber: 0,
        pageSize: 0,
      };
  
      this.SpinnerService.show();
      this.commondata
        .GetSlaDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.Emails = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
  
          this.Emails.forEach((msg:any) => {
            this.To = msg.comments[0].to;
          });
        });
    }
  }
  expandEmailBody() {
    this.expandedEmailBody = !this.expandedEmailBody;
  }

  markRead:boolean=false;
  opened:boolean=false;
  replyId:any[]=[];
  emailId:any

  openEmail(id:any){

    this.Emails.forEach((xyz:any) => {
      xyz.comments.forEach((email:any) => {
        if (email.id == id){
          this.emailId = email.id;
          this.opened = true;
    this.markRead = !this.markRead;

        }
        email.replies.forEach((reply:any) => {
          if(reply.id == id){
            if(this.replyId.includes(id)){
              this.replyId.splice(id);
              this.opened = false;
   this.markRead = !this.markRead;
            } else {
              this.replyId.push(reply.id);
              this.opened = true;
              this.markRead = !this.markRead;
            }
            
            
          }
          
        });
      });
      
    });

    
  }

  insertTagsForFeedDto = new InsertTagsForFeedDto();
  checkTag=false;

  insertTags(id: any, comId: any) {
    
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'Mail';

    this.Emails.forEach((abc: any) => {
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
                this.getEmails();
                this.getSlaEmails();
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          } else {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                //  alert(res.message);
                this.getEmails();
                this.getSlaEmails();
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          }
        }
      });
    });
   
  }
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();

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

  removeTag(id: any, comId: any) {
    
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'Mail';

    this.commondata
      .RemoveTag(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        //  alert(res.message);
        this.getEmails();
        this.getSlaEmails();
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

  TagsList:any;
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

  ReplyDto = new ReplyDto();

  emailReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

  agentTeamId :number=0;
  platform :string="";
  postType : string = ""
  emailTo:any;
  emailCc:any;
  emailBcc:any;
  emailSubject:any;
  emailFrom:any;

  sendEmailInformation(id: any) {
    this.Emails.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == id) {
          

          // populate comment data

          this.emailId = comment.id;
          this.agentTeamId = 2;
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.emailTo = comment.to;
          this.emailCc = comment.cc;
          this.emailBcc = comment.bcc;
          this.emailSubject = comment.body;
          this.emailFrom = comment.userName.split(/[<>]/)[1];
        }
      });
    });
  }

  ImageName: any;

  submitEmailReply() {
    
    if (
      !this.emailReplyForm.get('emailTo')?.dirty ||
      !this.emailReplyForm.get('emailCc')?.dirty ||
      !this.emailReplyForm.get('emailBcc')?.dirty ||
      !this.emailReplyForm.get('emailSubject')?.dirty
    ) {
      if (!this.emailReplyForm.get('emailTo')?.dirty) {
        this.emailReplyForm.patchValue({
          to: this.emailFrom,
        });
      }
      if (!this.emailReplyForm.get('emailCc')?.dirty) {
        this.emailReplyForm.patchValue({
          cc: this.emailCc,
        });
      }
      if (!this.emailReplyForm.get('emailBcc')?.dirty) {
        this.emailReplyForm.patchValue({
          bcc: this.emailBcc,
        });
      }
      if (!this.emailReplyForm.get('emailSubject')?.dirty) {
        this.emailReplyForm.patchValue({
          subject: this.emailSubject,
        });
      }  
    } 
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }

    this.emailReplyForm.patchValue({
      commentId: this.emailId,
      teamId: this.agentTeamId,
      platform: this.platform,
      contentType: this.postType,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.emailReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.getEmails();
        this.getSlaEmails();

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

  emailText:any;
  emailReply:any;

  clearInputField() {
    this.emailReply = '';
    this.emailText = '';
    this.show = false;
    this.emailId = '';
    this.agentTeamId = 0;
    this.platform = '';
    this.postType = '';
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

  commentStatusDto = new CommentStatusDto();
  querryCompleted = false;
  storeComId:any;

  emailStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'Mail';
    this.commentStatusDto.plateForm = 'Email';
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
        this.storeComId = comId;
        alert(res.message);
        this.getEmails();
        this.getSlaEmails();
      });
  }

  showCcBtn:boolean=true;
  showBccBtn:boolean=true;
  showCcInput:boolean=false;
  showBccInput:boolean=false;

  OpenCc(){
    this.showCcBtn = false;
    this.showCcInput = true;

  }
  OpenBcc(){
    this.showBccBtn = false;
    this.showBccInput = true;
  }
  closeReplyModal(){
    this.showCcBtn=true;
    this.showBccBtn=true;
    this.showCcInput=false;
    this.showBccInput=false;
  }

  expandReply(){
    
  }
}
