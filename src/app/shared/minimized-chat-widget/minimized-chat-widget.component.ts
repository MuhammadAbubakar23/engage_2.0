import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { LeftsidebarExpandedService } from 'src/app/services/LeftSideBar-Expanded/leftsidebar-expanded.service';
import { MaximizeChatService } from 'src/app/services/maximize-chat.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommentStatusDto } from '../Models/CommentStatusDto';
import { FiltersDto } from '../Models/FiltersDto';
import { InsertSentimentForFeedDto } from '../Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from '../Models/InsertTagsForFeedDto';
import { ReplyDto } from '../Models/ReplyDto';
import { CommonDataService } from '../services/common/common-data.service';
import { SharedService } from 'src/app/services/SharedService/shared.service'
import { LikeByAdminDto } from '../Models/LikeByAdminDto';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';

@Component({
  selector: 'app-minimized-chat-widget',
  templateUrl: './minimized-chat-widget.component.html',
  styleUrls: ['./minimized-chat-widget.component.scss']
})
export class MinimizedChatWidgetComponent implements OnInit {

  id = this.maximizedChatService.id;
  platform = this.maximizedChatService.platform;
  slaId = this.fetchId.getSlaId();

  YoutubeData: any;
  YoutubeComments: any;
  pageNumber: any = 0;
  pageSize: any = 0;
  commentReply: any;
  postId: any = 0;
  viewCOunt: any = '';
  likeCount: any = '';
  favoriteCount: any = '';
  commentCount: any = '';
  youtubecommentId: number=0;
  youtubecommentText: any;
  agentId: string = '';
  // platform: string = '';
  postType: string = '';
  QuickReplies: any;
  TagsList: any[]=[];
  getAppliedTagsList: any;
  storeComId: any;
  AlterMsg: any = '';
  Keywords: any[] = [];
  
  filterDto = new FiltersDto();
  ReplyDto = new ReplyDto();
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();
  commentStatusDto = new CommentStatusDto();

  queryType = this.getQueryTypeService.getQueryType();

  show = false;
  isOpen = false;
  active = false;
  activeTag = false;
  checkTag = false;
  markAsComplete = false;
  toastermessage = false;
  querryCompleted = false;
  
  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private _route: Router,
    private commondata: CommonDataService,
    private SpinnerService : NgxSpinnerService,
    private maximizedChatService : MaximizeChatService,
    private headerService : HeaderService,
    private leftsidebar : LeftsidebarExpandedService,
    private sharedService  : SharedService,
    private createTicketService: CreateTicketService,
    private getQueryTypeService : GetQueryTypeService
    
  ) {}

  ngOnInit(): void {

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.getYoutubeData();
    this.quickReplyList();
    // this.getTagList();
    this.maximizeChat();
    //this.postStats();
  }
  userName:any;
  profilePic:any;
  totalChats:any[]=[];

  getYoutubeData() {
    
    if(this.maximizedChatService.id != null || undefined){
    this.filterDto = {
      // fromDate: new Date(),
      // toDate: new Date(),
      user: this.maximizedChatService.id,
      pageId: '',
      plateForm: this.maximizedChatService.platform,
      pageNumber: 0,
      pageSize: 0,
      isAttachment: false,
      hasBlueTick:false,

      queryType: this.queryType,
      text: '',
      userName: '',
      notInclude: '',
      include: '',
      flag: '',
    };
    this.SpinnerService.show();
    this.commondata
      .GetChannelConversationDetail(this.filterDto)
      .subscribe((res: any) => {
        this.SpinnerService.hide();
        this.totalChats.push(res.List);
        this.YoutubeData = res.List;
        this.userName = this.YoutubeData[0].user.userName;
        this.profilePic = this.YoutubeData[0].user.profilePic;
        this.platform = this.YoutubeData[0].platform;

        this.YoutubeData.forEach((c: any) => {
          this.postId = c.postId;
          this.youtubePostStats();
        });
      });
    } else if(this.slaId != null || undefined){
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: this.maximizedChatService.platform,
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false,
        queryType: this.queryType,
        hasBlueTick:false,
        text: '',
        userName: '',
        notInclude: '',
        include: '',
        flag: '',
      };
      this.SpinnerService.show();
      this.commondata
        .GetSlaDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.YoutubeData = res.List;
  
          this.YoutubeData.forEach((c: any) => {
            this.postId = c.postId;
            this.youtubePostStats();
          });
        });
      }
  }

  
  postIdForStats:any;

  youtubePostStats() {
    
    if (this.YoutubeData != null || undefined) {
      this.YoutubeData.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post.postId;

        await this.commondata
          .GetYoutubePostStats(this.postIdForStats)
          .subscribe((postStats: any) => {
            post.post['postStats'] = postStats;
          });
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
    text: new UntypedFormControl(this.ReplyDto.text),
    commentId: new UntypedFormControl(this.ReplyDto.commentId),
    teamId: new UntypedFormControl(this.ReplyDto.teamId),
    platform: new UntypedFormControl(this.ReplyDto.platform),
    contentType: new UntypedFormControl(this.ReplyDto.contentType),
  });

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
        }
      });
    });
  }

  text:string="";
  ImageName:any;

  submitYoutubeCommentReply() {
    if(this.youtubecommentId == 0){
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      // if (this.ImageName != null || undefined) {
      //   for (let index = 0; index < this.ImageName.length; index++) {
      //     formData.append('File', this.ImageName[index]);
      //   }
      // }
      if(this.text !== ""){
        this.youtubeCommentReplyForm.patchValue({
          text: this.text
        })
    }
      this.youtubeCommentReplyForm.patchValue({
        commentId: this.youtubecommentId,
        teamId: this.agentId,
        platform: this.platform,
        contentType: this.postType,
        // profileId: this.profileId,
        // profilePageId: this.profilePageId,
      });
  
      formData.append(
        'CommentReply',
        JSON.stringify(this.youtubeCommentReplyForm.value)
      );
      if((this.youtubeCommentReplyForm.value.text !== "" && this.youtubeCommentReplyForm.value.text !== null) 
            || (this?.ImageName?.length > 0 && this.ImageName != undefined)){
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.clearInputField();
            this.reloadComponent('comment');
          },
          (error) => {
            alert(error.message);
            // this.spinner1running = false;
           this.SpinnerService.hide();
         }
        );
      } else {
        this.reloadComponent('empty-input-field')
      }
    }
   
  }

  likeByAdminDto = new LikeByAdminDto();

  likeByAdmin(comId: any, isLiked: boolean, userId:any, platform:any,profilePageId:any, profileId:any) {
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
      this.getYoutubeData();
      // alert(res.message);
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

  insertSentimentForFeed(comId: number, sentimenName: any) {
    this.insertTagsForFeedDto.feedId = comId;
    this.insertTagsForFeedDto.tagName = sentimenName;
    this.insertTagsForFeedDto.type = 'Sentiment';
    this.insertTagsForFeedDto.platform = '';

    this.commondata.InsertSentiment(this.insertTagsForFeedDto).subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
}

  sendQuickReply(value: any) {
    var abc = this.QuickReplies.find((res: any) => res.value == value);

    this.text = abc?.text + " ";

    this.youtubeCommentReplyForm.patchValue({
      text: this.youtubecommentText,
    });
  }

  quickReplyList() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.QuickReplies = res;
      // // console.log('Quick Reply List ==>', this.QuickReplies);
    });
  }

  detectChanges(): void {
    // this.ImageName = this.fileInput.nativeElement.files;
    // this.text = this.textarea.nativeElement.value
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

  insertTagsForFeed(id: any, comId: string) {
    // this.insertTagsForFeedDto.feedId = comId;
    // // this.insertTagsForFeedDto.tagId = id;
    // this.insertTagsForFeedDto.feedType = 'YC';
    // this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.YoutubeData.forEach((abc: any) => {
      abc.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          if (comment.tags.length > 0) {
            for (let len = 0; len < comment.tags.length; len++) {
              comment.tags.forEach((tag: any) => {
                if (tag.id == id) {
                  this.removeTagFromFeed(id, comId);
                }
              });
            }
            this.commondata
            .InsertTag(this.insertTagsForFeedDto).subscribe(
              (res: any) => {
                this.reloadComponent('ApplyTag');
                this.getYoutubeData();
                //  alert(res.message);

                this.activeTag = true;
                this.checkTag = true;
              },
              ({ error }) => {
                // alert(error.message || error.title)
              }
            );
          } else {
            this.commondata
            .InsertTag(this.insertTagsForFeedDto).subscribe(
              (res: any) => {
                this.reloadComponent('ApplyTag');
                this.getYoutubeData();
                //  alert(res.message);

                this.activeTag = true;
                this.checkTag = true;
              },
              ({ error }) => {
                // alert(error.message || error.title)
              }
            );
          }
        }
      });
    });
  }

  removeTagFromFeed(id: any, comId: string) {
    // // this.insertTagsForFeedDto.feedId = comId;
    // // this.insertTagsForFeedDto.tagId = id;
    // this.insertTagsForFeedDto.feedType = 'YC';
    // this.insertTagsForFeedDto.userId = Number(localStorage.getItem('agentId'));

    this.commondata.RemoveTag(this.insertTagsForFeedDto).subscribe(
      (res: any) => {
        this.getYoutubeData();
        this.reloadComponent('RemoveTag');

        this.activeTag = false;
        this.checkTag = false;
      },
      ({ error }) => {
        // alert(error.message || error.title)
      }
    );
  }

  commentStatus(comId: any) {
    this.commentStatusDto.id = comId;
    this.commentStatusDto.type = 'YC';
    this.commentStatusDto.plateForm = 'Youtube';
    this.commentStatusDto.profileId = Number(localStorage.getItem('profileId'));
  //  this.commentStatusDto.userId = Number(localStorage.getItem('agentId'));
    this.commondata.CommentRespond(this.commentStatusDto).subscribe(
      (res: any) => {
        this.getYoutubeData();
      },
      ({ error }) => {
        alert(error.message || error.title);
      }
    );
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
    if (type == 'empty-input-field') {
      this.AlterMsg = 'Please write something!';
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
    
    this.commentReply = '';
    this.youtubecommentText = '';
    this.show = false;
    this.youtubecommentId = 0;
    this.agentId = '';
    this.platform = '';
    this.postType = '';
  }

  showChat=false;

  maximizeChat() {
    
    if (this.maximizedChatService.id != null && this.maximizedChatService.platform != null){
      this.showChat = true;
    }
    
  }
  minimizeChat(){
    this.showChat = false
  }

  updatevalue(
    string: any,
    id: any,
    postType: any,
    leftExpandedMenu: any,
    platform:any,
    component:any
  ) {
    
    
   // this.socialHeader.getRouteParam('conversation');
    this.headerService.updateMessage(string);
    this.leftsidebar.updateMessage(leftExpandedMenu);
   this.fetchId.setPlatform(platform);
   this.fetchId.setOption(id);
   this.sharedService.updateMessage(component)
  }
  tagsListDropdown =false
  searchText : string = '';
  
  openTagListDropdown() {
    this.searchText ='';
    this.tagsListDropdown = true;
  }
  closeTagListDropdown() {
    this.tagsListDropdown = false
    this.searchText = ''
  }

  closeQuickResponseSidebar(){
    // this.quickReplySearchText = '';
    // if(this.radioInput.nativeElement.checked = true){
            //   this.radioInput.nativeElement.checked = false;
            // }
    
  }
}
