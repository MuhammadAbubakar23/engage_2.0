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
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
})
export class YoutubeComponent implements OnInit {

  @ViewChild('radioInput', { static: false }) radioInput!: ElementRef<HTMLInputElement>;

  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  queryType = this.getQueryTypeService.getQueryType();

  public Subscription!: Subscription;

  YoutubeData: any;
  pageNumber: number = 1;
  pageSize: number = 10;
  commentReply: any;
  postId: any = 0;
  viewCOunt: any = '';
  likeCount: any = '';
  favoriteCount: any = '';
  commentCount: any = '';
  youtubecommentId: number = 0;
  youtubecommentText: any;
  agentId: string = '';
  platform: string = '';
  postType: string = '';
  QuickReplies: any;
  TagsList: any[] = [];
  getAppliedTagsList: any;
  storeComId: any;
  AlterMsg: any = '';
  Keywords: any[] = [];
  queryStatus: any;
  newReply: any;
  totalUnrespondedCmntCountByCustomer: number = 0;

  TotalCmntQueryCount: number = 0;

  filterDto = new FiltersDto();
  ReplyDto = new ReplyDto();
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();
  commentStatusDto = new CommentStatusDto();

  show = false;
  isOpen = false;
  active = false;
  activeTag = false;
  checkTag = false;
  markAsComplete = false;
  toastermessage = false;
  querryCompleted = false;

  spinner1running = false;
  spinner2running = false;

  commentsArray: any[] = [];
  groupArrays: any[] = [];
  TodayDate: any;

  public criteria!: SortCriteria;
  searchText: string = '';
  quickReplySearchText: string = '';

  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService: UpdateCommentsService,
    private queryStatusService: QueryStatusService,
    private replyService: ReplyService,
    private createTicketService: CreateTicketService,
    private ticketResponseService: TicketResponseService,
    private applySentimentService: ApplySentimentService,
    private getQueryTypeService: GetQueryTypeService,
    private router: Router,
    private userInfoService: UserInformationService,
    private stor: StorageService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res) => {
    //   this.id = res;
    //   this.getYoutubeData();
    // });
  }

  messagesStatus: any[] = [];
  Sentiments: any[] = [];
  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement) {
    this.adjustTextareaHeight(textarea);
  }

  ngOnInit(): void {
    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    this.renderer.addClass(textarea, 'auto-resize');
    this.adjustTextareaHeight(textarea);

    const menu = this.stor.retrive('Tags', 'O').local;
    menu.forEach((item: any) => {
      if (item.name == "Tags") {
        item.subTags.forEach((singleTagObj: any) => {
          if (!this.TagsList.includes(singleTagObj)) {
            this.TagsList.push(singleTagObj)
          }
        });
      }
      if (item.name == "Messages Status") {
        item.subTags.forEach((messagesStatusObj: any) => {
          if (!this.messagesStatus.includes(messagesStatusObj)) {
            this.messagesStatus.push(messagesStatusObj)
          }
        });
      }
      if (item.name == "Sentiments") {
        item.subTags.forEach((sentimentObj: any) => {
          if (!this.Sentiments.includes(sentimentObj)) {
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

    this.getYoutubeData();
    this.quickReplyList();
    // this.getTagList();

    this.Subscription = this.addTagService.receiveTags().subscribe((res) => {
      this.addTags = res;
      this.addTagDataListener();
    });
    this.Subscription = this.removeTagService.receiveTags().subscribe((res) => {
      this.removeTags = res;
      this.removeTagDataListener();
    });
    this.Subscription = this.updateCommentsService.receiveComment().subscribe((res) => {
      this.updatedComments = res;
      this.updateCommentsDataListener();
    });
    this.Subscription = this.queryStatusService.receiveQueryStatus().subscribe((res) => {

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
    this.ticketResponseService.getTicketId().subscribe(res => {
      this.updateTicketId(res)
    });

    // this.Subscription = this.applySentimentService
    // .receiveSentiment()
    // .subscribe((res) => {
    //   this.applySentimentListner(res);
    // });
  }

  commentDto = new commentsDto();

  updatedComments: any;
  userProfileId = 0;

  updateCommentsDataListener() {
    if (!this.id) {
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
        }
        this.YoutubeData.forEach((item: any) => {
          this.commentsArray = [];
          if (item.post.postId == xyz.postId) {
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
          }
        });
        this.totalUnrespondedCmntCountByCustomer =
          this.totalUnrespondedCmntCountByCustomer + 1;
      }
    });
    this.changeDetect.detectChanges();
  };
  flag: string = '';
  pageName: any;
  getYoutubeData() {
    this.flag = this.router.url.split('/')[2];
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Youtube',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
        text: "",
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
            this.YoutubeData = res.List;
            this.userInfoService.shareUserInformation(res.List[0].user);
            this.pageName = this.YoutubeData[0]?.post.profile.page_Name;
            this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
            this.TotalCmntQueryCount = res.TotalQueryCount;

            this.commentsArray = [];

            this.YoutubeData.forEach((item: any) => {
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

              item['groupedComments'] = Object.keys(groupedItems).map((createdDate) => {
                return {
                  createdDate,
                  items: groupedItems[createdDate],
                };
              });
              // // console.log('hello', this.groupArrays);
            });

            let finalObj: any = {};
            this.YoutubeData.forEach((item: any) => {
              item.comments.forEach((cmnt: any) => {
                const date = cmnt.createdDate.split('T')[0];
                if (finalObj[date]) {
                  finalObj[date].push(cmnt);
                } else {
                  finalObj[date] = [cmnt];
                }
                // // console.log(finalObj);
              });
            });

            this.YoutubeData.forEach((c: any) => {
              this.postId = c.postId;
              // this.youtubePostStats();
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
        plateForm: 'Youtube',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        queryType: this.queryType,
        text: "",
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.spinner1running = false;
          this.YoutubeData = res.List;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.pageName = this.YoutubeData[0]?.post.profile.page_Name;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.TotalCmntQueryCount = res.TotalQueryCount;

          this.commentsArray = [];

          this.YoutubeData.forEach((item: any) => {
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

            item['groupedComments'] = Object.keys(groupedItems).map((createdDate) => {
              return {
                createdDate,
                items: groupedItems[createdDate],
              };
            });
          });

          this.YoutubeData.forEach((c: any) => {
            this.postId = c.postId;
            // this.youtubePostStats();
          });
        }
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
        isAttachment: false,
        queryType: this.queryType,
        text: "",
        userName: '',
        notInclude: '',
        include: '',
        flag: this.flag,
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata.GetChannelConversationDetail(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.spinner1running = false;
          this.YoutubeData = res.List;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.pageName = this.YoutubeData[0]?.post.profile.page_Name;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.TotalCmntQueryCount = res.TotalQueryCount;

          this.commentsArray = [];

          this.YoutubeData.forEach((item: any) => {
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

            item['groupedComments'] = Object.keys(groupedItems).map((createdDate) => {
              return {
                createdDate,
                items: groupedItems[createdDate],
              };
            });
          });

          this.YoutubeData.forEach((c: any) => {
            this.postId = c.postId;
            // this.youtubePostStats();
          });
        }
      });
    }
  }


  postIdForStats: any;

  youtubePostStats() {
    if (this.YoutubeData != null || undefined) {
      this.YoutubeData.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post.postId;

        await this.commondata
          .GetYoutubePostStats(this.postIdForStats)
          .subscribe((postStats: any) => {
            post.post['postStats'] = postStats;
          });
        // // console.log("Youtube stats", this.YoutubeData)
      });
    }
  }

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

  youtubeCommentReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
    userProfileId: new FormControl(this.ReplyDto.userProfileId),
  });
  profileId: string = '';
  profilePageId: string = '';

  sendYoutubeCommentInformation(comId: any) {
    this.YoutubeData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.youtubecommentId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
          this.userProfileId = this.YoutubeData[0].user.id;
        }
      });
    });
  }

  text: string = "";

  submitYoutubeCommentReply() {
    if (this.youtubecommentId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();

      // if (!this.youtubeCommentReplyForm.get('text')?.dirty) {
      if (this.text !== "") {
        this.youtubeCommentReplyForm.patchValue({
          text: this.text
        });
      }
      // } else {
      //   if (this.youtubeCommentReplyForm.value.text) {
      //     this.youtubeCommentReplyForm.patchValue({
      //       to: this.youtubeCommentReplyForm.value.text
      //     });
      //   }
      // }

      this.youtubeCommentReplyForm.patchValue({
        commentId: this.youtubecommentId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId
      });

      formData.append(
        'CommentReply',
        JSON.stringify(this.youtubeCommentReplyForm.value)
      );
      if (this.youtubeCommentReplyForm.value.text !== "" && this.youtubeCommentReplyForm.value.text !== null) {

        this.spinner1running = true;
        this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.youtubeCommentReplyForm.reset();
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
        this.reloadComponent('error');
      }
    }
    this.quickReplySearchText = '';
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
    });
  }

  insertSentimentForFeed(comId: number, sentimenName: any) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = sentimenName;
    this.insertTagsForFeedDto.type = 'Sentiment';
    this.insertTagsForFeedDto.platform = 'Youtube';

    this.commondata.InsertSentiment(this.insertTagsForFeedDto).subscribe((res: any) => {
      this.reloadComponent('Sentiment');
    });
  }

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);
    this.text = abc?.text + " ";
    this.insertAtCaret(this.text)
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
    this.insertTagsForFeedDto.platform = 'Youtube';

    this.YoutubeData?.forEach((abc: any) => {
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
  }

  removeTagFromFeed(feedId: number, tagName: any) {
    if (this.flag == 'focused' || this.flag == 'assigned_to_me' || this.flag == 'follow_up'
    ) {
      this.insertTagsForFeedDto.tagName = tagName;
      this.insertTagsForFeedDto.feedId = feedId;
      this.insertTagsForFeedDto.type = 'Tag';
      this.insertTagsForFeedDto.platform = 'Youtube';

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');

          this.activeTag = false;
          this.checkTag = false;
        });
    }
  }
  handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitYoutubeCommentReply();
    }
  }
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  commentStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'YC';
    this.commentStatusDto.plateForm = 'Youtube';
    // this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    this.commondata.CommentRespond(this.commentStatusDto).subscribe(
      (res: any) => {
      },
      ({ error }) => {
        alert(error.message || error.title);
      }
    );
  }

  queryCompleted(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'YC';
    this.commentStatusDto.plateForm = 'Youtube';
    //  this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }

  markAsCompleteExpanded(comId: any) {
    this.YoutubeData.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          this.markAsComplete = !this.markAsComplete;
        }
      });
    });
  }

  reloadComponent(type: any) {
    if (type == 'error') {
      this.AlterMsg = 'Something went wrong!';
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
    this.youtubecommentText = '';
    this.show = false;
    this.youtubecommentId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
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
  ]

  @ViewChild('textarea')
  textarea!: ElementRef;

  insertAtCaret(text: string) {
    const textarea = this.textarea.nativeElement;
    textarea.focus();
    if (typeof textarea.selectionStart != 'undefined') {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const scrollTop = textarea.scrollTop;
      textarea.value = textarea.value.substring(0, startPos) + text + textarea.value.substring(endPos, textarea.value.length);
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
    this.YoutubeData?.forEach((post: any) => {
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

    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
    this.YoutubeData?.forEach((post: any) => {
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
    this.changeDetect.detectChanges();
  }

  updateQueryStatusDataListener() {

    this.YoutubeData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.queryStatus.queryId) {
            singleCmnt.queryStatus = this.queryStatus.queryStatus
            singleCmnt.isLikedByAdmin = this.queryStatus.isLikes
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }

  replyDataListener() {
    this.YoutubeData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.newReply.commentId) {
            singleCmnt.replies.push(this.newReply)
            singleCmnt.queryStatus = this.newReply.queryStatus;
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }
  updateBulkQueryStatusDataListener() {

    this.YoutubeData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          this.queryStatus.forEach((querry: any) => {
            if (singleCmnt.id == querry.queryId) {
              singleCmnt.queryStatus = querry.queryStatus;
              this.totalUnrespondedCmntCountByCustomer = 0;
            }
          });

        });
      });
    });

    this.changeDetect.detectChanges();
  }


  updateTicketId(res: any) {
    this.YoutubeData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == res.queryId) {
            singleCmnt.ticketId = res.ticketId;
          }
        });
      });
    });
    this.changeDetect.detectChanges();
  }

  // applySentimentListner(res: any) {
  //   this.YoutubeData.forEach((post: any) => {
  //     post.groupedComments.forEach((cmnt: any) => {
  //       cmnt.items.forEach((singleCmnt: any) => {
  //         if (singleCmnt.id == res.feedId) {
  //           singleCmnt.sentiment = res;
  //         }
  //       });
  //     });
  //   });
  //   this.changeDetect.detectChanges();
  // }

  onScrollComments() {
    if (this.TotalCmntQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getYoutubeData();
    }
  }

  closeQuickResponseSidebar() {
    this.quickReplySearchText = '';
    if (this.radioInput != undefined) {
      this.radioInput.nativeElement.checked = false;
    }

  }
}
