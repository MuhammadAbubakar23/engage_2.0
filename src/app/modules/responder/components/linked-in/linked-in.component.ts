import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto, conversationDetailDto, listDto, postStatsDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-linked-in',
  templateUrl: './linked-in.component.html',
  styleUrls: ['./linked-in.component.scss']
})
export class LinkedInComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  id = this.fetchId.getOption();

  LinkedInData:any;
  pageName:any;
  totalUnrespondedCmntCountByCustomer:any;

  public Subscription!: Subscription;


  filterDto =new FiltersDto();
  ConverstationDetailDto = new conversationDetailDto();


  TagsList: any;
  pageNumber: any = 1;
  pageSize: any = 10;
  TodayDate: any;

  chatText: any;
  commentId: any;
  agentId: string = '';
  platform: any;
  postType: any;
  queryStatus:any;
  
  filesToUpload: any;
  ImageName: any;
  ImageArray:any[]=[];
 
  commentReply: any;
  getAppliedTagsList: any;
 
  storeComId: any;
  AlterMsg: any = '';
  newReply:any;

  slaId = this.fetchId.getSlaId();

  ReplyDto = new ReplyDto();
  
 
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  commentStatusDto = new CommentStatusDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();

  listDto = new listDto();
  UploadedFile: FormData = new FormData();

  show = false;
  isOpen = false;
  active = false;

  checkTag = false;
  activeTag = false;
  querryCompleted = false;
  markAsComplete = false;
  toastermessage = false;

  spinner1running = false;
  spinner2running = false;

  PostStatsArray: postStatsDto[] = [];
  QuickReplies: any[] = [];
  HumanAgentTags: any[] = [];
  Keywords: any[] = [];
  quickReplySearchText:string='';

  commentsArray : any[]=[];
  groupArrays : any[]=[];
  public criteria!: SortCriteria;
  searchText: string='';

  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private updateCommentsService : UpdateCommentsService,
    private queryStatusService : QueryStatusService,
    private replyService : ReplyService,
    private createTicketService: CreateTicketService,
    private ticketResponseService : TicketResponseService

  ) {
    this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res)=>{
      this.id = res;
      this.getLinkedInComments();
    })
  }

  ngOnInit(): void {

    // this.criteria = {
    //   property: 'createdDate',
    //   descending: true,
    // };
    
    this.TodayDate = new Date();

    this.getLinkedInComments();
    this.getTagList();
    this.quickReplyList();
    this.humanAgentTags();

    this.Subscription = this.addTagService.receiveTags().subscribe((res) => {
      this.addTags = res;
      this.addTagDataListner();
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
  
  updatedComments:any;


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
            this.LinkedInData.forEach((item: any) => {
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
          }
        });
        this.changeDetect.detectChanges();
  };

  getLinkedInComments() {
    
    if (this.id != null || undefined) {
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'LinkedIn',
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
          this.ConverstationDetailDto = res;
          this.LinkedInData = this.ConverstationDetailDto.List;
          this.pageName = this.LinkedInData[0].post.profile.page_Name;

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

          // console.log('LinkedIn Data==>', this.LinkedInData);

          this.commentsArray = []

          this.LinkedInData.forEach((item:any) => {
            this.commentsArray = []
            item.comments.forEach((cmnt:any) => {
              this.commentsArray.push(cmnt)
            });
              let groupedItems = this.commentsArray.reduce((acc:any, item:any)=>{
                const date = item.createdDate.split('T')[0];
                if(!acc[date]){
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              }, {})
        
              item['groupedComments'] = Object.keys(groupedItems).map((createdDate)=>{
                return {
                  createdDate,
                  items : groupedItems[createdDate]
                }
                
              })
              this.linkedInPostStats();
             });
        });
    } else if (this.slaId != null || undefined) {
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'LinkedIn',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false
      };
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        this.LinkedInData = res.List;
        this.pageName = this.LinkedInData[0].post.profile.page_Name;

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

          this.commentsArray = []

          this.LinkedInData.forEach((item:any) => {
            this.commentsArray = []
            item.comments.forEach((cmnt:any) => {
              this.commentsArray.push(cmnt)
            });
              let groupedItems = this.commentsArray.reduce((acc:any, item:any)=>{
                const date = item.createdDate.split('T')[0];
                if(!acc[date]){
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              }, {})
        
              item['groupedComments'] = Object.keys(groupedItems).map((createdDate)=>{
                return {
                  createdDate,
                  items : groupedItems[createdDate]
                }
                
              })
              this.linkedInPostStats();
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
      this.commondata.GetChannelConversationDetail(this.filterDto).subscribe((res: any) => {
        this.LinkedInData = res.List;
        this.pageName = this.LinkedInData[0].post.profile.page_Name;

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

          this.commentsArray = []

          this.LinkedInData.forEach((item:any) => {
            this.commentsArray = []
            item.comments.forEach((cmnt:any) => {
              this.commentsArray.push(cmnt)
            });
              let groupedItems = this.commentsArray.reduce((acc:any, item:any)=>{
                const date = item.createdDate.split('T')[0];
                if(!acc[date]){
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              }, {})
        
              item['groupedComments'] = Object.keys(groupedItems).map((createdDate)=>{
                return {
                  createdDate,
                  items : groupedItems[createdDate]
                }
                
              })
              this.linkedInPostStats();
             });

      });
    }
  }

  postId:any;
  linkedInPostStats() {
    
    if (this.LinkedInData != null || undefined) {
      this.LinkedInData.forEach(async (tweet: any): Promise<void> => {
        this.postId = tweet.post.postId;

          await this.commondata
          .GetLinkedInPostStats(this.postId)
          .subscribe((postStats: any) => {
            
            tweet.post['postStats'] = postStats;

            // console.log("Stats==>", this.LinkedInData)
          });

        

        
      });
    }
  }

  imageSize:any;
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
  linkedInReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
    profileId: new UntypedFormControl(this.ReplyDto.profileId),
    profilePageId: new UntypedFormControl(this.ReplyDto.profilePageId),
  });

  profileId: string = '';
  profilePageId: string = '';
  SendCommentInformation(comId: any) {
    
    this.LinkedInData.forEach((xyz: any) => {
      xyz.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;

          // populate comment data

          this.commentId = comment.id;
          this.agentId = localStorage.getItem('agentId') || '{}';
          this.platform = xyz.platform;
          this.postType = comment.contentType;
          this.profileId = xyz.post.profile.profile_Id;
          this.profilePageId = xyz.post.profile.page_Id;
        }
      });
    });
  }

  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }

  isAttachment = false;

  submitLinkedInCommentReply() {
    if(this.commentId == undefined || this.commentId == '' || this.commentId == null){
      this.reloadComponent('selectComment');
    }
    var formData = new FormData();
    if (this.ImageName != null || undefined) {
      for (let index = 0; index < this.ImageName.length; index++) {
        formData.append('File', this.ImageName[index]);
      }
    }
    this.linkedInReplyForm.patchValue({
      commentId: this.commentId,
      teamId: this.agentId,
      platform: this.platform,
      contentType: this.postType,
      profileId: this.profileId,
      profilePageId: this.profilePageId,
    });

    formData.append(
      'CommentReply',
      JSON.stringify(this.linkedInReplyForm.value)
    );
    this.commondata.ReplyComment(formData).subscribe(
      (res: any) => {
        this.clearInputField();
        this.reloadComponent('comment');
      },
      ({ error }) => {
      //  alert(error.message);
      }
    );
  }

  clearInputField() {
    this.commentReply = '';
    this.show = false;
    this.commentId = '';
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.ImageName = [];
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

    this.chatText = abc?.text;

    // this.linkedInReplyForm.patchValue({ text: this.chatText });
    this.insertAtCaret(this.chatText)
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

    this.linkedInReplyForm.patchValue({ text: this.chatText });
  }

  openDropdown() {
    this.active = !this.active;
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

  insertTags(id: any, comId: string, type: any) {
    
    if (type == 'LIC') {
      this.insertTagsForFeedDto.feedId = comId.toString();
      this.insertTagsForFeedDto.tagId = id;
      this.insertTagsForFeedDto.feedType = 'LIC';
      this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

      this.LinkedInData.forEach((abc: any) => {
        abc.comments.forEach((comment: any) => {
          if (comment.id == comId) {
            if(comment.tags.length == 0){
              this.commondata.InsertTag(this.insertTagsForFeedDto).subscribe((res: any) => {
                this.reloadComponent('ApplyTag');

                this.activeTag = true;
                this.checkTag = true;
              });
            }
            else if(comment.tags.length > 0){
              const value = comment.tags.find((x:any)=>x.id == id)
              if(value != null || value != undefined){
                this.removeTag(id, comId, type);
              } else {
                this.commondata.InsertTag(this.insertTagsForFeedDto).subscribe((res: any) => {
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
  }

  removeTag(tagid: any, feedId: string, type: any) {
    if (type == 'LIC') {
      this.insertTagsForFeedDto.tagId = tagid;
      this.insertTagsForFeedDto.feedId = feedId.toString();
      this.insertTagsForFeedDto.feedType = 'LIC';
      this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');

          this.activeTag = false;
          this.checkTag = false;
        });
    }
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

  insertSentiment(feedId: string, sentimenName: any, type: any) {
    if (type == 'LIC') {
      this.insertSentimentForFeedDto.feedId = feedId.toString();
      this.insertSentimentForFeedDto.sentiment = sentimenName;
      this.insertSentimentForFeedDto.feedType = 'LIC';
      this.insertSentimentForFeedDto.userId = Number(localStorage.getItem('agentId'));

      this.commondata
        .InsertSentiment(this.insertSentimentForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('Sentiment');
        });
    }
  }

  commentStatus(comId: any, type:any) {
    
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'LinkedIn';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .CommentRespond(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
        this.storeComId = comId;
      });
  }
  queryCompleted(comId:any, type:any){
    
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = type;
    this.commentStatusDto.plateForm = 'LinkedIn';
    this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata
      .QueryCompleted(this.commentStatusDto)
      .subscribe((res: any) => {
        this.querryCompleted = true;
      });
  }

  likeByAdminDto = new LikeByAdminDto();

  likeByAdmin(comId: any, isLiked: boolean,platform:any, profilePageId:any, profileId:any, userId:any) {
    
    isLiked = !isLiked;

    this.likeByAdminDto ={
      platform : platform,
      commentId : comId,
      isLiked : isLiked,
      profilePageId : profilePageId,
      profileId : profileId,
      userFromId : userId
    }
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
    this.LinkedInData.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          this.markAsComplete = !this.markAsComplete;
        }
      });
    });
  }

  reloadComponent(type: any) {
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
      // console.log(this.textarea.nativeElement.value);
    }
  }

  insertEmoji(emoji:any) {
    this.insertAtCaret(emoji);
    // console.log(this.textarea.nativeElement.value);
  }

  addTags: any;
  removeTags: any;

  addTagDataListner() {
    this.LinkedInData.forEach((post: any) => {
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
    this.LinkedInData.forEach((post: any) => {
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
    
    this.LinkedInData.forEach((post: any) => {
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

  replyDataListner() {
    this.LinkedInData.forEach((post: any) => {
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

  onScroll() {
    if(this.totalUnrespondedCmntCountByCustomer > 10){
      this.pageSize = this.pageSize + 10
      this.getLinkedInComments();
    }
  }

  updateBulkQueryStatusDataListner() {
    
    this.LinkedInData.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          this.queryStatus.forEach((querry:any) => {
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
  
  updateTicketId(res:any){
    this.LinkedInData.forEach((post: any) => {
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
}
