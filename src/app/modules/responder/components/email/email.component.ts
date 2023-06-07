import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
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
  @ViewChild('fileInput') fileInput!: ElementRef;

  @Input() name: string = '';
  @Input() subname: string = '';
  @Input() imagename: string = '';
  @Input() linkname: string = 'javascript:;';

  Emails: any;

  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  parentPlatform = this.fetchId.platform;

  pageNumber: any = 1;
  pageSize: any = 10;
  newReply: any;

  filterDto = new FiltersDto();

  show = false;
  isOpen = false;
  active = false;
  expandedEmailBody: boolean = false;
  activeTag = false;
  TodayDate: any;
  queryStatus: any;

  spinner1running = false;
  spinner2running = false;

  public Subscription!: Subscription;
  public criteria!: SortCriteria;
  searchText: string = '';

  emailReplyForm!: FormGroup;
  constructor(
    private fetchId: FetchIdService,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService: UpdateCommentsService,
    private queryStatusService: QueryStatusService,
    private replyService: ReplyService,
    private unrespondedCountService: UnRespondedCountService
  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
      this.id = null;
      this.id = res;
      this.getEmails();
    });

    this.emailReplyForm = new FormGroup({
      text: new FormControl(''),
      commentId: new FormControl(0),
      teamId: new FormControl(0),
      platform: new FormControl(''),
      contentType: new FormControl(''),
      to: new FormControl(''),
      cc: new FormControl(''),
      bcc: new FormControl(''),
      subject: new FormControl(''),
      profileId: new FormControl(''),
      profilePageId: new FormControl(''),
      userProfileId: new FormControl(0),
    });
  }

  ngOnInit(): void {
    this.fullName = localStorage.getItem('storeOpenedId') || '{}';

    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
    this.TodayDate = new Date();

    this.getEmails();
    this.getTagList();

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
      this.newReply = res;
      this.replyDataListner();
    });
    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        if (
          res.contentCount.contentType == 'Mail' ||
          res.contentCount.contentType == 'OMail'
        ) {
          this.totalUnrespondedCmntCountByCustomer =
            res.contentCount.unrespondedCount;
        }
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
        this.Emails.forEach((item: any) => {
          this.commentsArray = [];
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
        });
        this.totalUnrespondedCmntCountByCustomer =
          this.totalUnrespondedCmntCountByCustomer + 1;
      }
    });
    this.changeDetect.detectChanges();
  }

  To: string = '';
  totalUnrespondedCmntCountByCustomer: number = 0;

  commentsArray: any[] = [];
  groupArrays: any[] = [];
  fullName: string = '';
  replyAttachments: any[] = [];

  getEmails() {
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: this.parentPlatform,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
      };

      this.SpinnerService.show();
      this.spinner1running = true;
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.spinner1running = false;
          this.Emails = res.List;
          this.fullName = this.Emails[0].user.userName.split('<')[0];
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

          this.Emails.forEach((cmnt: any) => {
            cmnt.comments.forEach((reply: any) => {
              reply.replies.forEach((attachment: any) => {
                if (attachment.attachmentUrl !== '') {
                  const abc = attachment.attachmentUrl.split(',');
                  abc.forEach((xyz: any) => {
                    this.replyAttachments.push(xyz);
                  });
                }
              });
            });
          });

          this.commentsArray = [];
          this.Emails?.forEach((item: any) => {
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
            //     item['groupedComments'] = this.groupArrays;
            // console.log('hello', this.Emails);
          });

          this.Emails?.forEach((msg: any) => {
            this.To = msg?.comments[0]?.to[0]?.emailAddress;
          });
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: this.parentPlatform,
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false,
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.Emails = res.List;
        this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

        this.Emails.forEach((cmnt: any) => {
          cmnt.comments.forEach((reply: any) => {
            reply.replies.forEach((attachment: any) => {
              if (attachment.attachmentUrl !== '') {
                const abc = attachment.attachmentUrl.split(',');
                abc.forEach((xyz: any) => {
                  this.replyAttachments.push(xyz);
                });
              }
            });
          });
        });

        this.commentsArray = [];
        this.Emails?.forEach((item: any) => {
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
          //     item['groupedComments'] = this.groupArrays;
          // console.log('hello', this.Emails);
        });

        this.Emails?.forEach((msg: any) => {
          this.To = msg?.comments[0]?.to[0]?.emailAddress;
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
      };

      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.Emails = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

          this.Emails.forEach((cmnt: any) => {
            cmnt.comments.forEach((reply: any) => {
              reply.replies.forEach((attachment: any) => {
                if (attachment.attachmentUrl !== '') {
                  const abc = attachment.attachmentUrl.split(',');
                  abc.forEach((xyz: any) => {
                    this.replyAttachments.push(xyz);
                  });
                }
              });
            });
          });

          this.commentsArray = [];
          this.Emails?.forEach((item: any) => {
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
            //     item['groupedComments'] = this.groupArrays;
            // console.log('hello', this.Emails);
          });

          this.Emails?.forEach((msg: any) => {
            this.To = msg?.comments[0]?.to[0]?.emailAddress;
          });
        });
    }
  }
  expandEmailBody() {
    this.expandedEmailBody = !this.expandedEmailBody;
  }

  markRead: boolean = false;
  opened: boolean = false;
  replyId: any[] = [];
  emailId: any;
  selectedIndex: any;

  openEmail(id: any) {
    this.Emails.forEach((xyz: any) => {
      xyz.comments.forEach((email: any) => {
        if (email.id == id) {
          this.emailId = email.id;
          this.opened = true;
          this.markRead = !this.markRead;
        }
        email.replies.forEach((reply: any) => {
          if (reply.id == id) {
            if (this.replyId.includes(id)) {
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

    if (this.selectedIndex === id) {
      this.selectedIndex = 'collapsed unread';
    } else {
      this.selectedIndex = '';
    }
  }

  insertTagsForFeedDto = new InsertTagsForFeedDto();
  checkTag = false;

  insertTags(id: any, comId: any, feedType: any) {
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = feedType;
    this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.Emails.forEach((abc: any) => {
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
              this.removeTag(id, comId, feedType);
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
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  appliedSentiment: string = '';

  insertSentiment(feedId: any, sentimenName: any, type: any) {
    this.insertSentimentForFeedDto.feedId = feedId.toString();
    this.insertSentimentForFeedDto.sentiment = sentimenName;
    this.insertSentimentForFeedDto.feedType = type;
    this.insertSentimentForFeedDto.userId = Number(
      localStorage.getItem('agentId')
    );

    this.commondata
      .InsertSentiment(this.insertSentimentForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
        this.appliedSentiment = sentimenName;
      });
  }

  removeTag(id: any, comId: any, feedType: any) {
    this.insertTagsForFeedDto.feedId = comId.toString();
    this.insertTagsForFeedDto.tagId = id;
    this.insertTagsForFeedDto.feedType = feedType;
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

  TagsList: any;
  Keywords: any[] = [];

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

  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }

  replyDto = new ReplyDto();

  agentId: string = '';
  platform: string = '';
  postType: string = '';
  emailTo: any;
  emailCc: string = '';
  emailBcc: string = '';
  emailSubject: string = '';
  emailFrom: string = '';

  emailCcArray: any[] = [];

  sendEmailInformation(id: any) {
    this.Emails.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == id) {
          // populate comment data

          this.emailId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.emailTo = comment.to;
          this.emailBcc = comment.bcc;
          this.emailSubject = comment.message;
          this.emailFrom = comment.userName.split(/[<>]/)[1];
          if (comment.cc){
            comment.cc?.forEach((item: any) => {
              if (!this.emailCcArray.includes(item.emailAddress)) {
                this.emailCcArray.push(item.emailAddress);
              } 
              this.emailCc = this.emailCcArray.toString();
            });
          } else {
            this.emailCc = "";
          }
          
        }
      });
    });
  }

  ImageName: any;
  ImageArray: any[] = [];
  submitEmailReply() {
    debugger;
    if (
      !this.emailReplyForm.get('to')?.dirty ||
      !this.emailReplyForm.get('cc')?.dirty ||
      !this.emailReplyForm.get('bcc')?.dirty ||
      !this.emailReplyForm.get('subject')?.dirty
    ) {
      if (!this.emailReplyForm.get('to')?.dirty) {
        this.emailReplyForm.patchValue({
          to: this.emailFrom,
        });
      }
      if (!this.emailReplyForm.get('cc')?.dirty) {
        if (this.emailCc.length > 0) {
          this.emailReplyForm.patchValue({
            cc: this.emailCc,
          });
        }
      }
      if (!this.emailReplyForm.get('bcc')?.dirty) {
        this.emailReplyForm.patchValue({
          bcc: this.emailBcc,
        });
      }
      if (!this.emailReplyForm.get('subject')?.dirty) {
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
      teamId: this.agentId,
      platform: this.platform,
      contentType: this.postType,
    });

    formData.append('CommentReply', JSON.stringify(this.emailReplyForm.value));
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.reloadComponent('comment');
        this.emailReplyForm.reset();
        this.closeReplyModal();
      },
      ({ error }) => {
        //  alert(error.message);
      }
    );
  }
  onFileChanged() {
    if (this.fileInput.nativeElement.files.length > 0) {
      this.isAttachment = true;

      const filesArray = Array.from(this.fileInput.nativeElement.files);
      filesArray.forEach((attachment: any) => {
        this.ImageArray.push(attachment);
      });
      const files = this.ImageArray.map((file: any) => file); // Create a new array with the remaining files
      const newFileList = new DataTransfer();
      files.forEach((file: any) => newFileList.items.add(file)); // Add the files to a new DataTransfer object
      this.ImageName = newFileList.files;
    }
  }


  clearInputField() {
    this.emailCcArray = [];
    this.emailCc = '';
    this.show = false;
    this.emailId = '';
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.emailTo = '';
    this.emailBcc = '';
    this.emailSubject = '';
    this.fileInput.nativeElement.value = '';
    this.detectChanges();
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
  storeComId: any;

  showCcBtn: boolean = true;
  showBccBtn: boolean = true;
  showCcInput: boolean = false;
  showBccInput: boolean = false;

  OpenCc() {
    this.showCcBtn = false;
    this.showCcInput = true;
  }
  OpenBcc() {
    this.showBccBtn = false;
    this.showBccInput = true;
  }
  closeReplyModal() {
    this.showCcBtn = true;
    this.showBccBtn = true;
    this.showCcInput = false;
    this.showBccInput = false;
  }

  expandReply() {}
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

  commentStatus(comId: any, type: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = this.parentPlatform;
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {});
  }

  queryCompleted(comId: any, type: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = this.parentPlatform;
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }
  markAsComplete = false;

  markAsCompleteExpanded(comId: any) {
    this.Emails.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          this.markAsComplete = !this.markAsComplete;
        }
      });
    });
  }

  addTags: any;
  removeTags: any;

  addTagDataListner() {
    this.Emails.forEach((post: any) => {
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
    this.Emails.forEach((post: any) => {
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
    this.Emails.forEach((post: any) => {
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

  updateBulkQueryStatusDataListner() {
    this.Emails.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          this.queryStatus.forEach((qs: any) => {
            if (singleCmnt.id == qs.queryId) {
              singleCmnt.queryStatus = qs.queryStatus;
              this.totalUnrespondedCmntCountByCustomer = 0;
            }
          });
        });
      });
    });
    this.changeDetect.detectChanges();
  }

  replyDataListner() {
    this.Emails.forEach((post: any) => {
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
    if (this.totalUnrespondedCmntCountByCustomer > 10) {
      this.pageSize = this.pageSize + 10;
      this.getEmails();
    }
  }

  isAttachment = false;

  removeAttachedFile(index: any) {
    const filesArray = Array.from(this.ImageName);
    filesArray.splice(index, 1);
    this.ImageArray.splice(index, 1);

    const files = filesArray.map((file: any) => file); // Create a new array with the remaining files
    const newFileList = new DataTransfer();
    files.forEach((file) => newFileList.items.add(file)); // Add the files to a new DataTransfer object

    this.fileInput.nativeElement.files = newFileList.files;
    this.detectChanges();

    if (this.ImageName.length == 0) {
      this.isAttachment = false;
    }
  }

  detectChanges(): void {
    debugger;
    this.ImageName = this.fileInput.nativeElement.files;
  }
  trimText(text: string): string {
    if (text.length < 50) {
      return text;
    } else {
      return text.slice(0, 1000) + '...';
    }
    console.log(text);
  }

  download(url: string, name: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log(url);
  }

  isImage(attachment: any): boolean {
    return attachment.contentType.startsWith('image/');
  }

  isVideo(attachment: any): boolean {
    return attachment.contentType.startsWith('video/');
  }

  isAudio(attachment: any): boolean {
    return attachment.contentType.startsWith('audio/');
  }

  isOther(attachment: any): boolean {
    return (
      !this.isImage(attachment) &&
      !this.isVideo(attachment) &&
      !this.isAudio(attachment)
    );
  }

  // isReplyImage(attachment: any): boolean {
  //   const abc = attachment.split('.')
  //   const index = abc.length - 1
  //   const type = abc[index]
  //   if(type == 'jpeg'){
  //     return attachment;
  //   }
  //   if(type == 'jpg'){
  //     return attachment;
  //   }
  //   if(type == 'png'){
  //     return attachment;
  //   }
  //   if(type == 'gif'){
  //     return attachment;
  //   } else {
  //     return false;
  //   }
  //   // return type == 'image' || type == 'jpeg' || type == 'png' || type == 'gif' || type == 'jpg';
  // }

  // isReplyVideo(attachment: any): boolean {

  //   const abc = attachment.split('.')
  //   const index = abc.length - 1
  //   const type = abc[index]
  //   if(type == 'mp4'){
  //     return attachment;
  //   } else {
  //     return false;
  //   }
  // }

  // isReplyAudio(attachment: any): boolean {

  //   const abc = attachment.split('.')
  //   const index = abc.length - 1
  //   const type = abc[index]
  //   if(type == 'mp3'){
  //     return attachment;
  //   } else {
  //     return false;
  //   }
  // }

  // isReplyOther(attachment: any): boolean {
  //   const abc = attachment.split('.')
  //   const index = abc.length - 1
  //   const type = abc[index]
  //   if(type != 'mp3' && type != 'mp4' && type != 'jpeg' && type != 'jpg' && type != 'png' && type != 'gif'){
  //     return attachment;
  //   } else {
  //     return false;
  //   }
  // }
}
