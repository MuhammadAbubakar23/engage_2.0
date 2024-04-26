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
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { InstagramCommentReplyDto } from 'src/app/shared/Models/InstagramCommentReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import {
  commentsDto,
  messagesDto,
  newpostcommentDto,
} from 'src/app/shared/Models/concersationDetailDto';
import { Subscription } from 'rxjs';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { UpdateMessagesService } from 'src/app/services/UpdateMessagesService/update-messages.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';
import { Router } from '@angular/router';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { RulesGroupIdsService } from 'src/app/services/RulesGroupIds/rules-group-ids.service';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss'],
})
export class InstagramComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('radioInput', { static: false })
  radioInput!: ElementRef<HTMLInputElement>;
  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement) {
    this.adjustTextareaHeight(textarea);
  }
  InstagramData: any;

  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  queryType = this.getQueryTypeService.getQueryType();
  public Subscription!: Subscription;

  pageNumber: any = 1;
  pageSize: any = 10;

  // Instagram Comment
  InstacommentId: number = 0;
  agentId: string = '';
  platform: string = '';
  postType: string = '';
  instaCommentText: string = '';
  commentReply: string = '';
  quickReplySearchText: string = '';
  TotalCmntQueryCount: number = 0;
  TotalMsgQueryCount: number = 0;

  instagramCommentReplyDto = new InstagramCommentReplyDto();

  show = false;
  isOpen = false;
  active = false;

  spinner1running = false;
  spinner2running = false;

  commentStatusDto = new CommentStatusDto();

  querryCompleted = false;

  storeComId: any;
  queryStatus: any;
  searchText: string = '';

  TagsList: any[] = [];
  Keywords: any[] = [];
  agentName = localStorage.getItem('agentName');

  insertTagsForFeedDto = new InsertTagsForFeedDto();

  getAppliedTagsList: any;
  newReply: any;

  activeTag = false;
  checkTag = false;
  postId: any = 0;
  filterDto = new FiltersDto();
  likes: any = '';
  comments: any = '';
  views: any = '';
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  QuickReplies: any;
  toastermessage = false;
  AlterMsg: any = '';
  totalUnrespondedCmntCountByCustomer: number = 0;
  pageName: any;
  TodayDate: any;

  commentsArray: any[] = [];
  groupArrays: any[] = [];
  public criteria!: SortCriteria;

  flag: string = '';

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
    private replyService: ReplyService,
    private unrespondedCountService: UnRespondedCountService,
    private createTicketService: CreateTicketService,
    private updateMessagesService: UpdateMessagesService,
    private ticketResponseService: TicketResponseService,
    private getQueryTypeService: GetQueryTypeService,
    private router: Router,
    private userInfoService: UserInformationService,
    private stor: StorageService,
    private el: ElementRef,
    private renderer: Renderer2,
    private getWing: GetWingsService,
    private getRulesGroupIdsService: RulesGroupIdsService
  ) {
    // this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
    //   this.id = res;
    //   this.getInstagramData();
    // });
  }
  handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitInstagramMessageReply();
    }
  }
  handleInstagramCommentReply(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitInstagramCommentReply();
    }
  }
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  messagesStatus: any[] = [];
  Sentiments: any[] = [];

  KEbaseUrl: string = '';
  KEClient: boolean = false;

  ngOnInit(): void {
    this.KEbaseUrl = window.location.origin;
    if (this.KEbaseUrl == 'https://keportal.enteract.live') {
      this.KEClient = true;
    }

    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    this.renderer.addClass(textarea, 'auto-resize');
    this.adjustTextareaHeight(textarea);

    this.flag = this.router.url.split('/')[2];

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

    this.getInstagramData();
    this.getInstagramMessages();
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
    this.Subscription = this.updateMessagesService
      .receiveMessage()
      .subscribe((res) => {
        this.updatedMessages = res;
        this.updateMessagesDataListener();
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
            if (res.contentCount.contentType == 'IC') {
              this.totalUnrespondedCmntCountByCustomer =
                res.contentCount.unrespondedCount;
            }
            if (res.contentCount.contentType == 'IM') {
              this.totalUnrespondedMsgCountByCustomer =
                res.contentCount.unrespondedCount;
            }
          }
        }
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
  }

  commentDto = new commentsDto();
  InstanewCmntReply = false;
  NewPostCmntReply = true;
  updatedComments: any;
  updatedMessages: any;
  messageDto = new messagesDto();
  newpostcommentDto = new newpostcommentDto();
  newPostComment: any[] = [];
  postIdArray: any[] = [];
  InstagramNewpost: any[] = [];

  updateCommentsDataListener() {
    if (!this.id) {
      this.id = localStorage.getItem('storeOpenedId') || '{}';
    }
    const openedContentType = localStorage.getItem('contentType');
    this.updatedComments?.forEach((xyz: any) => {
      xyz.comments.forEach((abc: any) => {
        if (openedContentType == abc.contentType) {
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

            // this.InstagramData.forEach((item: any) => {
            //   this.commentsArray = [];
            //   if (item.post.postId == xyz.postId) {
            //     item.comments.push(this.commentDto);
            //     item.comments.forEach((cmnt: any) => {
            //       this.commentsArray.push(cmnt);
            //     });

            //     let groupedItems = this.commentsArray.reduce(
            //       (acc: any, item: any) => {
            //         const date = item.createdDate?.split('T')[0];
            //         if (!acc[date]) {
            //           acc[date] = [];
            //         }
            //         acc[date].push(item);
            //         return acc;
            //       },
            //       {}
            //     );

            //     item['groupedComments'] = Object.keys(groupedItems).map(
            //       (createdDate) => {
            //         return {
            //           createdDate,
            //           items: groupedItems[createdDate],
            //         };
            //       }
            //     );
            //   }
            // });

            this.InstagramData?.forEach((item: any) => {
              this.postIdArray.push(item.post.postId);
              this.commentsArray = [];
              // this.newPostComment= [];

              if (this.postIdArray.includes(xyz.post.postId)) {
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
                if (!this.postIdArray.includes(xyz.post.postId)) {
                  this.InstagramNewpost?.forEach((x: any) => {
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
                    });
                    if (
                      !this.newPostComment.find(
                        (comment) => comment.post.postId === x.post.postId
                      )
                    ) {
                      this.newPostComment.push(x);
                    }
                    this.InstanewCmntReply = true;
                    this.newPostComment.forEach((item: any) => {
                      this.commentsArray = [];
                      if (item.post.postId == x.post.postId) {
                        if (
                          !item.comments.find(
                            (cmnt: any) => cmnt.id === this.newpostcommentDto.id
                          )
                        ) {
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
                    });
                  });
                }
              }
            });
            this.totalUnrespondedCmntCountByCustomer =
              this.totalUnrespondedCmntCountByCustomer + 1;
          }
        }
      });
    });
    this.changeDetect.detectChanges();
  }

  updateMessagesDataListener() {
    if (!this.id) {
      this.id = localStorage.getItem('storeOpenedId') || '{}';
    }
    const openedContentType = localStorage.getItem('contentType');
    this.updatedMessages.forEach((xyz: any) => {
      if (openedContentType == xyz.contentType) {
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
          this.InstagramMessages.unshift(this.messageDto);
          this.messagesArray.unshift(this.messageDto);

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
          this.totalUnrespondedMsgCountByCustomer =
            this.totalUnrespondedMsgCountByCustomer + 1;
        }
      }
    });
    this.changeDetect.detectChanges();
  }

  ReplyDto = new ReplyDto();

  getInstagramData() {
    this.flag = this.router.url.split('/')[2];
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Instagram',
        pageNumber: this.pageNumber,
        hasBlueTick: false,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
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
            this.InstagramData = res.List;
            this.instagramBusinessAccountId =
              res.List[0]?.post.profile?.instagramBusinessAccountId;
            this.userInformation = res.List[0].user;
            this.userInfoService.shareUserInformation(res.List[0].user);
            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            this.TotalCmntQueryCount = res.TotalQueryCount;
            this.pageName = this.InstagramData[0]?.post.profile.clientAppName;

            if (this.InstagramData?.length != 0) {
              this.instaCmntReply = true;
              this.instaMsgReply = false;
            }

            this.commentsArray = [];
            localStorage.setItem('lastQueryId',this.InstagramData[0].comments[0].id)
            this.InstagramData.forEach((item: any) => {
              this.commentsArray = [];
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
            });

            // this.instaStats();
          }
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Instagram',
        pageNumber: 0,
        pageSize: 0,
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
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.spinner1running = false;
          this.InstagramData = res.List;
          this.instagramBusinessAccountId =
            res.List[0]?.post.profile?.instagramBusinessAccountId;
          this.userInformation = res.List[0].user;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.TotalCmntQueryCount = res.TotalQueryCount;
          this.pageName = this.InstagramData[0]?.post.profile.clientAppName;

          if (this.InstagramData?.length != 0) {
            this.instaCmntReply = true;
            this.instaMsgReply = false;
          }

          this.commentsArray = [];

          this.InstagramData.forEach((item: any) => {
            this.commentsArray = [];
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
          });

          // this.instaStats();
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
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.spinner1running = false;
            this.InstagramData = res.List;
            this.instagramBusinessAccountId =
              res.List[0]?.post.profile?.instagramBusinessAccountId;
            this.userInformation = res.List[0].user;
            this.userInfoService.shareUserInformation(res.List[0].user);
            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            this.TotalCmntQueryCount = res.TotalQueryCount;
            this.pageName = this.InstagramData[0]?.post.profile.clientAppName;

            if (this.InstagramData?.length != 0) {
              this.instaCmntReply = true;
              this.instaMsgReply = false;
            }

            this.commentsArray = [];

            this.InstagramData.forEach((item: any) => {
              this.commentsArray = [];
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
            });

            // this.instaStats();
          }
        });
    }
  }

  instagramCommentReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
    responseByName: new FormControl(this.ReplyDto.responseByName),
    instagramBusinessAccountId: new FormControl(
      this.ReplyDto.instagramBusinessAccountId
    ),
    groupId: new FormControl(this.ReplyDto.groupId),
  });

  profileId: string = '';
  profilePageId: string = '';
  userProfileId = 0;

  SendInstagramCommentInformation(comId: any) {
    this.InstagramData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.InstacommentId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
          this.userProfileId = this.userInformation.id;
        }
      });
    });
  }
  ImageName: any;
  ImageArray: any[] = [];

  text: string = '';
  submitInstagramCommentReply() {
    if (this.InstacommentId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }

      // if (!this.instagramCommentReplyForm.get('text')?.dirty) {
      if (this.text !== '') {
        this.instagramCommentReplyForm.patchValue({
          text: this.text,
        });
      }
      // } else {
      //   if (this.instagramCommentReplyForm.value.text) {
      //     this.instagramCommentReplyForm.patchValue({
      //       to: this.instagramCommentReplyForm.value.text
      //     });
      //   }
      // }
      this.instagramCommentReplyForm.patchValue({
        commentId: this.InstacommentId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
        responseByName: this.pageName,
        instagramBusinessAccountId: this.instagramBusinessAccountId,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.instagramCommentReplyForm.value)
      );
      if (
        (this.instagramCommentReplyForm.value.text !== '' &&
          this.instagramCommentReplyForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        this.spinner1running = true;
        this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.instagramCommentReplyForm.reset();
            this.clearInputField();
            this.reloadComponent('comment');
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

  commentStatus(comId: number = 0, type: string = '') {
    this.commentStatusDto = {
      id: comId,
      type: type,
      plateForm: 'Instagram',
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
  //     id : comId,
  //     type : type,
  //     plateForm : 'Instagram',
  //     profileId : Number(localStorage.getItem('profileId')),
  //     wings: this.getWing.wings,
  //     groupId: this.getRulesGroupIdsService.rulesGroupIds,
  //   }
  //   this.commondata
  //     .QueryCompleted(this.commentStatusDto)
  //     .subscribe((res: any) => {
  //       this.querryCompleted = true;
  //     });
  // }
  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }

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
        // // console.log('keywords==>', this.Keywords);
      });
      // // console.log('TagList', this.TagsList);
    });
  }

  insertTagsForFeed(comId: number, tagName: string) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = tagName;
    this.insertTagsForFeedDto.type = 'Tag';
    this.insertTagsForFeedDto.platform = 'Instagram';

    this.InstagramData?.forEach((abc: any) => {
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

    this.InstagramMessages?.forEach((msg: any) => {
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
      this.insertTagsForFeedDto.platform = 'Instagram';

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');

          this.activeTag = false;
          this.checkTag = false;
        });
    }
  }

  postIdForStats: any;
  pageIdForStats: any;

  instaStats() {
    if (this.InstagramData != null || undefined) {
      this.InstagramData.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post.postId;
        this.pageIdForStats = post.post.profile.page_Id;

        await this.commondata
          .GetInstaPostStats(this.pageIdForStats, this.postIdForStats)
          .subscribe((postStats: any) => {
            post.post['postStats'] = postStats;
          });
      });
    }
  }

  insertSentimentForFeed(comId: number, sentimenName: any) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = sentimenName;
    this.insertTagsForFeedDto.type = 'Sentiment';
    this.insertTagsForFeedDto.platform = 'Instagram';

    this.commondata
      .InsertSentiment(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);
    this.text = abc?.text + ' ';
    this.insertAtCaret(this.text);
  }

  detectChanges(): void {
    // this.ImageName = this.fileInput?.nativeElement.files;
    this.text = this.textarea.nativeElement.value;
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      // // console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }
  likeByAdminDto = new LikeByAdminDto();

  likeByAdmin(
    comId: any,
    isLiked: boolean,
    userId: any,
    platform: any,
    profilePageId: any,
    profileId: any
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

  reloadComponent(type: any) {
    if (type == 'multipleFilesCantAttach') {
      this.AlterMsg = "Multiple Files can't be attached at the same time";
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
    if (type == 'message') {
      this.AlterMsg = 'Message Sent Successfully!';
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
  clearInputField() {
    this.ImageArray = [];
    this.commentReply = '';
    this.instaCommentText = '';
    this.show = false;
    this.InstacommentId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.msgText = '';
    this.msgId = 0;
    this.isAttachment = false;
    this.fileInput.nativeElement.value = '';
    this.detectChanges();
  }
  markAsComplete = false;
  markAsCompleteExpanded(comId: any) {
    this.InstagramData.forEach((abc: any) => {
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
    this.InstagramData?.forEach((post: any) => {
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
    this.InstagramMessages?.forEach((msg: any) => {
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
    this.InstagramData?.forEach((post: any) => {
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
    this.InstagramMessages?.forEach((msg: any) => {
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
    if (this.InstagramData) {
      this.InstagramData?.forEach((post: any) => {
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
    if (this.InstagramMessages) {
      this.InstagramMessages?.forEach((msg: any) => {
        if (msg.id == this.queryStatus.queryId) {
          msg.queryStatus = this.queryStatus.queryStatus;
        }
      });
    }

    this.changeDetect.detectChanges();
  }

  replyDataListener() {
    if (this.newReply.contentType == 'IC') {
      this.InstagramData.forEach((post: any) => {
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
    if (this.newReply.contentType == 'IM') {
      this.InstagramMessages.forEach((msg: any) => {
        if (msg.id == this.newReply.commentId) {
          msg.replies.push(this.newReply);
          msg.queryStatus = this.newReply.queryStatus;
        }
      });
    }
    this.changeDetect.detectChanges();
  }

  onScrollComments() {
    if (this.TotalCmntQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getInstagramData();
    }
  }

  onScrollMessages() {
    if (this.TotalMsgQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getInstagramMessages();
    }
  }

  updateBulkQueryStatusDataListener() {
    this.queryStatus.forEach((querry: any) => {
      if (querry.feedType == 'IC') {
        this.InstagramData?.forEach((post: any) => {
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
      if (querry.feedType == 'IM') {
        this.InstagramMessages?.forEach((msg: any) => {
          if (msg.id == querry.queryId) {
            msg.queryStatus = querry.queryStatus;
            this.totalUnrespondedMsgCountByCustomer = 0;
          }
        });
      }
    });

    this.changeDetect.detectChanges();
  }

  instaCmntReply = true;
  instaMsgReply = false;
  totalUnrespondedMsgCountByCustomer = 0;
  InstagramMessages: any;
  messagesArray: any[] = [];
  groupedMessages: any[] = [];
  totalMessages: number = 0;
  msgId: number = 0;
  msgText: any = '';
  userInformation: any;
  instagramBusinessAccountId: string = '';

  instagramCommentReply() {
    this.instaCmntReply = true;
    this.instaMsgReply = false;
  }

  instagramMessageReply() {
    this.instaCmntReply = false;
    this.instaMsgReply = true;
  }

  getInstagramMessages() {
    this.flag = this.router.url.split('/')[2];
    if (this.id != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Instagram',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
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
      this.commondata
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.InstagramMessages = res.List?.dm;
            this.userInformation = res.List.user;
            this.instagramBusinessAccountId =
              res.List?.profile?.instagramBusinessAccountId;
            this.userInfoService.shareUserInformation(res.List.user);
            this.TotalMsgQueryCount = res.TotalQueryCount;
            this.pageName = this.InstagramMessages[0]?.toName;
            this.totalUnrespondedMsgCountByCustomer = res.TotalCount;

            if (
              !this.InstagramData ||
              this.InstagramData == undefined ||
              this.InstagramData?.length == 0
            ) {
              this.instaCmntReply = false;
              this.instaMsgReply = true;
            }

            this.messagesArray = [];
            this.groupedMessages = [];
            localStorage.setItem('lastQueryId',this.InstagramMessages[0].id)
            this.InstagramMessages.forEach((item: any) => {
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
    } else if (this.slaId != null || undefined) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Instagram',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
        text: '',
        hasBlueTick: false,
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      };

      this.SpinnerService.show();
      this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.InstagramMessages = res.List?.dm;
          this.userInformation = res.List.user;
          this.instagramBusinessAccountId =
            res.List?.profile?.instagramBusinessAccountId;
          this.userInfoService.shareUserInformation(res.List.user);
          this.TotalMsgQueryCount = res.TotalQueryCount;
          this.pageName = this.InstagramMessages[0].toName;
          this.totalMessages = res.TotalCount;

          this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
          if (
            !this.InstagramData ||
            this.InstagramData == undefined ||
            this.InstagramData?.length == 0
          ) {
            this.instaCmntReply = false;
            this.instaMsgReply = true;
          }

          this.messagesArray = [];
          this.groupedMessages = [];

          this.InstagramMessages.forEach((item: any) => {
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
        .GetChannelMessageDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
            this.SpinnerService.hide();
            this.InstagramMessages = res.List?.dm;
            this.userInformation = res.List.user;
            this.instagramBusinessAccountId =
              res.List?.profile?.instagramBusinessAccountId;
            this.userInfoService.shareUserInformation(res.List.user);
            this.pageName = this.InstagramMessages[0].toName;
            this.totalMessages = res.TotalCount;
            this.TotalMsgQueryCount = res.TotalQueryCount;

            this.totalUnrespondedMsgCountByCustomer = res.TotalCount;

            if (
              !this.InstagramData ||
              this.InstagramData == undefined ||
              this.InstagramData?.length == 0
            ) {
              this.instaCmntReply = false;
              this.instaMsgReply = true;
            }

            this.messagesArray = [];
            this.groupedMessages = [];

            this.InstagramMessages.forEach((item: any) => {
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
    }
  }

  SendMessageInformation(id: any) {
    this.InstagramMessages.forEach((msg: any) => {
      if (msg.id == id) {
        // show mentioned reply
        this.show = true;
        this.msgId = msg.id;
        this.agentId = localStorage.getItem('agentId') || '{}';
        this.platform = localStorage.getItem('parent') || '{}';
        this.postType = 'IM';
        this.profileId = msg.profileId;
        this.profilePageId = msg.profilePageId;
        this.userProfileId = this.userInformation.id;
      }
    });
  }

  instagramMessageReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
    responseByName: new FormControl(this.ReplyDto.responseByName),
    instagramBusinessAccountId: new FormControl(
      this.ReplyDto.instagramBusinessAccountId
    ),
    groupId: new FormControl(this.ReplyDto.groupId),
  });

  submitInstagramMessageReply() {
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
        this.instagramMessageReplyForm.patchValue({
          text: this.text,
        });
      }
      this.instagramMessageReplyForm.patchValue({
        commentId: this.msgId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
        responseByName: this.pageName,
        instagramBusinessAccountId: this.instagramBusinessAccountId,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.instagramMessageReplyForm.value)
      );
      if (
        (this.instagramMessageReplyForm.value.text !== '' &&
          this.instagramMessageReplyForm.value.text !== null) ||
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
            if (this.radioInput != undefined) {
              this.radioInput.nativeElement.checked = false;
            }
            this.instagramMessageReplyForm.reset();
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

  updateTicketId(res: any) {
    this.InstagramData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == res.queryId) {
            singleCmnt.ticketId = res.ticketId;
          }
        });
      });
    });
    this.InstagramMessages.forEach((msg: any) => {
      if (msg.id == res.queryId) {
        msg.ticketId = res.ticketId;
      }
    });
    this.changeDetect.detectChanges();
  }

  // applySentimentListner(res: any) {
  //   this.InstagramData.forEach((post: any) => {
  //     post.groupedComments.forEach((cmnt: any) => {
  //       cmnt.items.forEach((singleCmnt: any) => {
  //         if (singleCmnt.id == res.feedId) {
  //           singleCmnt.sentiment = res;
  //         }
  //       });
  //     });
  //   });
  //   this.InstagramMessages.forEach((msg: any) => {
  //     if (msg.id == res.feedId) {
  //       msg.sentiment = res;
  //     }
  //   });
  //   this.changeDetect.detectChanges();
  // }

  closeQuickResponseSidebar() {
    this.quickReplySearchText = '';
    if (this.radioInput != undefined) {
      this.radioInput.nativeElement.checked = false;
    }
  }

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
  isAttachment = false;
  onFileChanged() {
    if (this.ImageArray.length >= 1) {
      this.reloadComponent('multipleFilesCantAttach');
    } else {
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
  }
  removeAttachedFile(index: any) {
    const filesArray = Array.from(this.ImageName);
    filesArray.splice(index, 1);
    this.ImageArray.splice(index, 1);

    const files = filesArray.map((file: any) => file); // Create a new array with the remaining files
    const newFileList = new DataTransfer();
    files.forEach((file) => newFileList.items.add(file)); // Add the files to a new DataTransfer object

    this.fileInput.nativeElement.files = newFileList.files;
    this.ImageName = newFileList.files;
    this.detectChanges();

    if (this.ImageName.length == 0) {
      this.isAttachment = false;
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
}
