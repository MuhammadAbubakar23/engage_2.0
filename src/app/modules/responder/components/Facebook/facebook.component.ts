import {
  AfterViewInit,
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
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import {
  commentsDto,
  conversationDetailDto,
  listDto,
  messagesDto,
  newpostcommentDto,
  postStatsDto,
} from 'src/app/shared/Models/concersationDetailDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { FacebookMessageReplyDto } from 'src/app/shared/Models/FacebookMessageReplyDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { Subscription } from 'rxjs';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UpdateMessagesService } from 'src/app/services/UpdateMessagesService/update-messages.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';
import { ApplySentimentService } from 'src/app/services/ApplySentimentService/apply-sentiment.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
// import newpost Services
import { GetNewPostService } from 'src/app/services/GetNewPostService/get-new-post.service';
declare var toggleEmojis: any;
@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss'],
})
export class FacebookComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('radioInput', { static: false })
  radioInput!: ElementRef<HTMLInputElement>;
  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement) {
    this.adjustTextareaHeight(textarea);
  }
  FacebookData: any;
  FacebookMessages: any[] = [];
  TagsList: any[] = [];
  totalUnrespondedMsgCountByCustomer: any = 0;
  pageNumber: any = 1;
  pageSize: any = 10;
  TodayDate: any;
  facebookcommentdata: any;
  facebookmessagedata: any;
  commentIdForStats: any;
  newReply: any;
  queryStatus: any;
  tagDropdown = false;
  userInformation: any;
  profileInformation:any;

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
  pageName: any = '';
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
  facebookMessageReplyDto = new FacebookMessageReplyDto();
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
  fbnewCmntReply = false
  NewPostCmntReply = true;
  fbMsgReply = false;
  checkTag = false;
  activeTag = false;
  querryCompleted = false;
  markAsComplete = false;
  toastermessage = false;

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
    private updateCommentsService: UpdateCommentsService,
    private updateMessagesService: UpdateMessagesService,
    private replyService: ReplyService,
    private queryStatusService: QueryStatusService,
    private createTicketService: CreateTicketService,
    private ticketResponseService: TicketResponseService,
    private getQueryTypeService: GetQueryTypeService,
    private router: Router,
    private stor: StorageService,
    private userInfoService: UserInformationService,
    private el: ElementRef,
    private renderer: Renderer2,
    private fetchPostType: FetchPostTypeService,
    // newpost Services
    private newpostservice: GetNewPostService
  ) {
    // this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
    //   this.id = res;
    //   this.getFacebookComments();
    //   this.getFacebookMessages();
    // });
  }
  handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitFacebookMessageReply();
    }
  }
  handleFacebookReply(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitFacebookReply();
    }
  }
  handleFacebookNewReply(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitFacebookNewReply();
    }
  }
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  teamPermissions: any;
  currentUrl: string = '';
  messagesStatus: any[] = [];
  Sentiments: any[] = [];

  KEbaseUrl: string = "";
  KEClient: boolean = false;
  fetchedPostType: string = ""

  ngOnInit(): void {

    this.fetchedPostType = this.fetchPostType.postType
    if (this.fetchedPostType == 'FCP') {
      this.fbCmntReply = false;
      this.fbMsgReply = true;
    } else if (this.fetchedPostType == 'FC') {
      this.fbCmntReply = true;
      this.fbMsgReply = false;
    } 

      this.KEbaseUrl = window.location.origin
    if (this.KEbaseUrl == 'https://keportal.enteract.live') {
      this.KEClient = true
    }

    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    this.renderer.addClass(textarea, 'auto-resize');
    this.adjustTextareaHeight(textarea);

    this.teamPermissions = this.stor.retrive('permissionteam', 'O').local;
    this.currentUrl = this.router.url;

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

    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
    this.TodayDate = new Date();

    this.getFacebookComments();
    this.getFacebookMessages();
    // // this.getTagList();
    this.quickReplyList();
    this.humanAgentTags();

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
        this.FacebookNewpost = res
        this.updateCommentsDataListener();
      });
    this.Subscription = this.updateMessagesService
      .receiveMessage()
      .subscribe((res) => {
        if (
          this.flag == 'focused' ||
          this.flag == 'assigned_to_me' ||
          this.flag == 'follow_up'
        ) {
          this.updatedMessages = res;
          this.updateMessagesDataListener();
        }
      });
    this.Subscription = this.replyService.receiveReply().subscribe((res) => {

      this.newReply = res;
      this.replyDataListener();
    });
    this.Subscription = this.queryStatusService
      .receiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateQueryStatusDataListener();
      });
    this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListener();
      });
    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        
        if (
          this.flag == 'focused' ||
          this.flag == 'assigned_to_me' ||
          this.flag == 'follow_up'
        ) {
          if (res.contentCount.contentType == 'FC') {
            this.totalUnrespondedCmntCountByCustomer =
              res.contentCount.unrespondedCount;
          }
          if (res.contentCount.contentType == 'FCP') {
            this.totalUnrespondedMsgCountByCustomer =
              res.contentCount.unrespondedCount;
          }
        }
      });

    this.ticketResponseService.getTicketId().subscribe((res) => {
      this.updateTicketId(res);
    });

    // this.Subscription = this.applySentimentService
    //   .receiveSentiment()
    //   .subscribe((res) => {
    //     this.applySentimentListner(res);
    //   });

    // this.Subscription = this.queryStatusService
    //   .receiveQueryStatus()
    //   .subscribe((res) => {
    //     this.updateMessageStatusDataListener(res);
    //   });

    // For newPost code Called Api

  }
  // code stat Here for newpost &&&&&&&$$$$$***********
  FacebookNewpost: any

  totalComments: number = 0;
  totalMessages: number = 0;

  flag: string = '';
  getFacebookComments() {

    this.flag = this.currentUrl.split('/')[2];

    if (this.id != null || this.id != undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: this.fetchId.platform,
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
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            // this.fbCmntReply = true;
            this.ConverstationDetailDto = res;
            this.FacebookData = this.ConverstationDetailDto.List;
            this.userInformation = res.List[0].user;
            this.userInfoService.shareUserInformation(res.List[0].user);
            this.TotalCmntQueryCount = res.TotalQueryCount;
            this.pageName = this.FacebookData[0]?.post.profile.page_Name;

            this.commentsArray = [];

            this.FacebookData?.forEach((item: any) => {
              this.commentsArray = [];
              item.comments.forEach((cmnt: any) => {
                this.commentsArray.push(cmnt);

                let groupedItems = this.commentsArray.reduce(
                  (acc: any, aa: any) => {
                    const date = aa.createdDate.split('T')[0];
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(aa);
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
            });

            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            this.SpinnerService.hide();
            this.spinner1running = false;
            // this.fbStats();
          }
        });
    } else if (this.slaId != null || this.slaId != undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Facebook',
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
      };
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          // this.fbCmntReply = true;
          this.FacebookData = res.List;
          this.userInformation = res.List[0].user;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.totalComments = res.TotalCount;
          this.TotalCmntQueryCount = res.TotalQueryCount;
          this.pageName = this.FacebookData[0].post.profile.page_Name;
          this.commentsArray = [];

          this.FacebookData?.forEach((item: any) => {
            this.commentsArray = [];
            item.comments.forEach((cmnt: any) => {
              this.commentsArray.push(cmnt);

              let groupedItems = this.commentsArray.reduce(
                (acc: any, aa: any) => {
                  const date = aa.createdDate.split('T')[0];
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(aa);
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
          });

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          // this.fbStats();
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
      };

      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.spinner1running = false;
            // this.fbCmntReply = true;
            this.ConverstationDetailDto = res;
            this.FacebookData = this.ConverstationDetailDto.List;
            this.userInformation = res.List[0].user;
            this.userInfoService.shareUserInformation(res.List[0].user);
            this.totalComments = res.TotalCount;
            this.TotalCmntQueryCount = res.TotalQueryCount;
            this.pageName = this.FacebookData[0]?.post.profile.page_Name;
            this.commentsArray = [];

            this.FacebookData?.forEach((item: any) => {
              this.commentsArray = [];
              item.comments.forEach((cmnt: any) => {
                this.commentsArray.push(cmnt);

                let groupedItems = this.commentsArray.reduce(
                  (acc: any, aa: any) => {
                    const date = aa.createdDate.split('T')[0];
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(aa);
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
            });

            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            // this.fbStats();
          }
        });
    }
  }

  commentDto = new commentsDto();
  messageDto = new messagesDto();
  newpostcommentDto = new newpostcommentDto()

  updatedComments: any;
  updatedMessages: any;
  newPostComment: any[] = []
  spinner1running = false;
  spinner2running = false;
  newcomment: any
  updateCommentsDataListener() {

    
    if (!this.id) {
      this.id = localStorage.getItem('storeOpenedId') || '{}';
    }
    if (this.updatedComments.length > 0) {
      this.updatedComments?.forEach((xyz: any) => {
        xyz.comments.forEach((abc: any) => {
          if (this.id == xyz.user.userId) {
            this.commentDto = {
              id: xyz.user.id,
              postId: xyz.post.postId,
              commentId: abc.commentId,
              message: abc.message,
              contentType: abc.contentType,
              userName: abc.userName || abc.userId,
              queryStatus: abc.queryStatus,
              createdDate: abc.createdDate,
              fromUserProfilePic: abc.profilePic,
              body: abc.body,
              to: abc.toId,
              cc: abc.cc,
              bcc: abc.bcc,
              attachments: abc.mediaAttachments,
              replies: [],
              sentiment: '',
              tags: [],
            };
            this.FacebookData?.forEach((item: any) => {
              
              this.commentsArray = [];
              // this.newPostComment= [];
              if (item.post.postId == xyz.post.postId) {

                item.comments.push(this.commentDto);
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

                item['groupedComments'] = Object.keys(groupedItems).map(
                  (createdDate) => {
                    return {
                      createdDate,
                      items: groupedItems[createdDate],
                    };
                  }
                );
              }
              // for new post 
              else {
                
                if (item.post.postId != xyz.post.postId) {
                  
                  this.FacebookNewpost.forEach((x: any) => {
                    x.comments.forEach((z: any) => {

                      this.newpostcommentDto = {
                        id: z.id,
                        postId: x.post.postId,
                        commentId: z.commentId,
                        message: z.message,
                        contentType: z.contentType,
                        userName: z.userName || z.userId,
                        queryStatus: z.queryStatus,
                        createdDate: z.createdDate,
                        fromUserProfilePic: z.profilePic,
                        body: z.body,
                        to: z.toId,
                        cc: z.cc,
                        bcc: z.bcc,
                        attachments: z.mediaAttachments,
                        replies: [],
                        sentiment: '',
                        tags: z.tags,
                      };
                    })
                    if (!this.newPostComment.find(comment => comment.post.postId === x.post.postId)) {
                      this.newPostComment.push(x);
                    }
                    this.fbnewCmntReply = true
                    console.log("new comment data===>", this.newPostComment)
                    this.newPostComment.forEach((item: any) => {
                      this.commentsArray = [];
                      if (item.post.postId == x.post.postId) {
                        if (!item.comments.find((cmnt: any) => cmnt.id === this.newpostcommentDto.id)) {
                          item.comments.push(this.newpostcommentDto);
                        }
                        item.comments.forEach((cmnt: any) => {
                          if (!this.commentsArray.includes(cmnt.id)) {
                            this.commentsArray.push(cmnt);
                          }
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

                        item['groupedComments'] = Object.keys(groupedItems).map(
                          (createdDate) => {
                            return {
                              createdDate,
                              items: groupedItems[createdDate],
                            };
                          }
                        );
                      }
                    })
                  });

                }


              }
            });
            this.totalUnrespondedCmntCountByCustomer =
              this.totalUnrespondedCmntCountByCustomer + 1;
          }
        })

      });
    }

    this.changeDetect.detectChanges();
  }

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
        this.FacebookMessages.unshift(this.messageDto);
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
        this.totalUnrespondedMsgCountByCustomer =
          this.totalUnrespondedMsgCountByCustomer + 1;
      }
    });
    this.changeDetect.detectChanges();
  }

  addTags: any;
  removeTags: any;

  addTagDataListener() {

    this.FacebookData?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
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
    });
    // for new post
    this.newPostComment?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
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
    });
    this.FacebookMessages?.forEach((msg: any) => {
      if (msg.id == this.addTags.feedId) {
        if (this.addTags.type == 'Tag') {
          if (msg.tags.length == 0) {
            msg.tags.push(this.addTags);
          } else if (msg.tags.length > 0) {
            const tag = msg.tags.find(
              (x: any) => x.name == this.addTags.tagName
            );
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
        if (this.addTags.type == 'Sentiment') {
          msg.sentiment = this.addTags;
        }
      }
    });
    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
    this.FacebookData?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
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
    });
    // for new comment
    this.newPostComment?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
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
    });
    this.FacebookMessages?.forEach((msg: any) => {
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
    if (this.FacebookData) {
      this.FacebookData?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.queryStatus.queryId) {
              singleCmnt.queryStatus = this.queryStatus.queryStatus;
              singleCmnt.isLikedByAdmin = this.queryStatus.isLikes;
            }
          });
        });
      });
    }
    // for new comment
    if (this.newPostComment) {
      this.newPostComment?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.queryStatus.queryId) {
              singleCmnt.queryStatus = this.queryStatus.queryStatus;
              singleCmnt.isLikedByAdmin = this.queryStatus.isLikes;
            }
          });
        });
      });
    }
    if (this.FacebookMessages) {
      this.FacebookMessages?.forEach((msg: any) => {
        if (msg.id == this.queryStatus.queryId) {
          msg.queryStatus = this.queryStatus.queryStatus;
        }
      });
    }

    this.changeDetect.detectChanges();
  }

  updateBulkQueryStatusDataListener() {
    this.queryStatus.forEach((querry: any) => {
      if (querry.feedType == 'FC') {
        this.FacebookData?.forEach((post: any) => {
          post.groupedComments.forEach((cmnt: any) => {
            cmnt.items.forEach((singleCmnt: any) => {
              if (singleCmnt.id == querry.queryId) {
                singleCmnt.queryStatus = querry.queryStatus;
                this.totalUnrespondedCmntCountByCustomer = 0;
              }
            });
          });
        });
      }
      if (querry.feedType == 'FCP') {
        this.FacebookMessages?.forEach((msg: any) => {
          if (msg.id == querry.queryId) {
            msg.queryStatus = querry.queryStatus;
            this.totalUnrespondedMsgCountByCustomer = 0;
          }
        });
      }
    });

    this.changeDetect.detectChanges();
  }

  replyDataListener() {
    
    if (this.newReply.contentType == 'FC') {
      this.FacebookData?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.newReply.commentId) {
              singleCmnt.replies.push(this.newReply);
              singleCmnt.queryStatus = this.newReply.queryStatus;
            }
          });
        });
      });
    }
    // for new post comment reply
    if (this.newReply.contentType == 'FC') {
      this.newPostComment?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.newReply.commentId) {
              if(singleCmnt.replies==null){
                singleCmnt.replies=[]
              }
              singleCmnt.replies.push(this.newReply);
              singleCmnt.queryStatus = this.newReply.queryStatus;
            }
          });
        });
      });
    }
    if (this.newReply.contentType == 'FCP') {
      this.FacebookMessages?.forEach((msg: any) => {
        if (msg.id == this.newReply.commentId) {
          msg.replies.push(this.newReply);
          msg.queryStatus = this.newReply.queryStatus;
        }
      });
    }
    this.changeDetect.detectChanges();
  }

  getFacebookMessages() {
    this.flag = this.currentUrl.split('/')[2];

    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Facebook',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        hasBlueTick:false,

        isAttachment: false,
        queryType: this.queryType,
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
      };

      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.FacebookMessages = this.groupAndModifyData(res.List?.dm);
            this.userInformation = res.List.user;
            this.profileInformation = res.List.profile;
            this.userInfoService.shareUserInformation(res.List.user);
            this.pageName = res.List?.profile.page_Name;
            this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
            this.TotalMsgQueryCount = res.TotalQueryCount;

            if (
              !this.FacebookData ||
              this.FacebookData == undefined ||
              this.FacebookData?.length == 0
            ) {
              // this.fbCmntReply = false;
              // this.fbMsgReply = true;
            }

            this.messagesArray = [];
            this.groupedMessages = [];

            this.FacebookMessages.forEach((item: any) => {
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
              // console.log('Messages ==>', this.groupedMessages);
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
        plateForm: 'Facebook',
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
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.FacebookMessages = this.groupAndModifyData(res.List?.dm);
          this.userInformation = res.List.user;
          this.profileInformation = res.List.profile;
          this.userInfoService.shareUserInformation(res.List.user);
          this.pageName = res.List?.profile.page_Name;
          this.totalMessages = res.TotalCount;
          this.TotalMsgQueryCount = res.TotalQueryCount;
          this.totalUnrespondedMsgCountByCustomer = res.TotalCount;

          if (
            !this.FacebookData ||
            this.FacebookData == undefined ||
            this.FacebookData?.length == 0
          ) {
            // this.fbCmntReply = false;
            // this.fbMsgReply = true;
          }

          this.messagesArray = [];
          this.groupedMessages = [];

          this.FacebookMessages.forEach((item: any) => {
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
            // // console.log('Messages ==>', this.groupedMessages);
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
      };

      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          
          if (Object.keys(res).length > 0) {
            this.FacebookMessages = this.groupAndModifyData(res.List?.dm);
            this.userInformation = res.List.user;
            this.profileInformation = res.List.profile;
            this.userInfoService.shareUserInformation(res.List.user);
            this.pageName = res.List?.profile.page_Name;
            this.totalMessages = res.TotalCount;
            this.TotalMsgQueryCount = res.TotalQueryCount;
            this.totalUnrespondedMsgCountByCustomer = res.TotalCount;

            if (
              !this.FacebookData ||
              this.FacebookData == undefined ||
              this.FacebookData?.length == 0
            ) {
              // this.fbCmntReply = false;
              // this.fbMsgReply = true;
            }

            this.messagesArray = [];
            this.groupedMessages = [];

            this.FacebookMessages.forEach((item: any) => {
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

  groupAndModifyData(data: any[]) {
    // Step 1: Group the data based on disposition.createdDate
    const groupedData: { [key: string]: any[] } = {};
    data.forEach(item => {
      const createdDate = item.dispositions.createdDate;
      if (!groupedData[createdDate]) {
        groupedData[createdDate] = [];
      }
      groupedData[createdDate].push(item);
    });
  
    // Step 2 and 3: Remove disposition object from all records except the one with the max insertionDate
    for (const key in groupedData) {
      if (groupedData.hasOwnProperty(key)) {
        const group = groupedData[key];
        const maxInsertionDateItem = group.reduce((prev, current) => {
          return (new Date(prev.insertionDate) > new Date(current.insertionDate)) ? prev : current;
        });
  
        group.forEach(item => {
          if (item !== maxInsertionDateItem) {
            item.dispositions  = null;
          }
        });
      }
    }
  
    // Step 4: Restore the original state of the data
    const restoredData = [];
    for (const key in groupedData) {
      if (groupedData.hasOwnProperty(key)) {
        restoredData.push(...groupedData[key]);
      }
    }
  
    return restoredData;
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

  fbStats() {
    // this.shareFbResService.updateMessage(this.FacebookData);
    if (this.FacebookData != null || undefined) {
      this.FacebookData?.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post.postId;
        this.pageIdForStats = post.post?.postId.split('_')[0];

        await this.commondata
          .GetFbPostStats(this.pageIdForStats, this.postIdForStats)
          .subscribe((postStats: any) => {
            post.post['postStats'] = postStats;

            this.totalPostReactionsCount =
              postStats.reactioinsLIst.like +
              postStats.reactioinsLIst.love +
              postStats.reactioinsLIst.wow +
              postStats.reactioinsLIst.haha +
              postStats.reactioinsLIst.sorry +
              postStats.reactioinsLIst.anger +
              postStats.reactioinsLIst.sad +
              postStats.reactioinsLIst.thankful +
              postStats.reactioinsLIst.pride +
              postStats.reactioinsLIst.cARE;
            // this.SpinnerService.hide();
          });
      });
    }
    this.FacebookData?.forEach((post: any) => {
      post.comments.forEach(async (comment: any) => {
        this.commentIdForStats = comment.commentId;

        await this.commondata
          .GetFbCommentStats(this.pageIdForStats, this.commentIdForStats)
          .subscribe((commentStats: any) => {
            comment['comStats'] = commentStats;

            this.totalCommentReactionsCount =
              commentStats.reactioinsLIst.like +
              commentStats.reactioinsLIst.love +
              commentStats.reactioinsLIst.wow +
              commentStats.reactioinsLIst.haha +
              commentStats.reactioinsLIst.sorry +
              commentStats.reactioinsLIst.anger +
              commentStats.reactioinsLIst.sad +
              commentStats.reactioinsLIst.thankful +
              commentStats.reactioinsLIst.pride +
              commentStats.reactioinsLIst.cARE;
          });
      });
    });
  }

  userProfileId = 0;

  facebookReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    // teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
    responseByName: new FormControl(this.ReplyDto.responseByName),
  });
  // for new comment 
  facebookNewReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    // teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
    responseByName: new FormControl(this.ReplyDto.responseByName),
  });

  facebookMessageReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    // teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
    responseByName: new FormControl(this.ReplyDto.responseByName),
  });

  profileId: string = '';
  profilePageId: string = '';

  SendCommentInformation(comId: any) {

    this.FacebookData?.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.commentId = comment.id;
          // this.agentId = localStorage.getItem('agentId');
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
          this.userProfileId = this.userInformation.id;
        }
      });
    });
  }
  // For new commentInformation
  SendnewCommentInformation(comId: any) {
    
    this.newPostComment?.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.commentId = comment.id;
          // this.agentId = localStorage.getItem('agentId');
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
          this.userProfileId = this.userInformation.id;
        }
      });
    });
  }
  SendMessageInformation(id: any) {
    
    this.FacebookMessages?.forEach((msg: any) => {
      if (msg.id == id) {
        // show mentioned reply
        this.show = true;
        this.msgId = msg.id;
        // this.agentId = localStorage.getItem('agentId');
        this.platform = this.fetchId.platform;
        this.postType = 'FCP';
        this.profileId = this.profileInformation.profile_Id;
        this.profilePageId = this.profileInformation.page_Id;
        this.userProfileId = this.userInformation.id;
      }
    });
  }

  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }

  text: string = '';

  submitFacebookReply() {
    if (this.commentId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      // if () {
      if (this.text !== '') {
        this.facebookReplyForm.patchValue({
          text: this.text,
        });
      }
      // }
      //  else {
      //   if (this.facebookReplyForm.value.text) {
      //     this.facebookReplyForm.patchValue({
      //       to: this.facebookReplyForm.value.text,
      //     });
      //   }
      // }
      this.facebookReplyForm.patchValue({
        commentId: this.commentId,
        // teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
        responseByName: this.pageName,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.facebookReplyForm.value)
      );
      if (
        (this.facebookReplyForm.value.text !== '' &&
          this.facebookReplyForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        this.spinner1running = true;
        this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('comment');

            this.facebookReplyForm.reset();

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

  submitFacebookNewReply() {
    
    if (this.commentId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      // if () {
      if (this.text !== '') {
        this.facebookNewReplyForm.patchValue({
          text: this.text,
        });
      }
      // }
      //  else {
      //   if (this.facebookReplyForm.value.text) {
      //     this.facebookReplyForm.patchValue({
      //       to: this.facebookReplyForm.value.text,
      //     });
      //   }
      // }
      this.facebookNewReplyForm.patchValue({
        commentId: this.commentId,
        // teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
        responseByName: this.pageName,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.facebookNewReplyForm.value)
      );
      if (
        (this.facebookNewReplyForm.value.text !== '' &&
          this.facebookNewReplyForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        this.spinner1running = true;
        this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('comment');

            this.facebookNewReplyForm.reset();

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
  clearInputField() {
    this.ImageArray = [];
    this.msgText = '';
    this.show = false;
    this.commentId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.msgId = 0;
    this.fileInput.nativeElement.value = '';
    this.detectChanges();
  }

  submitFacebookMessageReply() {
    if (this.msgId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      // if (!this.facebookMessageReplyForm.get('text')?.dirty) {
      if (this.text !== '') {
        this.facebookMessageReplyForm.patchValue({
          text: this.text,
        });
      }
      // } else {
      //   if (this.facebookMessageReplyForm.value.text) {
      //     this.facebookMessageReplyForm.patchValue({
      //       to: this.facebookMessageReplyForm.value.text,
      //     });
      //   }
      // }
      this.facebookMessageReplyForm.patchValue({
        commentId: this.msgId,
        // teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
        responseByName: this.pageName,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.facebookMessageReplyForm.value)
      );
      if (
        this.facebookMessageReplyForm.value.text !== '' &&
        this.facebookMessageReplyForm.value.text !== null &&
        this?.ImageName?.length > 0 &&
        this.ImageName != undefined
      ) {
        this.reloadComponent('both-text-and-attachment-added');
      } else if (
        (this.facebookMessageReplyForm.value.text !== '' &&
          this.facebookMessageReplyForm.value.text !== null) ||
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
            this.facebookMessageReplyForm.reset();

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

  humanAgentTags() {
    this.commondata.GetHumanAgentTag().subscribe((res: any) => {
      this.HumanAgentTags = res;
    });
  }
  sendHumanAgentTag(value: any) {
    var abc = this.HumanAgentTags.find((res: any) => res.value == value);

    this.chatText = abc?.text;

    this.facebookReplyForm.patchValue({ text: this.chatText });
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
          // // console.log('keywords==>', this.Keywords);
        });
        // // console.log('TagList', this.TagsList);
      }
    });
  }

  insertTagsForFeed(comId: number, tagName: string) {

    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = tagName;
    this.insertTagsForFeedDto.type = 'Tag';
    this.insertTagsForFeedDto.platform = 'Facebook';

    this.FacebookData?.forEach((abc: any) => {
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
            const value = comment.tags.find((x: any) => x.name == tagName);
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
    });
    // for new posttag
    this.newPostComment?.forEach((abc: any) => {
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
            const value = comment.tags.find((x: any) => x.name == tagName);
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
    });
    this.FacebookMessages?.forEach((msg: any) => {
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
    if (
      this.flag == 'focused' ||
      this.flag == 'assigned_to_me' ||
      this.flag == 'follow_up'
    ) {
      this.insertTagsForFeedDto.tagName = tagName;
      this.insertTagsForFeedDto.feedId = feedId;
      this.insertTagsForFeedDto.type = 'Tag';
      this.insertTagsForFeedDto.platform = 'Facebook';

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
    this.insertTagsForFeedDto.platform = 'Facebook';

    this.commondata
      .InsertSentiment(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
  }

  commentStatus(comId: any, type: any) {

    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'Facebook';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    //  this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => { });
  }

  queryCompleted(comId: any, type: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'Facebook';
    //  this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }

  likeByAdminDto = new LikeByAdminDto();

  likeByAdmin(
    comId: any,
    isLiked: boolean,
    platform: any,
    profilePageId: any,
    profileId: any,
    userId: any
  ) {
    isLiked = !isLiked;

    this.likeByAdminDto = {
      platform: platform,
      commentId: comId,
      isLiked: isLiked,
      profilePageId: profilePageId,
      profileId: profileId,
      userFromId: userId,
    };
    this.commondata.LikedByAdmin(this.likeByAdminDto).subscribe((res: any) => {
      if (isLiked == true) {
        this.reloadComponent('Like');
      }
      if (isLiked == false) {
        this.reloadComponent('disLike');
      }
    });
  }

  markAsCompleteExpanded(comId: any) {
    this.FacebookData?.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          this.markAsComplete = !this.markAsComplete;
        }
      });
    });
  }

  reloadComponent(type: any) {

    if (type == 'messageUnhided') {
      this.AlterMsg = 'Comment Unhided Sucessfully';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'messageHided') {
      this.AlterMsg = 'Comment Hided Sucessfully';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
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
    toggleEmojis();
  }

  facebookCommentReply() {
    this.fbCmntReply = true;
    this.fbMsgReply = false;
    this.fbnewCmntReply = false
  }

  facebookMessageReply() {
    this.fbCmntReply = false;
    this.fbMsgReply = true;
    this.fbnewCmntReply = false
  }
  facebookNewpostComentReply() {
    this.fbCmntReply = false
    this.fbMsgReply = false
    this.fbnewCmntReply = true
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
  onScrollComments() {
    if (this.TotalCmntQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getFacebookComments();
    }
  }
  onScrollMessages() {
    if (this.TotalMsgQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getFacebookMessages();
    }
  }

  updateTicketId(res: any) {
    if (this.FacebookData) {
      this.FacebookData?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == res.queryId) {
              singleCmnt.ticketId = res.ticketId;
            }
          });
        });
      });
    }
    if (this.FacebookMessages) {
      this.FacebookMessages?.forEach((msg: any) => {
        if (msg.id == res.queryId) {
          msg.ticketId = res.ticketId;
        }
      });
    }

    this.changeDetect.detectChanges();
  }

  // applySentimentListner(res: any) {
  //   if (this.FacebookData) {
  //     this.FacebookData?.forEach((post: any) => {
  //       post.groupedComments.forEach((cmnt: any) => {
  //         cmnt.items.forEach((singleCmnt: any) => {
  //           if (singleCmnt.id == res.feedId) {
  //             singleCmnt.sentiment = res;
  //           }
  //         });
  //       });
  //     });
  //   }
  //   if (this.FacebookMessages) {
  //     this.FacebookMessages?.forEach((msg: any) => {
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
  // isImage(attachment: any): boolean {

  //   if (attachment && attachment.mediaType) {
  //     const contentTypeMatch = attachment.mediaType.match(/image\/(\w+)/i);
  //     return contentTypeMatch !== null;
  //   }
  
  //   return false;
  // }
  
  // isVideo(attachment: any): boolean {
  //   if (attachment && attachment.mediaType) {
  //     const contentTypeMatch = attachment.mediaType.match(/video\/(\w+)/i);
  //     return contentTypeMatch !== null;
  //   }
  
  //   return false;
  // }

  // isAudio(attachment: any): boolean {
  //   if (attachment && attachment.mediaType) {
  //     const contentTypeMatch = attachment.mediaType.match(/audio\/(\w+)/i);
  //     return contentTypeMatch !== null;
  //   }
  
  //   return false;
  // }

  isImage(attachment: any): boolean {
    return attachment?.mediaType?.toLowerCase().startsWith('image');
  }

  isVideo(attachment: any): boolean {
    return attachment?.mediaType?.toLowerCase().startsWith('video');
  }

  isAudio(attachment: any): boolean {
    return attachment?.mediaType?.toLowerCase().startsWith('audio');
  }

  hideMessage(queryId: number, status: boolean) {
    var obj = {
      platform: "Facebook",
      queryId: queryId,
      status: status,
    };
    this.commondata.HideUnhideMessage(obj).subscribe((res: any) => {
      this.FacebookData?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == queryId) {
              singleCmnt.isHide = status;
              if (status == true) {
                this.reloadComponent('messageHided');
              } else if (status == false) {
                this.reloadComponent('messageUnhided');
              }

            }
          });
        });
      });
      console.log(res);
    });
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
  //   if (this.FacebookData) {
  //     this.FacebookData?.forEach((post: any) => {
  //       post.groupedComments.forEach((cmnt: any) => {
  //         cmnt.items.forEach((singleCmnt: any) => {
  //           res.forEach((msgStatus: any) => {
  //             if (singleCmnt.id == msgStatus.messageId) {
  //               if (msgStatus.flag == 'starred') {
  //                 singleCmnt.starred = msgStatus.status;
  //               }
  //               if (msgStatus.flag == 'spam') {
  //                 singleCmnt.spam = msgStatus.status;
  //               }
  //             }
  //           });
  //         });
  //       });
  //     });
  //   }
  //   if (this.FacebookMessages) {
  //     this.FacebookMessages?.forEach((msg: any) => {
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

  c_satForm() {
    const customerId = localStorage.getItem('storeOpenedId');
    const channel = localStorage.getItem('parent');
    this.insertAtCaret(
      'https://keportal.enteract.live/survey/customer_satisfaction' +
      '?channel=' +
      channel +
      '&customerId=' +
      customerId +
      ' '
    );
  }
}
