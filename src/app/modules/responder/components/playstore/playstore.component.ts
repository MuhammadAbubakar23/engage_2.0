import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { ApplySentimentService } from 'src/app/services/ApplySentimentService/apply-sentiment.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { RulesGroupIdsService } from 'src/app/services/RulesGroupIds/rules-group-ids.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateMessagesService } from 'src/app/services/UpdateMessagesService/update-messages.service';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { postStatsDto, conversationDetailDto, listDto, commentsDto, messagesDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-playstore',
  templateUrl: './playstore.component.html',
  styleUrls: ['./playstore.component.scss']
})
export class PlaystoreComponent implements OnInit {
  @ViewChild('radioInput', { static: false })
  radioInput!: ElementRef<HTMLInputElement>;


  PlayStoreReviews: any[] = [];
  TagsList: any[]=[];
  totalUnrespondedReviewCountByCustomer: any = 0;
  pageNumber: any = 1;
  pageSize: any = 10;
  TodayDate: any;
  // facebookcommentdata: any;
  // facebookmessagedata: any;
  // commentIdForStats: any;
  newReply: any;
  queryStatus: any;
  tagDropdown = false;

  chatText: any;
  commentId: number = 0;
  agentId: any;
  platform: any;
  postType: any;
  dmMsg: any = '';
  msgText: any = '';
  msgId: number = 0;
  filesToUpload: any;
  ImageName: any;
  ImageArray: any[] = [];
  totalUnrespondedCmntCountByCustomer: number = 0;
  postIdForStats: any;
  pageIdForStats: any;
  totalPostReactionsCount: number = 0;
  totalCommentReactionsCount: number = 0;
  appName: any = '';
  commentReply: any;
  getAppliedTagsList: any;
  FbStats: any;
  storeComId: any;
  AlterMsg: any = '';

  TotalCmntQueryCount: number = 0;
  TotalMsgQueryCount: number = 0;

  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  queryType = this.getQueryTypeService.getQueryType();
  agentName = localStorage.getItem('agentName');

  ReplyDto = new ReplyDto();
  PostStatsDto = new postStatsDto();
  ConverstationDetailDto = new conversationDetailDto();
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  commentStatusDto = new CommentStatusDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();
  postStatsDto = new postStatsDto();
  listDto = new listDto();
  filterDto = new FiltersDto();
  UploadedFile: FormData = new FormData();

  show = false;
  isOpen = false;
  active = false;
  fbCmntReply = true;
  fbMsgReply = false;
  checkTag = false;
  activeTag = false;
  querryCompleted = false;
  markAsComplete = false;
  toastermessage = false;
  userInformation:any;

  searchText: string = '';

  PostStatsArray: postStatsDto[] = [];
  CommentStatsDto: any[] = [];
  QuickReplies: any[] = [];
  HumanAgentTags: any[] = [];
  Keywords: any[] = [];

  commentsArray: any[] = [];
  groupArrays: any[] = [];

  messagesArray: any[] = [];
  groupedMessages: any[] = [];
  quickReplySearchText: string = '';

  public Subscription!: Subscription;
  public criteria!: SortCriteria;

  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private unrespondedCountService: UnRespondedCountService,
    private updateMessagesService: UpdateMessagesService,
    private replyService: ReplyService,
    private queryStatusService: QueryStatusService,
    private createTicketService: CreateTicketService,
    private ticketResponseService: TicketResponseService,
    private applySentimentService: ApplySentimentService,
    private getQueryTypeService: GetQueryTypeService,
    private router: Router,
    private stor: StorageService,
    private userInfoService: UserInformationService,
    private el: ElementRef,
    private renderer: Renderer2,
    private getWing: GetWingsService,
    private getRulesGroupIdsService : RulesGroupIdsService
  ) { }
  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement) {
    this.adjustTextareaHeight(textarea);
  }
  teamPermissions: any;
  currentUrl: string = '';
  messagesStatus:any[]=[];
  Sentiments:any[]=[];
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  ngOnInit(): void {
    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    this.renderer.addClass(textarea, 'auto-resize');
    this.adjustTextareaHeight(textarea);
    this.teamPermissions = this.stor.retrive('permissionteam', 'O').local;
    this.currentUrl = this.router.url;

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

    this.getPlayStoreReviewsDetail();
    // // this.getTagList();
    this.quickReplyList();

    this.Subscription = this.addTagService.receiveTags().subscribe((res) => {
      
      this.addTags = res;
      this.addTagDataListener();
    });
    this.Subscription = this.removeTagService.receiveTags().subscribe((res) => {
      
      this.removeTags = res;
      this.removeTagDataListener();
    });
    this.Subscription = this.updateMessagesService.receiveMessage().subscribe((res) => {
        if (this.flag == 'focused' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
          this.updatedMessages = res;
          this.updateMessagesDataListener();
        }
      });
    this.Subscription = this.replyService.receiveReply().subscribe((res) => {
      this.newReply = res;
      this.replyDataListener();
    });
    this.Subscription = this.queryStatusService.receiveQueryStatus().subscribe((res) => {
        this.queryStatus = res;
        this.updateQueryStatusDataListener();
      });
    this.Subscription = this.queryStatusService.bulkReceiveQueryStatus().subscribe((res) => {
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListener();
      });
    this.Subscription = this.unrespondedCountService.getUnRespondedCount().subscribe((res) => {
      var assignedProfileId = Number(localStorage.getItem('assignedProfile'))
        if (this.flag == 'focused' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
          if(res.contentCount.profileId == assignedProfileId){
          if (res.contentCount.contentType == 'PSR') {
            this.totalUnrespondedCmntCountByCustomer =
              res.contentCount.unrespondedCount;
          }
        }
        }
      });

    // this.Subscription = this.applySentimentService.receiveSentiment().subscribe((res) => {
    //     this.applySentimentListner(res);
    //   });

    // this.Subscription = this.queryStatusService.receiveQueryStatus().subscribe((res) => {
    //     this.updateMessageStatusDataListener(res);
    //   });

      this.ticketResponseService.getTicketId().subscribe((res) => {
        this.updateTicketId(res);
      });
  }

  totalComments: number = 0;

  flag: string = '';

  commentDto = new commentsDto();
  messageDto = new messagesDto();

  updatedComments: any;
  updatedMessages: any;

  spinner1running = false;
  spinner2running = false;

  updateMessagesDataListener() {
    if (!this.id) {
      this.id = localStorage.getItem('storeOpenedId') || '{}';
    }
    this.updatedMessages.forEach((xyz: any) => {
      if (this.id == xyz.fromId) {
        this.messageDto = {
          id: xyz.id,
          contentType: xyz.contentType,
          queryStatus: xyz.queryStatus,
          createdDate: xyz.createdDate,
          attachments: xyz.attachments,
          replies: [],
          sentiment: '',
          tags: [],
          msgId: xyz.msgId,
          fromId: xyz.fromId,
          fromName: xyz.fromName,
          fromProfilePic: xyz.fromProfilePic,
          toId: xyz.toId,
          toName: xyz.toName,
          msgText: xyz.msgText,
          agentId: '',
          customerSocailProfileId: 0,
          profileId: xyz.profileId,
          profilePageId: xyz.profilePageId,
        };
        this.PlayStoreReviews.unshift(this.messageDto);
        this.messagesArray.unshift(this.messageDto);

        let groupedItems = this.messagesArray.reduce((acc: any, item: any) => {
          const date = item.createdDate?.split('T')[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});

        this.groupedMessages = Object.keys(groupedItems).map((createdDate) => {
          return {
            createdDate,
            items: groupedItems[createdDate],
          };
        });
        this.totalUnrespondedReviewCountByCustomer =
          this.totalUnrespondedReviewCountByCustomer + 1;
      }
    });
    this.changeDetect.detectChanges();
  }

  addTags: any;
  removeTags: any;

  addTagDataListener() {
      this.PlayStoreReviews?.forEach((msg: any) => {
        if (msg.id == this.addTags.feedId) {
          if(this.addTags.type == 'Tag'){
            if (msg.tags.length == 0) {
              msg.tags.push(this.addTags);
            } else if (msg.tags.length > 0) {
              const tag = msg.tags.find((x: any) => x.name == this.addTags.tagName);
              if (tag != null || tag != undefined) {
                const index = msg.tags.indexOf(tag);
                if (index !== -1) {
                  msg.tags.splice(index, 1);
                }
              } else {
                msg.tags.push(this.addTags);
              }
            }
          }
          if(this.addTags.type == 'Sentiment'){
            msg.sentiment = this.addTags;
          }
        }
      });
    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
      this.PlayStoreReviews?.forEach((msg: any) => {
        if (msg.id == this.removeTags.feedId) {
          var tag = msg.tags.find((x: any) => x.name == this.removeTags.tagName);
          const index = msg.tags.indexOf(tag);
          if (index !== -1) {
            msg.tags.splice(index, 1);
          }
        }
      });
    this.changeDetect.detectChanges();
  }

  updateQueryStatusDataListener() {
    if (this.PlayStoreReviews) {
      this.PlayStoreReviews?.forEach((msg: any) => {
        if (msg.id == this.queryStatus.queryId) {
          msg.queryStatus = this.queryStatus.queryStatus;
        }
      });
    }

    this.changeDetect.detectChanges();
  }

  updateBulkQueryStatusDataListener() {
    this.queryStatus.forEach((querry: any) => {
      if (querry.feedType == 'PSR') {
        this.PlayStoreReviews?.forEach((msg: any) => {
          if (msg.id == querry.queryId) {
            msg.queryStatus = querry.queryStatus;
            this.totalUnrespondedReviewCountByCustomer = 0;
          }
        });
      }
    });

    this.changeDetect.detectChanges();
  }

  replyDataListener() {
    if (this.newReply.contentType == 'PSR') {
      this.PlayStoreReviews?.forEach((msg: any) => {
        if (msg.id == this.newReply.commentId) {
          msg.replies.push(this.newReply);
          msg.queryStatus = this.newReply.queryStatus;
        }
      });
    }
    this.changeDetect.detectChanges();
  }

  getPlayStoreReviewsDetail() {
    this.flag = this.currentUrl.split('/')[2];

    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'PlayStore',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
        hasBlueTick:false,
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata.GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.PlayStoreReviews = res.List?.dm;
            this.userInformation = res.List?.user;
            this.userInfoService.shareUserInformation(res.List.user);
            this.appName = res.List?.profile.clientAppName;
            this.totalUnrespondedReviewCountByCustomer = res.TotalCount;
            this.TotalMsgQueryCount = res.TotalQueryCount;

            this.messagesArray = [];
            this.groupedMessages = [];

            this.PlayStoreReviews.forEach((item: any) => {
              this.messagesArray.push(item);
              let groupedItems = this.messagesArray.reduce(
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

              this.groupedMessages = Object.keys(groupedItems).map(
                (createdDate) => {
                  return {
                    createdDate,
                    items: groupedItems[createdDate],
                  };
                }
              );
              this.SpinnerService.hide();
              this.spinner1running = false;
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
        plateForm: 'PlayStore',
        pageNumber: this.pageNumber,
        hasBlueTick:false,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.PlayStoreReviews = res.List?.dm;
          this.userInformation = res.List?.user;
          this.userInfoService.shareUserInformation(res.List.user);
          this.appName = res.List?.profile.clientAppName;
          this.TotalMsgQueryCount = res.TotalQueryCount;
          this.totalUnrespondedReviewCountByCustomer = res.TotalCount;

          this.messagesArray = [];
          this.groupedMessages = [];

          this.PlayStoreReviews.forEach((item: any) => {
            this.messagesArray.push(item);
            let groupedItems = this.messagesArray.reduce(
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

            this.groupedMessages = Object.keys(groupedItems).map(
              (createdDate) => {
                return {
                  createdDate,
                  items: groupedItems[createdDate],
                };
              }
            );
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
        hasBlueTick:false,
        queryType: this.queryType,
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };

      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.PlayStoreReviews = res.List?.dm;
            this.userInformation = res.List?.user;
            this.userInfoService.shareUserInformation(res.List.user);
            this.appName = res.List?.profile.clientAppName;
            this.TotalMsgQueryCount = res.TotalQueryCount;
            this.totalUnrespondedReviewCountByCustomer = res.TotalCount;

            this.messagesArray = [];
            this.groupedMessages = [];

            this.PlayStoreReviews.forEach((item: any) => {
              this.messagesArray.push(item);
              let groupedItems = this.messagesArray.reduce(
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

              this.groupedMessages = Object.keys(groupedItems).map(
                (createdDate) => {
                  return {
                    createdDate,
                    items: groupedItems[createdDate],
                  };
                }
              );
              this.SpinnerService.hide();
              this.spinner1running = false;
            });
          }
        });
    }
  }

  isAttachment = false;


  userProfileId = 0;

  playStoreReviewReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    // profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
    responseByName: new FormControl(this.ReplyDto.responseByName),
    groupId: new FormControl(this.ReplyDto.groupId),
  });

  profileId: string = '';
  profilePageId: string = '';

  SendReviewInformation(id: any) {
    this.PlayStoreReviews?.forEach((msg: any) => {
      if (msg.id == id) {
        // show mentioned reply
        this.show = true;
        this.msgId = msg.id;
        this.agentId = localStorage.getItem('agentId');
        this.platform = localStorage.getItem('parent');
        this.postType = 'PSR';
        // this.profileId = msg.profileId;
        this.profileId = '';
        // this.profilePageId = msg.profilePageId;
        this.userProfileId = this.userInformation.id;
      }
    });
  }

  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }

  text: string = '';


  clearInputField() {
    this.ImageArray = [];
    this.msgText = '';
    this.show = false;
    this.commentId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.msgId = 0;
    this.detectChanges();
  }

  submitPlayStoreReviewReply() {
    if (this.msgId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }
      if (this.text !== '') {
        this.playStoreReviewReplyForm.patchValue({
          text: this.text,
        });
      }
      this.playStoreReviewReplyForm.patchValue({
        commentId: this.msgId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        // profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
        responseByName: this.appName,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.playStoreReviewReplyForm.value)
      );
      if (
        this.playStoreReviewReplyForm.value.text !== '' &&
        this.playStoreReviewReplyForm.value.text !== null &&
        this?.ImageName?.length > 0 &&
        this.ImageName != undefined
      ) {
        this.reloadComponent('both-text-and-attachment-added');
      } else if (
        (this.playStoreReviewReplyForm.value.text !== '' &&
          this.playStoreReviewReplyForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        this.spinner1running = true;
        this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('fbmessage');
            this.playStoreReviewReplyForm.reset();

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

  toggle(child: string, cmntId: any) {
    if (localStorage.getItem('child') == child) {
      this.toggleService.addTogglePanel('');
    } else {
      this.toggleService.addTogglePanel(child);
    }

    this.createTicketService.setCommentId(cmntId);
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);
    this.text = abc?.text + ' ';
    this.insertAtCaret(this.text);
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
    });
  }

  openDropdown() {
    this.active = !this.active;
  }

  getTagList() {
    this.commondata.GetTagsList().subscribe((res: any) => {
      if (Object.keys(res).length > 0) {
        this.TagsList = res;
        this.TagsList.forEach((xyz: any) => {
          xyz.keywordList.forEach((abc: any) => {
            this.Keywords.push(abc);
          });
        });
      }
    });
  }

  insertTagsForFeed(comId: number, tagName: string) {
      this.insertTagsForFeedDto.feedId = comId;
      this.insertTagsForFeedDto.tagName = tagName;
      this.insertTagsForFeedDto.type = 'Tag';
      this.insertTagsForFeedDto.platform = 'PlayStore';

      this.PlayStoreReviews?.forEach((msg: any) => {
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
        this.insertTagsForFeedDto.platform = 'PlayStore';

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
    this.insertTagsForFeedDto.platform = 'PlayStore';

    this.commondata.InsertSentiment(this.insertTagsForFeedDto).subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
}

  commentStatus(comId: any, type: any) {
    this.commentStatusDto = {
      id: comId,
      type: type,
      plateForm: 'PlayStore',
      profileId: Number(localStorage.getItem('profileId')),
      wings: this.getWing.wings,
      groupId: this.getRulesGroupIdsService.rulesGroupIds,
    };
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {});
  }

  // queryCompleted(comId: any, type: any) {
  //   this.commentStatusDto = {
  //     id: comId,
  //     type: type,
  //     plateForm: 'PlayStore',
  //     profileId: Number(localStorage.getItem('profileId')),
  //     wings: this.getWing.wings,
  //     groupId: this.getRulesGroupIdsService.rulesGroupIds,
  //   };
  //   this.commondata
  //     .QueryCompleted(this.commentStatusDto)
  //     .subscribe((res: any) => {
  //       this.querryCompleted = true;
  //     });
  // }


  reloadComponent(type: any) {
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

  detectChanges(): void {
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

  onScrollMessages() {
    if (this.TotalMsgQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getPlayStoreReviewsDetail();
    }
  }

  updateTicketId(res: any) {
    if (this.PlayStoreReviews) {
      this.PlayStoreReviews?.forEach((msg: any) => {
        if (msg.id == res.queryId) {
          msg.ticketId = res.ticketId;
        }
      });
    }

    this.changeDetect.detectChanges();
  }

  // applySentimentListner(res: any) {
  //   if (this.PlayStoreReviews) {
  //     this.PlayStoreReviews?.forEach((msg: any) => {
  //       if (msg.id == res.feedId) {
  //         msg.sentiment = res;
  //       }
  //     });
  //   }
  //   this.changeDetect.detectChanges();
  // }

  closeQuickResponseSidebar() {
    this.quickReplySearchText = '';
    if (this.radioInput != undefined) {
      this.radioInput.nativeElement.checked = false;
    }
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
  //           this.commentStatus(msgId, type);
  //           this.reloadComponent('spam');
  //         } else if (status == false) {
  //           this.spam = false;
  //           this.reloadComponent('removeSpam');
  //         }
  //       }
  //     });
  // }
  // updateMessageStatusDataListener(res: any) {
  //   if (this.PlayStoreReviews) {
  //     this.PlayStoreReviews?.forEach((msg: any) => {
  //       res.forEach((msgStatus: any) => {
  //         if (msg.id == msgStatus.messageId) {
  //           if (msgStatus.flag == 'starred') {
  //             msg.starred = msgStatus.status;
  //           }
  //           if (msgStatus.flag == 'spam') {
  //             msg.spam = msgStatus.status;
  //           }
  //         }
  //       });
  //     });
  //   }

  //   this.changeDetect.detectChanges();
  // }

  handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitPlayStoreReviewReply();
    }
  }

}
