import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
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
import { CompanyidService } from 'src/app/services/companyidService/companyid.service';
import { isArray } from 'lodash';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { RulesGroupIdsService } from 'src/app/services/RulesGroupIds/rules-group-ids.service';
@Component({
  selector: 'app-whatsapp-details',
  templateUrl: './whatsapp-details.component.html',
  styleUrls: ['./whatsapp-details.component.scss'],
})
export class WhatsappDetailsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('radioInput', { static: false })
  radioInput!: ElementRef<HTMLInputElement>;
  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement) {
    this.adjustTextareaHeight(textarea);
  }

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
  // QuickReplies: any;
  quickRepliesList: any;
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
  userInformation: any;

  pageNumber: number = 1;
  pageSize: number = 10;

  profileId: number = 0;
  TotalCmntQueryCount: number = 0;

  public Subscription!: Subscription;
  public criteria!: SortCriteria;

  flag: string = '';
  WhatsappReplyForm!: FormGroup;
  // text: string = 'Welcome to Muawin Total Parco. This is '+localStorage.getItem('agentName')+' from Muawin. How may I help you?';
  text: string = '';

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
    private stor: StorageService,
    private el: ElementRef,
    private renderer: Renderer2,
    private companyidServices: CompanyidService,
    private getWing : GetWingsService,
    private getRulesGroupIdsService: RulesGroupIdsService
  ) {
    // this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
    //   this.id = res;
    //   this.getWhatsappData();
    // });

    this.WhatsappReplyForm = new FormGroup({
      // text: new FormControl(this.ReplyDto.text, Validators.required),
      text: new FormControl(
        'Welcome to Muawin Total Parco. This is ' +
          localStorage.getItem('agentName') +
          ' from Muawin. How may I help you?',
        Validators.required
      ),
      commentId: new FormControl(this.ReplyDto.commentId),
      teamId: new FormControl(this.ReplyDto.teamId),
      platform: new FormControl(this.ReplyDto.platform),
      profileId: new FormControl(this.ReplyDto.profileId),
      contentType: new FormControl(this.ReplyDto.contentType),
      userProfileId: new FormControl(this.ReplyDto.userProfileId),
      responseByName: new FormControl(this.ReplyDto.responseByName),
    });
  }
  handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitWhatsappReply();
    }
  }
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  messagesStatus: any[] = [];
  Sentiments: any[] = [];
  activeBaseUrl: any;
  KEbaseUrl: string = '';
  KEClient: boolean = false;

  ngOnInit(): void {
    this.KEbaseUrl = window.location.origin;
    this.activeBaseUrl = window.location.origin;
    if (this.KEbaseUrl == 'https://keportal.enteract.live') {
      this.KEClient = true;
    }

    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    this.renderer.addClass(textarea, 'auto-resize');
    this.adjustTextareaHeight(textarea);

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
    // this.quickReplyList();
    this.quickRepliesGeneric();

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
        this.updateQueryStatusDataListener();
      });
    this.Subscription = this.replyService.receiveReply().subscribe((res) => {
      this.newReply = res;
      this.replyDataListener();
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
        var assignedProfileId = Number(localStorage.getItem('assignedProfile'));
        if (
          this.flag == 'focused' ||
          this.flag == 'assigned_to_me' ||
          this.flag == 'follow_up'
        ) {
          if (res.contentCount.profileId == assignedProfileId) {
            if (res.contentCount.contentType == 'WM') {
              this.totalUnrespondedCmntCountByCustomer =
                res.contentCount.unrespondedCount;
            }
          }
        }
      });
    // this.Subscription = this.queryStatusService.receiveQueryStatus().subscribe((res) => {
    //   this.updateMessageStatusDataListener(res);
    // });
  }

  commentDto = new commentsDto();
  updatedComments: any;
  updateCommentsDataListener() {
    if (
      this.flag == 'focused' ||
      this.flag == 'assigned_to_me' ||
      this.flag == 'follow_up'
    ) {
      if (!this.id) {
        this.id = localStorage.getItem('storeOpenedId') || '{}';
      }
      this.updatedComments.forEach((xyz: any) => {
        if (this.id == xyz.userId) {
          this.commentDto = {
            id: xyz.id,
                wings: xyz.wings,
                postId: xyz.post.postId,
                commentId: xyz.commentId,
                message: xyz.message,
                contentType: xyz.contentType,
                userName: xyz.userName || xyz.userId,
                queryStatus: xyz.queryStatus,
                createdDate: xyz.createdDate,
                insertionDate: xyz.insertionDate,
                ticketId: xyz.ticketId,
                fromUserProfilePic: xyz.fromUserProfilePic,
                body: xyz.body,
                sentimentValue: xyz.sentimentValue,
                language: xyz.language,
                isHide: xyz.isHide,
                isLikedByAdmin: xyz.isLikedByAdmin,
                channelId: xyz.channelId,
                conversationId: xyz.conversationId,
                attachmentUrl: xyz.attachmentUrl,
                attachmentType: xyz.attachmentType,
                sendTo: xyz.sendTo,
                unrespondedCount: xyz.unrespondedCount,
                attachments: xyz.attachments,
                replies: xyz.replies,
                sentiment: xyz.sentiment,
                tags: xyz.tags,
                to: xyz.to,
                cc: xyz.cc,
                bcc: xyz.bcc,
                dispositions: xyz.dispositions,
                signalRGroupName: xyz.signalRGroupName,
          };
          this.WhatsappData[0].comments.push(this.commentDto);
          this.commentsArray.push(this.commentDto);

          let groupedItems = this.commentsArray.reduce(
            (acc: any, item: any) => {
              const date = item.createdDate?.split('T')[0];
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
        hasBlueTick: false,
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
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
            this.userInformation = res.List[0].user;
            this.userInfoService.shareUserInformation(res.List[0].user);
            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            this.TotalCmntQueryCount = res.TotalQueryCount;
            localStorage.setItem('lastQueryId',this.WhatsappData[0].id)

            this.WhatsappData?.forEach((msg: any) => {
              this.senderId = msg.comments[0].sendTo;
              localStorage.setItem('senderId', this.senderId);
            });

            this.commentsArray = [];
            this.WhatsappData?.forEach((item: any) => {
              item.comments.forEach((cmnt: any) => {
                this.commentsArray.push(cmnt);
              });
              let groupedItems = this.commentsArray.reduce(
                (acc: any, item: any) => {
                  const date = item.createdDate?.split('T')[0];
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
        hasBlueTick: false,
        queryType: this.queryType,
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };
      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.WhatsappData = res.List;
          this.userInformation = res.List[0].user;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.TotalCmntQueryCount = res.TotalQueryCount;
          localStorage.setItem('lastQueryId',this.WhatsappData[0].id)

          this.commentsArray = [];
          this.WhatsappData.forEach((item: any) => {
            item.comments.forEach((cmnt: any) => {
              this.commentsArray.push(cmnt);
            });
            let groupedItems = this.commentsArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate?.split('T')[0];
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
        hasBlueTick: false,
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.WhatsappData = res.List;
            this.userInformation = res.List[0].user;
            this.userInfoService.shareUserInformation(res.List[0].user);
            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            this.TotalCmntQueryCount = res.TotalQueryCount;
            localStorage.setItem('lastQueryId',this.WhatsappData[0].id)

            this.commentsArray = [];
            this.WhatsappData.forEach((item: any) => {
              item.comments.forEach((cmnt: any) => {
                this.commentsArray.push(cmnt);
              });
              let groupedItems = this.commentsArray.reduce(
                (acc: any, item: any) => {
                  const date = item.createdDate?.split('T')[0];
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
        xyz.keywordList.forEach((xyz: any) => {
          this.Keywords.push(xyz);
        });
      });
    });
  }

  insertTagsForFeed(comId: number, tagName: string) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = tagName;
    this.insertTagsForFeedDto.type = 'Tag';
    this.insertTagsForFeedDto.platform = 'WhatsApp';

    this.WhatsappData?.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
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
    if (
      this.flag == 'focused' ||
      this.flag == 'assigned_to_me' ||
      this.flag == 'follow_up'
    ) {
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

  textWithHtmlTags: any;
  sendQuickReplyGeneric(value: any) {
      this.quickRepliesList.forEach((x: any) => {
        if(x.subReply === null && x.id === value){
          this.text = x?.text + ' ';
          this.insertAtCaret(this.text);
        } else if(x.subReply){
          this.nthLevel(x.subReply, value)
        }
        
      });
  }
  nthLevel(replies: any[], value: any) {
    replies.forEach((reply: any) => {
      if (reply.subReply === null && reply.id === value) {
        this.text = reply.text + ' ';
        this.insertAtCaret(this.text);
      } else if (reply.subReply) {
        this.nthLevel(reply.subReply, value);
      }
    });
}

  quickRepliesGeneric() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.quickRepliesList = res;
    });
  }

  // quickReplyList() {
  //   this.commondata.QuickReplyList().subscribe((res: any) => {
  //     this.QuickReplies = res;
  //   });
  // }

  // oneTierQuickReply = [
  //   {
  //     id: 2,
  //     companyId: 654,
  //     parentId: 1,
  //     baseId: 1,
  //     text: 'Opening',
  //     subReply: [
  //       {
  //         id: 11,
  //         companyId: 654,
  //         parentId: 2,
  //         baseId: 1,
  //         text: 'Generic Account Changes Responses',
  //         subReply: [
  //           {
  //             id: 87,
  //             companyId: 654,
  //             parentId: 11,
  //             baseId: 1,
  //             text: 'Salam, Bazaar Rahbar se xyz baat kar raha hoon. Main aap ki kya rehnumayi kar sakta / sakti hoon?',
  //             subReply: [
  //               {
  //                 id: 877,
  //                 companyId: 654,
  //                 parentId: 11,
  //                 baseId: 1,
  //                 text: '4th Tier',
  //                 subReply: [
  //                   {
  //                     id: 878,
  //                     companyId: 654,
  //                     parentId: 11,
  //                     baseId: 1,
  //                     text: '5th Tier',
  //                     subReply: [
  //                       {
  //                         id: 879,
  //                         companyId: 654,
  //                         parentId: 11,
  //                         baseId: 1,
  //                         text: '6th Tier',
  //                         subReply: null,
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   }
  // ]

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
          this.userProfileId = this.userInformation.id;
        }
      });
    });
  }

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
        responseByName: this.senderId,
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
    this.WhatsappData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
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
  replyDataListener() {
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
  companyId: any;
  c_satForm() {
    //     this.companyidServices.receivedcompanyid().subscribe((res:any)=>{
    // this.companyId=res
    // })
    this.companyId = 654;
    const customerId = localStorage.getItem('storeOpenedId');
    const platform = localStorage.getItem('parent');
    const AgentId = localStorage.getItem('agentId');

    this.insertAtCaret(
      this.activeBaseUrl +
        '/survey/customer_satisfaction' +
        '?platform=' +
        platform +
        '&customerId=' +
        customerId +
        '&agentId=' +
        AgentId +
        '&Id=' +
        this.companyId
    );
  }

  c_informationForm() {
    const customerId = localStorage.getItem('storeOpenedId');
    this.insertAtCaret(
      this.activeBaseUrl +
        '/survey/customer_details' +
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
  // updateMessageStatusDataListener(res: any) {
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
  // activeOuterDropdown: number | null = null;
  // activeInnerDropdown: number | null = null;

  // Function to open the outer dropdown
  // openQuickReplyDropdown(index: number): void {
  //   this.activeOuterDropdown = (this.activeOuterDropdown === index) ? null : index;
  // }

  // Function to open the inner dropdown
  // openInnerQuickReplyDropdown(outerIndex: number, innerIndex: number): void {
  //   this.activeInnerDropdown =
  //     this.activeOuterDropdown === outerIndex &&
  //     this.activeInnerDropdown === innerIndex
  //       ? null
  //       : innerIndex;
  // }

  // Function to handle clicking on radio button (you can modify it as per your requirements)
  // sendHardCodedQuickReply(msgId: string): void {
  //   // Add your logic here
  //   console.log('Radio button clicked:', msgId);
  // }

  threeTierArchitecture(outerIndex: number, innerIndex: number, message: any) {
    if (message.subReply && isArray(message.subReply)) {
      // this.openInnerQuickReplyDropdown(outerIndex, innerIndex);
    } else {
      this.sendQuickReplyGeneric(message.id);
    }
  }

  // activeDropdown: number = 0; // Initialize to null
  activeInnerDropdown: { parentIndex: number | null, childIndex: number | null } = { parentIndex: null, childIndex: null }; // Initialize to null

    toggleCollapse(index: number) {
        this.activeDropdown = (this.activeDropdown === index) ? null : index;
    }

    toggleInnerCollapse(parentIndex: number, childIndex: number) {
        this.activeInnerDropdown = (this.activeInnerDropdown.parentIndex === parentIndex && this.activeInnerDropdown.childIndex === childIndex) ?
            { parentIndex: null, childIndex: null } : { parentIndex, childIndex };
    }

    isDropdownActive(index: number): boolean {
        return this.activeDropdown === index;
    }

    isInnerDropdownActive(parentIndex: number, childIndex: number): boolean {
        return this.activeInnerDropdown.parentIndex === parentIndex && this.activeInnerDropdown.childIndex === childIndex;
    }

}
