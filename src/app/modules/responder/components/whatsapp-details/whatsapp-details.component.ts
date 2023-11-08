import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-whatsapp-details',
  templateUrl: './whatsapp-details.component.html',
  styleUrls: ['./whatsapp-details.component.scss'],
})
export class WhatsappDetailsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('radioInput', { static: false })
  radioInput!: ElementRef<HTMLInputElement>;
  id = this.fetchId.id;
  slaId = this.fetchId.getSlaId();

  show = false;
  isOpen = false;
  active = false;
  toastermessage = false;
  querryCompleted = false;
  activeTag = false;
  checkTag = false;
  quickReplySearchText: string = '';
  queryType = this.getQueryTypeService.getQueryType();

  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  filterDto = new FiltersDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();
  commentStatusDto = new CommentStatusDto();
  ReplyDto = new ReplyDto();

  AlterMsg: any = '';
  WhatsappData: any;
  senderId: string = '';
  totalUnrespondedCmntCountByCustomer: number = 0;
  TagsList: any[] = [];
  getAppliedTagsList: any;
  QuickReplies: any;
  storeComId: any;
  WhatsappMsgId: number = 0;
  agentId: string = '';
  platform: string = '';
  postType: string = '';
  WhatsappMsgText: string = '';
  WhatsappMsgReply: string = '';
  ImageName: any;
  ImageArray: any[] = [];
  Keywords: any[] = [];
  TodayDate: any;
  queryStatus: any;
  newReply: any;
  searchText: string = '';
  spinner1running = false;
  spinner2running = false;

  pageNumber: number = 1;
  pageSize: number = 10;

  profileId: number = 0;
  TotalCmntQueryCount: number = 0;

  public Subscription!: Subscription;
  public criteria!: SortCriteria;

  flag: string = '';

  constructor(
    private fetchId: FetchIdService,
    private SpinnerService: NgxSpinnerService,
    private commondata: CommonDataService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService: UpdateCommentsService,
    private queryStatusService: QueryStatusService,
    private replyService: ReplyService,
    private createTicketService: CreateTicketService,
    private toggleService: ToggleService,
    private ticketResponseService: TicketResponseService,
    private applySentimentService: ApplySentimentService,
    private getQueryTypeService: GetQueryTypeService,
    private unrespondedCountService: UnRespondedCountService,
    private router: Router,
    private userInfoService: UserInformationService,
    private stor: StorageService
  ) {
    // this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
    //   this.id = res;
    //   this.getWhatsappData();
    // });
  }
  handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitWhatsappReply();
    }
  }
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
    const numberOfLines = Math.floor(textarea.scrollHeight / lineHeight);
    const newHeight = numberOfLines < 3 ? `${numberOfLines}em` : '96px';
    textarea.style.height = newHeight;
    textarea.style.overflow = numberOfLines > 4 ? 'auto' : 'hidden';
    if (textarea.value.trim() === '') {
      textarea.style.height = '40px';
    }
  }


  messagesStatus: any[] = [];
  Sentiments: any[] = [];
  ngOnInit(): void {
    const menu = this.stor.retrive('Tags', 'O').local;
    menu.forEach((item: any) => {
      if (item.name == 'Tags') {
        item.subTags.forEach((singleTagObj: any) => {
          if (!this.TagsList.includes(singleTagObj)) {
            this.TagsList.push(singleTagObj);
          }
        });
      }
      if (item.name == 'Messages Status') {
        item.subTags.forEach((messagesStatusObj: any) => {
          if (!this.messagesStatus.includes(messagesStatusObj)) {
            this.messagesStatus.push(messagesStatusObj);
          }
        });
      }
      if (item.name == 'Sentiments') {
        item.subTags.forEach((sentimentObj: any) => {
          if (!this.Sentiments.includes(sentimentObj)) {
            this.Sentiments.push(sentimentObj);
          }
        });
      }
    });
    this.flag = this.router.url.split('/')[2];
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
    this.TodayDate = new Date();

    this.getWhatsappData();
    // this.getTagList();
    this.quickReplyList();

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
      .receiveQueryStatus()
      .subscribe((res) => {
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
          if (res.contentCount.contentType == 'WM') {
            this.totalUnrespondedCmntCountByCustomer =
              res.contentCount.unrespondedCount;
          }
        }
      });
    // this.Subscription = this.queryStatusService.receiveQueryStatus().subscribe((res) => {
    //   this.updateMessageStatusDataListner(res);
    // });
  }

  commentDto = new commentsDto();
  updatedComments: any;
  updateCommentsDataListener() {
    if (this.flag == 'focused' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
      if (!this.id) {
        this.id = localStorage.getItem('storeOpenedId') || '{}';
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
            // fromId: xyz.fromId,
            // fromName: xyz.fromName,
            // fromProfilePic: xyz.fromProfilePic,
            // toId: xyz.toId,
            // toName: xyz.toName,
            // msgText: xyz.msgText,
            // agentId: xyz.agentId,
            // customerSocailProfileId: xyz.agentId,
            // profileId: xyz.profileId,
            // profilePageId: xyz.profilePageId,
          };
          this.WhatsappData[0].comments.push(this.commentDto);
          this.commentsArray.push(this.commentDto);

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
          // // console.log('hello', this.groupArrays);
          this.totalUnrespondedCmntCountByCustomer =
            this.totalUnrespondedCmntCountByCustomer + 1;
        }
      });
      this.changeDetect.detectChanges();
    }
  }

  commentsArray: any[] = [];
  groupArrays: any[] = [];

  getWhatsappData() {
    this.flag = this.router.url.split('/')[2];
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
        isAttachment: false,
        queryType: this.queryType,
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.spinner1running = false;
            this.WhatsappData = res.List;
            this.userInfoService.shareUserInformation(res.List[0].user);
            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            this.TotalCmntQueryCount = res.TotalQueryCount;

            this.WhatsappData?.forEach((msg: any) => {
              this.senderId = msg.comments[0].sendTo;
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

              this.groupArrays = Object.keys(groupedItems).map(
                (createdDate) => {
                  return {
                    createdDate,
                    items: groupedItems[createdDate],
                  };
                }
              );
              // // console.log('hello', this.groupArrays);
            });
          }
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
        isAttachment: false,
        queryType: this.queryType,
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
      };
      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.WhatsappData = res.List;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.TotalCmntQueryCount = res.TotalQueryCount;

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
            // // console.log('hello', this.groupArrays);
          });

          this.WhatsappData.forEach((msg: any) => {
            this.senderId = msg.comments[0].sendTo;
          });
        }
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
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
      };
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.WhatsappData = res.List;
            this.userInfoService.shareUserInformation(res.List[0].user);
            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            this.TotalCmntQueryCount = res.TotalQueryCount;

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

              this.groupArrays = Object.keys(groupedItems).map(
                (createdDate) => {
                  return {
                    createdDate,
                    items: groupedItems[createdDate],
                  };
                }
              );
              // // console.log('hello', this.groupArrays);
            });

            this.WhatsappData.forEach((msg: any) => {
              this.senderId = msg.comments[0].sendTo;
            });
          }
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
      });
    });
  }

  insertTagsForFeed(comId: number, tagName: string) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = tagName;
    this.insertTagsForFeedDto.type = 'Tag';
    this.insertTagsForFeedDto.platform = 'WhatsApp';

    this.WhatsappData?.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          if (comment.tags.length == 0) {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
              });
          } else if (comment.tags.length > 0) {
            const value = comment.tags.find((x: any) => x.name == tagName);
            if (value != null || value != undefined) {
              this.removeTagFromFeed(comId, tagName);
            } else {
              this.commondata
                .InsertTag(this.insertTagsForFeedDto)
                .subscribe((res: any) => {
                  this.reloadComponent('ApplyTag');
                });
            }
          }
        }
      });
    });
  }

  removeTagFromFeed(feedId: number, tagName: any) {
    if (this.flag == 'focused' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
      this.insertTagsForFeedDto.tagName = tagName;
      this.insertTagsForFeedDto.feedId = feedId;
      this.insertTagsForFeedDto.type = 'Tag';
      this.insertTagsForFeedDto.platform = 'WhatsApp';

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');
        });
    }
  }

  reloadComponent(type: any) {
    if (type == 'Attachments') {
      this.AlterMsg = 'File size must be less than 4MB';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'spam') {
      this.AlterMsg = 'Message has been marked as spam!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'removeSpam') {
      this.AlterMsg = 'Message has been removed from spam items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'starred') {
      this.AlterMsg = 'Profile(s) has been marked as starred!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'removeStarred') {
      this.AlterMsg = 'Profile(s) has been removed from starred items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'both-text-and-attachment-added') {
      this.AlterMsg = 'Text and Attachment cannot be sent at the same time';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
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
    if (type == 'message') {
      this.AlterMsg = 'Message Sent Successfully!';
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

  insertSentimentForFeed(comId: number, sentimenName: any) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = sentimenName;
    this.insertTagsForFeedDto.type = 'Sentiment';
    this.insertTagsForFeedDto.platform = 'WhatsApp';

    this.commondata
      .InsertSentiment(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
  }

  // abc :any;
  textWithHtmlTags: any;
  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);
    this.text = abc?.text + ' ';
    this.insertAtCaret(this.text);
  }

  sendHardCodedQuickReply(value: any) {
    let counter = 1;
    var abc = { id: 0, text: '' };
    this.QuickRepliesHardCoded.forEach((qr: any) => {
      abc = qr.Message.find((msg: any) => msg.id == value);
      if (abc != undefined) {
        this.textWithHtmlTags = abc?.text + ' ';
        this.text = abc?.text
          .replace(/<\/p>/g, '\n') // Replace </p> with line breaks
          .replace(/<\/ul>/g, '\n') // Replace </ul> with line breaks
          .replace(/<\/ol>/g, '\n') // Replace </ol> with line breaks
          .replace(/<\/li>/g, '\n') // Replace </li> with line breaks and bullets
          .replace(/<li[^>]*>/g, () => {
            // Replace <ol> opening tags with numbers
            return '\n' + counter++ + '. ';
          })
          .replace(/<ul[^>]*>/g, '\n') // Remove <ul> opening tags
          .replace(/<\/[ou]l>/g, '') // Remove </ul> and </ol> closing tags
          .replace(/<\/?[^>]+(>|$)/g, ''); // Remove other HTML tags
      }
    });
    this.insertAtCaret(this.text);
  }

  quickReplyList() {
    // this.commondata.QuickReplyList().subscribe((res: any) => {
    //   this.QuickReplies = res;
    // });
  }

  QuickRepliesHardCoded = [
    {
      value: 1,
      text: 'Auto Response/Privacy acknowledgement',
      Message: [
        {
          id: 100,
          text: '<p>Dear Consumer, Welcome to Morinaga Pakistan. One of our representatives will be in touch with you soon.</p><p>Before proceeding, please confirm that you have read the Privacy Policy and accept the use of your personal data by Morinaga.</p>',
        },
      ],
    },
    {
      value: 2,
      text: 'Opening Greeting',
      Message: [
        {
          id: 101,
          text: 'Hello, Thank you for reaching out to us. How may I help you?',
        },
      ],
    },
    {
      value: 3,
      text: 'Help/Assist',
      Message: [
        {
          id: 102,
          text: "I'm here to assist you with any questions or issues you may have",
        },
      ],
    },
    {
      value: 4,
      text: 'Elaboration Concerns',
      Message: [
        {
          id: 103,
          text: 'Great question! Could you please elaborate a bit more for me to understand better?',
        },
        {
          id: 104,
          text: '<p>Could you please share your details?</p><p>Leave the rest to me.</p>',
        },
        {
          id: 105,
          text: "Please share your Phone number and I'll have this looked into.",
        },
        {
          id: 106,
          text: 'Please share your complaint number, so I can check your status.',
        },
      ],
    },
    {
      value: 5,
      text: 'Apologies',
      Message: [
        {
          id: 107,
          text: "We're sorry for the inconvenience, we assure you that we'll have this looked into immediately!",
        },
        {
          id: 108,
          text: 'We apologize for the inconvenience. To keep our customers satisfied, Morinaga Pakistan offers its best services, since we care a lot for our Consumer/Retailers. This time we are unable to fulfill your expectations, for which we feel so bad. Please give us another chance to make your experience better.',
        },
      ],
    },
    {
      value: 6,
      text: 'Ending Greeting',
      Message: [
        {
          id: 109,
          text: "Sincerely, thank you for your time and consideration. If you need any further assistance, please don't hesitate to contact us.",
        },
        {
          id: 110,
          text: 'Best regards, Fahad. If you have any more questions or require additional help, feel free to reach out at any time',
        },
      ],
    },
    {
      value: 7,
      text: 'Due Response/Idle Time',
      Message: [
        {
          id: 111,
          text: ' I  haven’t received any response from your end, if you are still available then please respond to us so we can proceed further.',
        },
      ],
    },
    {
      value: 8,
      text: 'Idle Ending  Greeting ',
      Message: [
        {
          id: 112,
          text: ' With apologies, haven’t received any response from your end. Still if you have any query, response us back, we are here for you. Our operational timings are 10:00 am to 06:00 pm ',
        },
      ],
    },
    {
      value: 9,
      text: 'Further questions',
      Message: [
        {
          id: 113,
          text: ' Feel free to share any further concerns, I d be glad to assist',
        },
      ],
    },
    {
      value: 10,
      text: 'Hold (1st attempt) ',
      Message: [
        {
          id: 114,
          text: 'Would you mind if I put you on hold for some time so that I can work on your request?',
        },
      ],
    },
    {
      value: 11,
      text: 'Hold (2nd attempt)',
      Message: [
        {
          id: 115,
          text: 'Can I please request you to hold for some more time as I am still working on your request to provide you with an appropriate answer?',
        },
      ],
    },
    {
      value: 12,
      text: ' Resuming from Hold',
      Message: [
        {
          id: 116,
          text: ' Thank you for waiting (and then representative will continue with the resolution).',
        },
      ],
    },
    {
      value: 13,
      text: 'Thank',
      Message: [
        {
          id: 117,
          text: 'Thank you for contacting us, it was great talking to you. Wish you an amazing day.',
        },
      ],
    },
    {
      value: 14,
      text: 'Take care',
      Message: [
        {
          id: 118,
          text: 'Thanks for being an awesome consumer and it was nice talking to you. Have an awesome day!',
        },
      ],
    },
    {
      value: 15,
      text: 'Complainant Acknowledgement for Call/Chat',
      Message: [
        {
          id: 119,
          text: 'We regret any inconvenience caused. Would you prefer to register your complaint via chat or by making a phone call?',
        },
      ],
    },
    {
      value: 16,
      text: 'Complaint Details',
      Message: [
        {
          id: 120,
          text: '<p>Dear customer/retailer/consumer,<br> To proceed with your complaint, we kindly request the following details:</p><br><ol><li>Name of the complainant</li><li>Phone number</li><li>Alternate number (if any)</li><li>Complete address</li><li>City</li><li>Batch number of the product</li><li>Manufacturing date</li><li>Expiry date</li></ol><br><p>Providing us with the above information will assist us in addressing your complaint effectively and ensuring a prompt resolution.</p>',
        },
      ],
    },
    {
      value: 17,
      text: 'Complaint Registration',
      Message: [
        {
          id: 121,
          text: '<p>We have successfully registered your complaint. Your complaint number is (Complaint Number). Please be informed that the estimated turnaround time for resolving your complaint is 40 days.</p><p>If you have any further questions or need updates regarding your complaint, feel free to reach out to us..</p>',
        },
      ],
    },
    {
      value: 18,
      text: 'Complain Status In Progress',
      Message: [
        {
          id: 122,
          text: 'We would like to update you that your complaint is currently in progress, and our team is actively working on resolving it. Please stay in touch with us, as we anticipate reaching a resolution soon. Your patience throughout this process is highly appreciated',
        },
      ],
    },
    {
      value: 19,
      text: 'Complain Status In Closed',
      Message: [
        {
          id: 123,
          text: '<p>We would like to inform you that your complaint has been closed. The resolution provided for your complaint is as follows:</p><p>(Type the resolution as per the closed complaint)</p>',
        },
      ],
    },
    {
      value: 20,
      text: 'Contact Us Again',
      Message: [
        {
          id: 124,
          text: 'Dear customer you may call us Monday to Saturday between 10:00 am to 06:00pm on our toll free number 0800- 68874 or you can also connect with us on Wahtsapp (0800- 68874).',
        },
      ],
    },
    // {value:21, text:'', Message: [{id:125,text:""}]},
    // {value:22, text:'', Message: [{id:126,text:""}]},
    // {value:23, text:'', Message: [{id:127,text:""}]},
  ];

  activeDropdown: number | null = null;
  openQuickReplyDropdown(index: any) {
    if (this.activeDropdown === index) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = index;
    }
  }

  whatsappStatus(comId: any, type: string) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'WhatsApp';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    // this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
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
    // this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }
  userProfileId = 0;

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
          this.profileId = Number(localStorage.getItem('profileId'));
          this.postType = comment.contentType;
          this.userProfileId = this.WhatsappData[0].user.id;
        }
      });
    });
  }

  WhatsappReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
  });

  text: string = '';
  submitWhatsappReply() {
    if (this.WhatsappMsgId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      // if (!this.WhatsappReplyForm.get('text')?.dirty) {
      if (this.text !== '') {
        this.WhatsappReplyForm.patchValue({
          text: this.text,
        });
      }
      // } else {
      //   if (this.WhatsappReplyForm.value.text) {
      //     this.WhatsappReplyForm.patchValue({
      //       to: this.WhatsappReplyForm.value.text,
      //     });
      //   }
      // }
      this.WhatsappReplyForm.patchValue({
        commentId: this.WhatsappMsgId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        userProfileId: this.userProfileId,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.WhatsappReplyForm.value)
      );
      if (
        this.WhatsappReplyForm.value.text !== '' &&
        this.WhatsappReplyForm.value.text !== null &&
        this?.ImageName?.length > 0 &&
        this.ImageName != undefined
      ) {
        this.reloadComponent('both-text-and-attachment-added');
      } else if (
        (this.WhatsappReplyForm.value.text !== '' &&
          this.WhatsappReplyForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        this.spinner1running = true;
        this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('message');
            this.WhatsappReplyForm.reset();
            this.activeDropdown = null;
            if (this.radioInput != undefined) {
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
        this.reloadComponent('empty-input-field');
      }
    }
    this.quickReplySearchText = '';
  }

  isAttachment = false;

  onFileChanged() {
    Array.from(this.fileInput.nativeElement.files).forEach((file: any) => {
      if (file.size > 4 * 1024 * 1024) {
        this.reloadComponent('Attachments');
      } else if (this.fileInput.nativeElement.files.length > 0) {
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
    });
  }

  clearInputField() {
    this.ImageArray = [];
    this.WhatsappMsgReply = '';
    this.WhatsappMsgText = '';
    this.show = false;
    this.WhatsappMsgId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.fileInput.nativeElement.value = '';
    this.detectChanges();
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
    this.ImageName = this.fileInput.nativeElement.files;
    this.text = this.textarea.nativeElement.value;
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
          if (this.addTags.type == 'Tag') {
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
          if (this.addTags.type == 'Sentiment') {
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

  updateQueryStatusDataListner() {
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
  replyDataListner() {
    this.groupArrays.forEach((cmnt: any) => {
      cmnt.items.forEach((singleCmnt: any) => {
        if (singleCmnt.id == this.newReply.commentId) {
          singleCmnt.replies.push(this.newReply);
          singleCmnt.queryStatus = this.newReply.queryStatus;
        }
      });
    });
    this.changeDetect.detectChanges();
  }
  updateBulkQueryStatusDataListner() {
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
      this.getWhatsappData();
    }
  }

  closeQuickResponseSidebar() {
    this.quickReplySearchText = '';
    this.activeDropdown = null;
    if (this.radioInput != undefined) {
      this.radioInput.nativeElement.checked = false;
    }
  }

  isImage(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('image');
  }

  isVideo(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('video');
  }

  isAudio(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('audio');
  }

  isOther(attachment: any): boolean {
    return (
      !this.isImage(attachment) &&
      !this.isVideo(attachment) &&
      !this.isAudio(attachment)
    );
  }

  c_satForm() {
    const customerId = localStorage.getItem('storeOpenedId');
    this.insertAtCaret(
      'https://waengage.enteract.live/survey/customer_satisfaction' +
        '?customerId=' +
        customerId +
        ' '
    );
  }

  c_informationForm() {
    const customerId = localStorage.getItem('storeOpenedId');
    this.insertAtCaret(
      'https://waengage.enteract.live/survey/customer_details' +
        '?customerId=' +
        customerId +
        ' '
    );
  }

  // itemsToBeUpdated: any[] = [];

  // starMessage(msgId: number, status: boolean) {
  //   this.itemsToBeUpdated = [];
  //   var obj = {
  //     channel: '',
  //     flag: 'starred',
  //     status: status,
  //     messageId: msgId,
  //     profileId: 0,
  //   };
  //   this.itemsToBeUpdated.push(obj);
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         if (status == true) {
  //           this.reloadComponent('starred');
  //         } else if (status == false) {
  //           this.reloadComponent('removeStarred');
  //         }
  //       }
  //     });
  // }

  // spam = false;

  // spamMessage(msgId: number, status: boolean, type: string) {
  //   this.itemsToBeUpdated = [];
  //   var obj = {
  //     channel: '',
  //     flag: 'spam',
  //     status: status,
  //     messageId: msgId,
  //     profileId: 0,
  //   };
  //   this.itemsToBeUpdated.push(obj);
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         if (status == true) {
  //           this.spam = true;
  //           this.whatsappStatus(msgId, type);
  //           this.reloadComponent('spam');
  //         } else if (status == false) {
  //           this.spam = false;
  //           this.reloadComponent('removeSpam');
  //         }
  //       }
  //     });
  // }
  // updateMessageStatusDataListner(res: any) {
  //   if (this.WhatsappData) {
  //     this.WhatsappData.forEach((post: any) => {
  //       post.comments.forEach((cmnt: any) => {
  //         // cmnt.items.forEach((singleCmnt: any) => {
  //           res.forEach((msgStatus: any) => {
  //             if (cmnt.id == msgStatus.messageId) {
  //               if (msgStatus.flag == 'starred') {
  //                 cmnt.starred = msgStatus.status;
  //               }
  //               if (msgStatus.flag == 'spam') {
  //                 cmnt.spam = msgStatus.status;
  //               }
  //             }
  //           });
  //         // });
  //       });
  //     });
  //   }

  //   this.changeDetect.detectChanges();
  // }
}
