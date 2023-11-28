import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { ApplySentimentService } from 'src/app/services/ApplySentimentService/apply-sentiment.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto, conversationDetailDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-sms-details',
  templateUrl: './sms-details.component.html',
  styleUrls: ['./sms-details.component.scss'],
})
export class SmsDetailsComponent implements OnInit {

  @ViewChild('radioInput', { static: false }) radioInput!: ElementRef<HTMLInputElement>;

  SmsData: any;

  id = this.fetchId.id;
  queryType = this.getQueryTypeService.getQueryType();

  public Subscription!: Subscription;

  show = false;
  isOpen = false;
  active = false;
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();

  TagsList: any[]=[];
  Keywords: any[] = [];
  insertTagsForFeedDto = new InsertTagsForFeedDto();

  getAppliedTagsList: any;
  TodayDate: any;

  activeTag = false;
  checkTag = false;
  QuickReplies: any;
  commentStatusDto = new CommentStatusDto();

  querryCompleted = false;

  storeComId: any;
  smsId: number = 0;
  agentId: string = '';
  platform: string = '';
  profileId: number = 0;
  postType: string = '';
  ReplyDto = new ReplyDto();

  smsText: string = '';
  smsReply: string = '';
  AlterMsg: any;
  toastermessage = false;
  ConverstationDetailDto = new conversationDetailDto();
  filterDto = new FiltersDto();
  totalUnrespondedCmntCountByCustomer: number = 0;
  To: any;
  TotalCmntQueryCount: number = 0;

  spinner1running = false;
  spinner2running = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  userInformation:any;

  commentsArray: any[] = [];
  groupArrays: any[] = [];
  public criteria!: SortCriteria;
  searchText: string = '';
  quickReplySearchText: string = '';
  queryStatus: any;
  flag:string='';

  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private SpinnerService: NgxSpinnerService,
    private commondata: CommonDataService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService: UpdateCommentsService,
    private queryStatusService: QueryStatusService,
    private createTicketService: CreateTicketService,
    private ticketResponseService: TicketResponseService,
    private applySentimentService: ApplySentimentService,
    private getQueryTypeService : GetQueryTypeService,
    private unrespondedCountService : UnRespondedCountService,
    private replyService : ReplyService,
    private router : Router,
    private stor: StorageService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
    //   this.id = res;
    //   this.getSmsData();
    // });
  }
  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement) {
    this.adjustTextareaHeight(textarea);
  }
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  messagesStatus:any[]=[];
  Sentiments:any[]=[];
  ngOnInit(): void {

    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    this.renderer.addClass(textarea, 'auto-resize');
    this.adjustTextareaHeight(textarea);
    this.flag = this.router.url.split('/')[2];

    const menu = this.stor.retrive('Tags', 'O').local;
      menu.forEach((item:any) => {
        if(item.name == "Tags"){
          item.subTags.forEach((singleTagObj:any) => {
            if(!this.TagsList.includes(singleTagObj)){
            this.TagsList.push(singleTagObj)
            }
          });
        }
        if(item.name == "Messages Status"){
          item.subTags.forEach((messagesStatusObj:any) => {
            if(!this.messagesStatus.includes(messagesStatusObj)){
            this.messagesStatus.push(messagesStatusObj)
            }
          });
        }
        if(item.name == "Sentiments"){
          item.subTags.forEach((sentimentObj:any) => {
            if(!this.Sentiments.includes(sentimentObj)){
            this.Sentiments.push(sentimentObj)
            }
          });
        }
      });
    
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };

    this.TodayDate = new Date();
    this.quickReplyList();
    this.getSmsData();
    // this.getTagList();

    this.Subscription = this.addTagService.receiveTags().subscribe((res) => {
      this.addTags = res;
      this.addTagDataListener();
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
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListener();
      });

    this.ticketResponseService.getTicketId().subscribe((res) => {
      this.updateTicketId(res);
    });

    // this.Subscription = this.applySentimentService
    //   .receiveSentiment()
    //   .subscribe((res) => {
    //     this.applySentimentListner(res);
    //   });

      this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        if (this.flag == 'focused' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
        if (res.contentCount.contentType == 'SMS') {
          this.totalUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
      }
      });

      this.Subscription = this.queryStatusService
      .receiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateQueryStatusDataListener();
      });

      this.Subscription = this.replyService.receiveReply().subscribe((res) => {
        this.replyDataListener(res);
      });
  }

  commentDto = new commentsDto();
  updatedComments: any;

  updateCommentsDataListener() {
    
    if(!this.id){
      this.id = localStorage.getItem('storeOpenedId') || '{}'
    }
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
        this.SmsData[0].comments.push(this.commentDto);
        this.commentsArray.push(this.commentDto);

        let groupedItems = this.commentsArray.reduce((acc: any, item: any) => {
          const date = item.createdDate.split('T')[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});

        this.groupArrays = Object.keys(groupedItems).map((createdDate) => {
          return {
            createdDate,
            items: groupedItems[createdDate],
          };
        });
        // // console.log("hello", this.groupArrays)
        this.totalUnrespondedCmntCountByCustomer =
          this.totalUnrespondedCmntCountByCustomer + 1;
      }
    });
    this.changeDetect.detectChanges();
  }
  getSmsData() {
    this.flag = this.router.url.split('/')[2];
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'SMS',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
        text : "",
        userName: "",
        notInclude: "",
        include: "",
        flag: this.flag,
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.spinner1running = false;
          this.ConverstationDetailDto = res;
          this.TotalCmntQueryCount = res.TotalQueryCount;
          this.SmsData = this.ConverstationDetailDto.List;
          this.userInformation = res.List[0].user;

          this.commentsArray = [];

          this.SmsData.forEach((item: any) => {
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

            this.groupArrays = Object.keys(groupedItems).map((createdDate) => {
              return {
                createdDate,
                items: groupedItems[createdDate],
              };
            });
            // // console.log("hello", this.groupArrays)
          });

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.SmsData.forEach((msg: any) => {
            this.To = msg.comments[0].sendTo;
          });
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'SMS',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false,
        queryType: this.queryType,
        text : "",
        userName: "",
        notInclude: "",
        include: "",
        flag: this.flag,
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.ConverstationDetailDto = res;
        this.TotalCmntQueryCount = res.TotalQueryCount;
        this.SmsData = this.ConverstationDetailDto.List;
        this.userInformation = res.List[0].user;

        this.commentsArray = [];

        this.SmsData.forEach((item: any) => {
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

          this.groupArrays = Object.keys(groupedItems).map((date) => {
            return {
              date,
              items: groupedItems[date],
            };
          });
          // // console.log("hello", this.groupArrays)
        });

        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.SmsData.forEach((msg: any) => {
          this.To = msg.comments[0].sendTo;
        });
      });
    } else {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: localStorage.getItem('storeOpenedId') || '{}',
        pageId: '',
        plateForm: localStorage.getItem('parent') || '{}',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
        text : "",
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
      };

      this.SpinnerService.show();
      this.commondata.GetChannelConversationDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.ConverstationDetailDto = res;
        this.TotalCmntQueryCount = res.TotalQueryCount;
        this.SmsData = this.ConverstationDetailDto.List;
        this.userInformation = res.List[0].user;

        this.commentsArray = [];

        this.SmsData.forEach((item: any) => {
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

          this.groupArrays = Object.keys(groupedItems).map((date) => {
            return {
              date,
              items: groupedItems[date],
            };
          });
          // // console.log("hello", this.groupArrays)
        });

        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
        this.SmsData.forEach((msg: any) => {
          this.To = msg.comments[0].sendTo;
        });
      });
    }
  }
  slaId = this.fetchId.getSlaId();

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

  getTagList() {
    this.commondata.GetTagsList().subscribe((res: any) => {
      this.TagsList = res;
      this.TagsList.forEach((xyz: any) => {
        xyz.keywordList.forEach((abc: any) => {
          this.Keywords.push(abc);
        });
      });
    });
  }

  insertTagsForFeed(comId: number, tagName: string) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = tagName;
    this.insertTagsForFeedDto.type = 'Tag';
    this.insertTagsForFeedDto.platform = 'SMS';

    this.SmsData?.forEach((msg: any) => {
      if (msg.id == comId) {
        if (msg.tags.length == 0) {
          this.commondata
            .InsertTag(this.insertTagsForFeedDto)
            .subscribe((res: any) => {
              this.reloadComponent('ApplyTag');

              this.activeTag = true;
              this.checkTag = true;
            });
        } else if (msg.tags.length > 0) {
          const value = msg.tags.find((x: any) => x.name == tagName);
          if (value != null || value != undefined) {
            this.removeTagFromFeed(comId, tagName);
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
}

removeTagFromFeed(feedId: number, tagName: any) {
  if (this.flag == 'focused' || this.flag == 'assigned_to_me' || this.flag == 'follow_up'
  ) {
      this.insertTagsForFeedDto.tagName = tagName;
      this.insertTagsForFeedDto.feedId = feedId;
      this.insertTagsForFeedDto.type = 'Tag';
      this.insertTagsForFeedDto.platform = 'SMS';

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');
          this.activeTag = false;
          this.checkTag = false;
        });
  }
}


  insertSentimentForFeed(comId: number, sentimenName: any) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = sentimenName;
    this.insertTagsForFeedDto.type = 'Sentiment';
    this.insertTagsForFeedDto.platform = 'SMS';

    this.commondata.InsertSentiment(this.insertTagsForFeedDto).subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
}

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);
    this.text = abc?.text + " ";
    this.insertAtCaret(this.text);
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      // // console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  detectChanges(): void {
    this.text = this.textarea.nativeElement.value
  }

  smsStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'SMS';
    this.commentStatusDto.plateForm = 'SMS';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
   // this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        // this.querryCompleted = true;
        // this.storeComId = comId;
        // alert(res.message);
        // this.getSmsData();
      });
  }
  queryCompleted(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'SMS';
    this.commentStatusDto.plateForm = 'SMS';
   // this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
        // this.storeComId = comId;
        // alert(res.message);
        // this.getSmsData();
      });
  }
  userProfileId = 0;

  SendSmsInformation(comId: any) {
    
    this.SmsData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.smsId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.userProfileId = this.userInformation.id;
        }
      });
    });
  }

  SmsReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    // profileId: new UntypedFormControl(this.ReplyDto.profileId),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
    responseByName: new FormControl(this.ReplyDto.responseByName),
  });
  
  text:string="";

  submitSmsReply() {
    if(this.smsId == 0){
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();

      
    // if (!this.SmsReplyForm.get('text')?.dirty) {
      if(this.text !== ""){
        this.SmsReplyForm.patchValue({
          text: this.text
        })
    }
    // } else {
    //   if (this.SmsReplyForm.value.text) {
    //     this.SmsReplyForm.patchValue({
    //       to: this.SmsReplyForm.value.text
    //     });
    //   }
    // }
      this.SmsReplyForm.patchValue({
        commentId: this.smsId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        userProfileId : this.userProfileId,
        responseByName: this.To,
      });
  
      formData.append(
        'CommentReply',
        JSON.stringify(this.SmsReplyForm.value)
      );
      if(this.SmsReplyForm.value.text !== "" && this.SmsReplyForm.value.text !== null){
        this.spinner1running = true;
      this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
      this.SpinnerService.hide();
            this.clearInputField();
            // this.getSmsData();
            
            this.reloadComponent('comment');
            if(this.radioInput != undefined){
              this.radioInput.nativeElement.checked = false;
            }
          },
          (error) => {
            alert(error.message);
            this.spinner1running = false;
           this.SpinnerService.hide();
         }
        );
      } else {
        this.reloadComponent('empty-input-field')
      }
    }
    this.quickReplySearchText = '';
  }

  clearInputField() {
    this.SmsReplyForm.reset();
    this.smsReply = '';
    this.smsText = '';
    this.show = false;
    this.smsId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
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
  markAsComplete = false;
  markAsCompleteExpanded(comId: any) {
    this.SmsData.forEach((abc: any) => {
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
      this.detectChanges();
    }
  }

  insertEmoji(emoji: any) {
    this.insertAtCaret(' ' + emoji + ' ');
  }

  addTags: any;
  removeTags: any;

  addTagDataListener() {
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        if (singleCmnt.id == this.addTags.feedId) {
          if(this.addTags.type == 'Tag'){
          if (singleCmnt.tags.length == 0) {
            singleCmnt.tags.push(this.addTags);
          } else if (singleCmnt.tags.length > 0) {
            const tag = singleCmnt.tags.find(
              (x: any) => x.name == this.addTags.name
            );
            if (tag != null || tag != undefined) {
              const index = singleCmnt.tags.indexOf(tag);
              if (index !== -1) {
                singleCmnt.tags.splice(index, 1);
              }
            } else {
              if (!singleCmnt.tags.includes(this.addTags)) {
                singleCmnt.tags.push(this.addTags);
              }
            }
          }
        }
        if(this.addTags.type == 'Sentiment'){
          singleCmnt.sentiment = this.addTags;
        }
        }
      });
    });
    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        if (singleCmnt.id == this.removeTags.feedId) {
          var tag = singleCmnt.tags.find(
            (x: any) => x.name == this.removeTags.tagName
          );
          const index = singleCmnt.tags.indexOf(tag);
          if (index !== -1) {
            singleCmnt.tags.splice(index, 1);
          }
        }
      });
    });
    this.changeDetect.detectChanges();
  }

  updateBulkQueryStatusDataListener() {
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        this.queryStatus.forEach((querry: any) => {
          if (singleCmnt.id == querry.queryId) {
            singleCmnt.queryStatus = querry.queryStatus;
            this.totalUnrespondedCmntCountByCustomer = 0;
          }
        });
      });
    });

    this.changeDetect.detectChanges();
  }

  updateTicketId(res: any) {
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        if (singleCmnt.id == res.queryId) {
          singleCmnt.ticketId = res.ticketId;
        }
      });
    });
    this.changeDetect.detectChanges();
  }

  // applySentimentListner(res: any) {

  //   this.groupArrays.forEach((cmnt: any) => {
  //     cmnt.items.forEach((singleCmnt: any) => {
  //       if (singleCmnt.id == res.feedId) {
  //         singleCmnt.sentiment = res;
  //       }
  //     });
  //   });
  //   this.changeDetect.detectChanges();
  // }

  onScrollComments() {
    if (this.TotalCmntQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getSmsData();
    }
  
  }

  closeQuickResponseSidebar(){
    this.quickReplySearchText = '';
    if(this.radioInput != undefined){
              this.radioInput.nativeElement.checked = false;
            }
    
  }
  updateQueryStatusDataListener() {
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        if (singleCmnt.id == this.queryStatus.queryId) {
          singleCmnt.queryStatus = this.queryStatus.queryStatus;
          singleCmnt.isLikedByAdmin = this.queryStatus.isLikes;
        }
      });
    });
    this.changeDetect.detectChanges();
  }
  replyDataListener(res:any) {
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        if (singleCmnt.id == res.commentId) {
          singleCmnt.replies.push(res);
          singleCmnt.queryStatus = res.queryStatus;
        }
      });
    });
    this.changeDetect.detectChanges();
  }

  handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitSmsReply();
    }
  }

  }
