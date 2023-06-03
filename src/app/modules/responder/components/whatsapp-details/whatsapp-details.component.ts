import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-whatsapp-details',
  templateUrl: './whatsapp-details.component.html',
  styleUrls: ['./whatsapp-details.component.scss'],
})
export class WhatsappDetailsComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  id = this.fetchId.id;
  slaId = this.fetchId.getSlaId();

  show = false;
  isOpen = false;
  active = false;
  toastermessage = false;
  querryCompleted = false;
  activeTag = false;
  checkTag = false;
  quickReplySearchText:string='';

  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  filterDto = new FiltersDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();
  commentStatusDto = new CommentStatusDto();
  ReplyDto = new ReplyDto();

  AlterMsg: any = '';
  WhatsappData: any;
  senderId: string = '';
  totalUnrespondedCmntCountByCustomer: number = 0;
  TagsList: any;
  getAppliedTagsList: any;
  QuickReplies: any;
  storeComId: any;
  WhatsappMsgId: number=0;
  agentId: string = '';
  platform: string = '';
  postType: string = '';
  WhatsappMsgText: string = '';
  WhatsappMsgReply: string = '';
  ImageName: any;
  ImageArray:any[]=[];
  Keywords: any[] = [];
  TodayDate: any;
  queryStatus:any;
  newReply:any;
  searchText: string='';
  spinner1running = false;
  spinner2running = false;

  pageNumber:number = 1;
  pageSize:number = 10;

  public Subscription!: Subscription;
  public criteria!: SortCriteria;

  constructor(
    private fetchId: FetchIdService,
    private SpinnerService: NgxSpinnerService,
    private commondata: CommonDataService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService: UpdateCommentsService,
    private queryStatusService : QueryStatusService,
    private replyService : ReplyService,
    private createTicketService: CreateTicketService,
    private toggleService : ToggleService,
    private ticketResponseService : TicketResponseService
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
      this.id = res;
      this.getWhatsappData();
    });
  }

  ngOnInit(): void {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
    this.TodayDate = new Date();

    this.getWhatsappData();
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
        }
        this.WhatsappData[0].comments.push(this.commentDto);
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
        // console.log('hello', this.groupArrays);
      }
    });
    this.changeDetect.detectChanges();
  }

  commentsArray: any[] = [];
  groupArrays: any[] = [];

  getWhatsappData() {
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'WhatsApp',
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
          this.WhatsappData = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

          this.WhatsappData?.forEach((msg: any) => {
            this.senderId = msg.comments[0].to;
          });

          this.commentsArray = [];
          this.WhatsappData?.forEach((item: any) => {
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
            // console.log('hello', this.groupArrays);
          });
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'WhatsApp',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false
      };
      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.WhatsappData = res.List;
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

        this.commentsArray = [];
        this.WhatsappData.forEach((item: any) => {
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
          // console.log('hello', this.groupArrays);
        });

        this.WhatsappData.forEach((msg: any) => {
          this.senderId = msg.comments[0].to;
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
      this.SpinnerService.show();
      this.commondata.GetChannelConversationDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.WhatsappData = res.List;
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

        this.commentsArray = [];
        this.WhatsappData.forEach((item: any) => {
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
          // console.log('hello', this.groupArrays);
        });

        this.WhatsappData.forEach((msg: any) => {
          this.senderId = msg.comments[0].to;
        });
      });
    }
  }

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
        // console.log('keywords==>', this.Keywords);
      });
      // console.log('TagList', this.TagsList);
    });
  }

  insertTags(id: any, comId: any) {
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'WM';
    this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.WhatsappData.forEach((abc: any) => {
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
              this.removeTag(id, comId);
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

  removeTag(id: any, comId: any) {
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = 'WM';
    this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.commondata
      .RemoveTag(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
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

  insertSentiment(feedId: any, sentimenName: any, type: any) {
    this.insertSentimentForFeedDto.feedId = feedId.toString();
    this.insertSentimentForFeedDto.sentiment = sentimenName;
    this.insertSentimentForFeedDto.feedType = type;
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

    // this.WhatsappReplyForm.patchValue({ text: this.WhatsappMsgText });
    this.insertAtCaret(this.WhatsappMsgText)
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      // console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  whatsappStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'WM';
    this.commentStatusDto.plateForm = 'WhatsApp';
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }
  queryCompleted(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'WM';
    this.commentStatusDto.plateForm = 'WhatsApp';
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }

  SendWhatsappInformation(comId: any) {
    this.WhatsappData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.WhatsappMsgId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.postType = comment.contentType;
        }
      });
    });
  }

  WhatsappReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

  text:string="";
  submitWhatsappReply() {
    if(this.WhatsappMsgId == 0){
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }
      if(this.text !== ""){
        this.WhatsappReplyForm.patchValue({
          text: this.text
        })
    }
      this.WhatsappReplyForm.patchValue({
        commentId: this.WhatsappMsgId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
      });
  
      formData.append(
        'CommentReply',
        JSON.stringify(this.WhatsappReplyForm.value)
      );
      if(this.WhatsappReplyForm.value.text !== ""){
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

  isAttachment = false;

  onFileChanged() {
    if (this.fileInput.nativeElement.files.length > 0) {
      this.isAttachment = true;

      const filesArray = Array.from(this.fileInput.nativeElement.files);
      filesArray.forEach((attachment:any) => {
        this.ImageArray.push(attachment)
      });
      const files = this.ImageArray.map((file:any) => file); // Create a new array with the remaining files
        const newFileList = new DataTransfer();
        files.forEach((file:any) => newFileList.items.add(file)); // Add the files to a new DataTransfer object
        this.ImageName = newFileList.files;
    }
  }

  clearInputField() {
    this.WhatsappReplyForm.reset();
    this.WhatsappMsgReply = '';
    this.WhatsappMsgText = '';
    this.show = false;
    this.WhatsappMsgId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.ImageName = [];
  }

  closeToaster() {
    this.toastermessage = false;
  }

  markAsComplete = false;
  markAsCompleteExpanded(comId: any) {
    this.WhatsappData.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          this.markAsComplete = !this.markAsComplete;
        }
      });
    });
  }

  removeAttachedFile(index: any) {
    const filesArray = Array.from(this.ImageName);
      filesArray.splice(index, 1);
      this.ImageArray.splice(index, 1);
      
      const files = filesArray.map((file:any) => file); // Create a new array with the remaining files
      const newFileList = new DataTransfer();
      files.forEach(file => newFileList.items.add(file)); // Add the files to a new DataTransfer object

      this.fileInput.nativeElement.files = newFileList.files; 
      this.detectChanges()

  if (this.ImageName.length == 0) {
    this.isAttachment = false;
  }
}

detectChanges(): void {
  this.ImageName = this.fileInput.nativeElement.files;
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

  addTagDataListner() {
    this.groupArrays.forEach((cmnt: any) => {
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
    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
    this.groupArrays.forEach((cmnt: any) => {
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
    this.changeDetect.detectChanges();
  }

  updateQueryStatusDataListner() {
    
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        if (singleCmnt.id == this.queryStatus.queryId) {
          singleCmnt.queryStatus = this.queryStatus.queryStatus
          singleCmnt.isLikedByAdmin = this.queryStatus.isLikes
        }
      });
    });
    this.changeDetect.detectChanges();
  }
  replyDataListner() {
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        if (singleCmnt.id == this.newReply.commentId) {
          singleCmnt.replies.push(this.newReply)
          singleCmnt.queryStatus = this.newReply.queryStatus;
        }
      });
    });
    this.changeDetect.detectChanges();
  }

  onScroll() {
    if(this.totalUnrespondedCmntCountByCustomer > 10){
      this.pageSize = this.pageSize + 10
      this.getWhatsappData();
    }
  }
  updateBulkQueryStatusDataListner() {
    
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        this.queryStatus.forEach((querry:any) => {
          if (singleCmnt.id == querry.commentId) {
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
}
