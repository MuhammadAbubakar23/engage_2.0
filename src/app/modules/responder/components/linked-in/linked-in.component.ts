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
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import { commentsDto, conversationDetailDto, listDto, postStatsDto } from 'src/app/shared/Models/concersationDetailDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-linked-in',
  templateUrl: './linked-in.component.html',
  styleUrls: ['./linked-in.component.scss']
})
export class LinkedInComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('radioInput', { static: false }) radioInput!: ElementRef<HTMLInputElement>;


  id = this.fetchId.getOption();
  queryType = this.getQueryTypeService.getQueryType();

  LinkedInData:any;
  pageName:any;
  totalUnrespondedCmntCountByCustomer:any;

  public Subscription!: Subscription;


  filterDto =new FiltersDto();
  ConverstationDetailDto = new conversationDetailDto();


  TagsList: any[]=[];
  pageNumber: any = 1;
  pageSize: any = 10;
  TodayDate: any;

  chatText: any;
  commentId: number=0;
  agentId: string = '';
  platform: any;
  postType: any;
  queryStatus:any;
  TotalCmntQueryCount: number = 0;
  
  filesToUpload: any;
  ImageName: any;
  ImageArray:any[]=[];
 
  commentReply: any;
  text:string='';
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
  userInformation:any;

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
    private ticketResponseService : TicketResponseService,
    private applySentimentService: ApplySentimentService,
    private getQueryTypeService : GetQueryTypeService,
    private router : Router,
    private userInfoService: UserInformationService,
    private stor: StorageService,
    private el: ElementRef,
    private renderer: Renderer2,
    private unrespondedCountService : UnRespondedCountService

  ) {
    // this.Subscription = this.fetchId.getAutoAssignedId().subscribe((res)=>{
    //   this.id = res;
    //   this.getLinkedInComments();
    // })
  }
  messagesStatus:any[]=[];
  Sentiments:any[]=[];
  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement) {
    this.adjustTextareaHeight(textarea);
  }
  handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitLinkedInCommentReply();
    }
  }
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
 
  KEbaseUrl:string="";
  KEClient:boolean=false;

  ngOnInit(): void {
    this.KEbaseUrl=window.location.origin
    if(this.KEbaseUrl=='https://keportal.enteract.live'){
      this.KEClient=true
    }
    
    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    this.renderer.addClass(textarea, 'auto-resize');
    this.adjustTextareaHeight(textarea);
    
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
    
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

    this.TodayDate = new Date();

    this.getLinkedInComments();
    // this.getTagList();
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

      this.ticketResponseService.getTicketId().subscribe(res=>{
        this.updateTicketId(res)
      });

      this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res:any) => {
        
        if (
          this.flag == 'focused' ||
          this.flag == 'assigned_to_me' ||
          this.flag == 'follow_up'
        ) {
          if (res.contentCount.contentType == 'LIC') {
            this.totalUnrespondedCmntCountByCustomer =
              res.contentCount.unrespondedCount;
          }
        }
      });

      // this.Subscription = this.applySentimentService
      // .receiveSentiment()
      // .subscribe((res) => {
      //   this.applySentimentListner(res);
      // });
  }

  

  commentDto = new commentsDto();
  
  updatedComments:any;
  userProfileId = 0;

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
            this.totalUnrespondedCmntCountByCustomer =
          this.totalUnrespondedCmntCountByCustomer + 1;
          }
        });
        this.changeDetect.detectChanges();
  };
  flag:string='';

  getLinkedInComments() {
    this.flag = this.router.url.split('/')[2];
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
        hasBlueTick:false,

        isAttachment: false,
        queryType: this.queryType,
        text : "",
        userName: "",
        notInclude: "",
        include: "",
        flag: this.flag,
        wings:'Rox'
      };
      this.spinner1running = true;
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          if (Object.keys(res).length > 0) {
          this.SpinnerService.hide();
          this.spinner1running = false;
          this.ConverstationDetailDto = res;
          this.LinkedInData = this.ConverstationDetailDto.List;
          this.userInformation = res.List[0].user;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.TotalCmntQueryCount = res.TotalQueryCount;
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
                const date = item.createdDate?.split('T')[0];
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
              // this.linkedInPostStats();
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
        plateForm: 'LinkedIn',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false,
        queryType: this.queryType,
        hasBlueTick:false,

        text : "",
        userName: "",
        notInclude: "",
        include: "",
        flag: this.flag,
        wings:'Rox'
      };
      this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
        this.LinkedInData = res.List;
        this.pageName = this.LinkedInData[0].post.profile.page_Name;

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.userInformation = res.List[0].user;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.TotalCmntQueryCount = res.TotalQueryCount;
          this.commentsArray = []

          this.LinkedInData.forEach((item:any) => {
            this.commentsArray = []
            item.comments.forEach((cmnt:any) => {
              this.commentsArray.push(cmnt)
            });
              let groupedItems = this.commentsArray.reduce((acc:any, item:any)=>{
                const date = item.createdDate?.split('T')[0];
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
              // this.linkedInPostStats();
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
        hasBlueTick:false,

        text : "",
        userName: "",
        notInclude: "",
        include: "",
        flag: this.flag,
        wings:'Rox'
      };
      this.commondata.GetChannelConversationDetail(this.filterDto).subscribe((res: any) => {
        this.LinkedInData = res.List;
        this.pageName = this.LinkedInData[0].post.profile.page_Name;

          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
          this.userInformation = res.List[0].user;
          this.userInfoService.shareUserInformation(res.List[0].user);
          this.TotalCmntQueryCount = res.TotalQueryCount;
          this.commentsArray = []

          this.LinkedInData.forEach((item:any) => {
            this.commentsArray = []
            item.comments.forEach((cmnt:any) => {
              this.commentsArray.push(cmnt)
            });
              let groupedItems = this.commentsArray.reduce((acc:any, item:any)=>{
                const date = item.createdDate?.split('T')[0];
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
              // this.linkedInPostStats();
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
          });
      });
    }
  }

  imageSize:any;

  onFileChanged() {
    Array.from(this.fileInput.nativeElement.files).forEach((file:any) => {
      if(file.size > 4 * 1024 * 1024){
        this.reloadComponent('Attachments');
      } else if (this.fileInput.nativeElement.files.length > 0) {
      this.isAttachment = true;

      this.ImageName = this.fileInput.nativeElement.files 

      // const filesArray = Array.from(this.fileInput.nativeElement.files);
      // filesArray.forEach((attachment:any) => {
      //   this.ImageArray.push(attachment)
      // });
      // const files = this.ImageArray.map((file:any) => file); // Create a new array with the remaining files
      //   const newFileList = new DataTransfer();
      //   files.forEach((file:any) => newFileList.items.add(file)); // Add the files to a new DataTransfer object
      //   this.ImageName = newFileList.files;
    }
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
  this.ImageName = this.fileInput?.nativeElement.files;
  this.text = this.textarea.nativeElement.value
}
  linkedInReplyForm = new UntypedFormGroup({
    text: new UntypedFormControl(this.ReplyDto.text, Validators.required),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
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
          this.userProfileId = this.userInformation.id;
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
    if(this.commentId == 0){
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }
      
    // if (!this.linkedInReplyForm.get('text')?.dirty) {
      if(this.text !== ""){
        this.linkedInReplyForm.patchValue({
          text: this.text
        })
    }
    // } else {
    //   if (this.linkedInReplyForm.value.text) {
    //     this.linkedInReplyForm.patchValue({
    //       to: this.linkedInReplyForm.value.text
    //     });
    //   }
    // }
      this.linkedInReplyForm.patchValue({
        commentId: this.commentId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId : this.userProfileId,
        responseByName: this.pageName,
      });
  
      formData.append(
        'CommentReply',
        JSON.stringify(this.linkedInReplyForm.value)
      );
      if((this.linkedInReplyForm.value.text !== "" && this.linkedInReplyForm.value.text !== null) 
            || (this?.ImageName?.length > 0 && this.ImageName != undefined)){
              
    this.spinner1running = true;
    this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
      this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('comment');
            if(this.radioInput != undefined){
              this.radioInput.nativeElement.checked = false;
            }
            this.linkedInReplyForm.reset();
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
    this.ImageArray = [];
    this.show = false;
    this.commentId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
    this.fileInput.nativeElement.value = '';
    this.detectChanges();
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
    this.text = abc?.text + " ";
    this.insertAtCaret(this.text)
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
      });
    });
  }

  insertTagsForFeed(comId: number, tagName: string) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = tagName;
    this.insertTagsForFeedDto.type = 'Tag';
    this.insertTagsForFeedDto.platform = 'LinkedIn';

      this.LinkedInData?.forEach((abc: any) => {
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
    if (this.flag == 'focused' || this.flag == 'assigned_to_me' || this.flag == 'follow_up') {
        this.insertTagsForFeedDto.tagName = tagName;
        this.insertTagsForFeedDto.feedId = feedId;
        this.insertTagsForFeedDto.type = 'Tag';
        this.insertTagsForFeedDto.platform = 'LinkedIn';

        this.commondata
          .RemoveTag(this.insertTagsForFeedDto)
          .subscribe((res: any) => {
            this.reloadComponent('RemoveTag');

            this.activeTag = false;
            this.checkTag = false;
          });
    }
  }


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
   // this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
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
  //  this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
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
    if (type == 'Attachments') {
      this.AlterMsg = 'File size must be less than 4MB';
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
    
    if (type == 'empty-input-field') {
      this.AlterMsg = 'Please write something!';
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

      this.detectChanges();
    }
  }

  insertEmoji(emoji:any) {
    this.insertAtCaret(' ' + emoji + ' ');
  }

  addTags: any;
  removeTags: any;

  addTagDataListener() {
    this.LinkedInData?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
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
    });

  this.changeDetect.detectChanges();
}
removeTagDataListener() {
    this.LinkedInData?.forEach((post: any) => {
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

  replyDataListener() {
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

  updateBulkQueryStatusDataListener() {
    
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

  // applySentimentListner(res: any) {
  //   this.LinkedInData.forEach((post: any) => {
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

  closeQuickResponseSidebar(){
    this.quickReplySearchText = '';
    if(this.radioInput != undefined){
              this.radioInput.nativeElement.checked = false;
            }
    
  }

  onScrollComments() {
    if (this.TotalCmntQueryCount > this.pageSize) {
      this.pageSize = this.pageSize + 10;
      this.getLinkedInComments();
    }
  }


  isImage(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('image');
  }

  isVideo(attachment: any): boolean {
    return attachment.contentType?.toLowerCase().startsWith('video');
  }

  c_satForm() {
    const customerId = localStorage.getItem('storeOpenedId');
    const channel = localStorage.getItem('parent');
    this.insertAtCaret(
      'https://keportal.enteract.live/survey/customer_satisfaction' + '?channel=' + channel +
        '&customerId=' +
        customerId +
        ' '
    );
  }
}
