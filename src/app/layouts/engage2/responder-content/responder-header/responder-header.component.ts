import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
// import { Tooltip } from 'bootstrap';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { LeftsidebarExpandedService } from 'src/app/services/LeftSideBar-Expanded/leftsidebar-expanded.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { AssignQuerryDto } from 'src/app/shared/Models/AssignQuerryDto';
import { DraftDto } from 'src/app/shared/Models/DraftDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { HeaderDto } from 'src/app/shared/Models/HeaderDto';
import { MarkAsCompleteDto } from 'src/app/shared/Models/MarkAsCompleteDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';




@Component({
  selector: 'responder-header',
  templateUrl: './responder-header.component.html',
  styleUrls: ['./responder-header.component.scss']
})
export class ResponderHeaderComponent implements OnInit {

  userIdsDto = this.fetchId.getIds();
  agentId = localStorage.getItem("agentId")
  pageNumber: any = 0;
  pageSize: any = 0;
  UserDetails: any ="";
  FbUnrespondedCmntCountByCustomer:number=0;
  WtsapUnrespondedCmntCountByCustomer:number=0;
  WcUnrespondedCmntCountByCustomer:number=0;
  SmsUnrespondedCmntCountByCustomer:number=0;
  TwitterUnrespondedCmntCountByCustomer:number=0;
  InstaUnrespondedCmntCountByCustomer:number=0;
  EmailUnrespondedCmntCountByCustomer:number=0;
  YoutubeUnrespondedCmntCountByCustomer:number=0;
  LinkedInUnrespondedCmntCountByCustomer:number=0;

  FbUnrespondedMsgCountByCustomer:number=0;
  TwitterUnrespondedMsgCountByCustomer:number=0;


  totalFbUnrespondedCountByCustomer : number =0;
  totalTwitterUnrespondedCountByCustomer : number =0;
  // postType = this.fetchposttype.postType;

  headerDto = new HeaderDto();

  filterDto = new FiltersDto();
  assignQuerryDto = new AssignQuerryDto();

  facebookTab = false;
  instagramTab = false;
  whatsappTab = false;
  smsTab = false;
  twitterTab = false;
  emailTab = false;
  youtubeTab = false;
  phoneTab = false;
  webChatTab = false;
  linkedInTab=false;
  playStoreTab=false;

  constructor(
    private fetchId: FetchIdService,
    private headerService: HeaderService,
    private route: Router,
    private fetchposttype: FetchPostTypeService,
    private _route: Router,
    private leftsidebar: LeftsidebarExpandedService,
    private commondata : CommonDataService,
    private _sharedService : SharedService,
    private moduleService : ModulesService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getMsgsCount();

    this.openedTab();

    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    .forEach(tooltipNode => new Tooltip(tooltipNode)), {
      trigger : 'hover'
    }
  }
  param: any;
  getRouteParam(route: any) {
    this.param = route;
    localStorage.setItem('path', this.param);
    console.log(localStorage.getItem('path'));
  }

  draftDto = new DraftDto();

  updatevalue(string: any, id: any, leftsidebar: string) {
    
    this.param = localStorage.getItem('path');
    this._route.navigateByUrl('all-inboxes/'+this.param);
    this.headerService.updateMessage(string);
    this.leftsidebar.updateMessage(leftsidebar);

  }

  updateModule(value:string){
    this.moduleService.updateModule(value);
  }

  minimizeChat(string: any, leftsidebar: string){
    this.param = localStorage.getItem('path');
    this._route.navigateByUrl('all-inboxes/'+this.param);
    this.headerService.updateMessage(string);
    this.leftsidebar.updateMessage(leftsidebar);

    if(this.fetchId.platform == "Facebook"){
      this.totalCount = this.FbUnrespondedCmntCountByCustomer;
    } 
    if(this.fetchId.platform == "WhatsApp"){
      this.totalCount = this.WtsapUnrespondedCmntCountByCustomer;
    } 
    if(this.fetchId.platform == "Webchat"){
      this.totalCount = this.WcUnrespondedCmntCountByCustomer;
    } 
    if(this.fetchId.platform == "SMS"){
      this.totalCount = this.SmsUnrespondedCmntCountByCustomer;
    } 
    if(this.fetchId.platform == "Twitter"){
      this.totalCount = this.TwitterUnrespondedCmntCountByCustomer;
    } 
    if(this.fetchId.platform == "Instagram"){
      this.totalCount = this.InstaUnrespondedCmntCountByCustomer;
    } 
    if(this.fetchId.platform == "Email"){
      this.totalCount = this.EmailUnrespondedCmntCountByCustomer;
    } 

    if(this.fetchId.platform == "Youtube"){
      this.totalCount = this.YoutubeUnrespondedCmntCountByCustomer;
    } 
    if(this.fetchId.platform == "LinkedIn"){
      this.totalCount = this.LinkedInUnrespondedCmntCountByCustomer;
    } 

    this.draftDto = {
      userId:this.userId,
      userName:this.userName,
      profilePic:this.profilePic,
      platform:this.platform,
      postType:this.postType,
      totalCount:this.totalCount
    }
    this._sharedService.sendUserInfo(this.draftDto);
  }

  platform:any;
  userId:any;
  userName:any;
  profilePic:any;
  postType:any;
  totalCount:any;
  getUserDetails() {
    
    if(this.fetchId.id != null || undefined){
    this.filterDto = {
      // fromDate: '2000-11-30T08:15:36.365Z',
      // toDate: new Date(),
      user: this.fetchId.id || this.fetchId.slaId,
      pageId: '',
      plateForm: this.fetchId.platform,
      pageNumber: 1,
      pageSize: 10,
    };
    this.commondata.GetChannelConversationDetail(this.filterDto).subscribe((res: any) => {
      
      // this.headerDto = {
        this.userId= res.List[0].user.userId;
        this.userName= res.List[0].user.userName || res.List[0].user.userId;
        this.profilePic= res.List[0].user.profilePic;
        this.platform=res.List[0].platform;
        this.postType = res.List[0].comments[0].contentType;
      // };
      // this.UserDetails = this.headerDto;

      if(this.fetchId.platform == "Facebook"){
        this.FbUnrespondedCmntCountByCustomer = res.TotalCount;
      } 
      if(this.fetchId.platform == "WhatsApp"){
        this.WtsapUnrespondedCmntCountByCustomer = res.TotalCount;
      } 
      if(this.fetchId.platform == "Webchat"){
        this.WcUnrespondedCmntCountByCustomer = res.TotalCount;
      } 
      if(this.fetchId.platform == "SMS"){
        this.SmsUnrespondedCmntCountByCustomer = res.TotalCount;
      } 
      if(this.fetchId.platform == "Twitter"){
        this.TwitterUnrespondedCmntCountByCustomer = res.TotalCount;
      } 
      if(this.fetchId.platform == "Instagram"){
        this.InstaUnrespondedCmntCountByCustomer = res.TotalCount;
      } 
      if(this.fetchId.platform == "Email"){
        this.EmailUnrespondedCmntCountByCustomer = res.TotalCount;
      } 

      if(this.fetchId.platform == "Youtube"){
        this.YoutubeUnrespondedCmntCountByCustomer = res.TotalCount;
      } 
      if(this.fetchId.platform == "LinkedIn"){
        this.LinkedInUnrespondedCmntCountByCustomer = res.TotalCount;
      } 
       });
      }

      if(this.fetchId.slaId != null || undefined){
        this.filterDto = {
          // fromDate: '2000-11-30T08:15:36.365Z',
          // toDate: new Date(),
          user: this.fetchId.slaId,
          pageId: '',
          plateForm: this.fetchId.platform,
          pageNumber: 1,
          pageSize: 10,
        };
        this.commondata.GetSlaDetail(this.filterDto).subscribe((res: any) => {
          this.headerDto = {
            userId: res.List[0].user.userId,
            userName: res.List[0].user.userName || res.List[0].user.userId,
            profile: res.List[0].user.profilePic,
          };
          this.UserDetails = this.headerDto;
    
          if(this.fetchId.platform == "Facebook"){
            this.FbUnrespondedCmntCountByCustomer = res.TotalCount;
          } 
          if(this.fetchId.platform == "WhatsApp"){
            this.WtsapUnrespondedCmntCountByCustomer = res.TotalCount;
          } 
          if(this.fetchId.platform == "Webchat"){
            this.WcUnrespondedCmntCountByCustomer = res.TotalCount;
          } 
          if(this.fetchId.platform == "SMS"){
            this.SmsUnrespondedCmntCountByCustomer = res.TotalCount;
          } 
          if(this.fetchId.platform == "Twitter"){
            this.TwitterUnrespondedCmntCountByCustomer = res.TotalCount;
          } 
          if(this.fetchId.platform == "Instagram"){
            this.InstaUnrespondedCmntCountByCustomer = res.TotalCount;
          } 
          if(this.fetchId.platform == "Email"){
            this.EmailUnrespondedCmntCountByCustomer = res.TotalCount;
          } 
    
          if(this.fetchId.platform == "Youtube"){
            this.YoutubeUnrespondedCmntCountByCustomer = res.TotalCount;
          } 
          if(this.fetchId.platform == "LinkedIn"){
            this.LinkedInUnrespondedCmntCountByCustomer = res.TotalCount;
          } 
           });
          }
  }

  getMsgsCount() {
    if(this.fetchId.id != null || undefined){
    this.filterDto = {
      // fromDate: '2000-11-30T08:15:36.365Z',
      // toDate: new Date(),
      user: this.fetchId.id,
      pageId: '',
      plateForm: this.fetchId.platform,
      pageNumber: 1,
      pageSize: 10,
    };
    this.commondata.GetChannelMessageDetail(this.filterDto).subscribe((res: any) => {

      if(this.fetchId.platform == "Facebook"){
        this.FbUnrespondedMsgCountByCustomer = res.TotalCount;
      }
      if(this.fetchId.platform == "Twitter"){
        this.TwitterUnrespondedMsgCountByCustomer = res.TotalCount;
      } 
      
    });
  }
  if(this.fetchId.slaId != null || undefined){
    this.filterDto = {
      // fromDate: '2000-11-30T08:15:36.365Z',
      // toDate: new Date(),
      user: this.fetchId.slaId,
      pageId: '',
      plateForm: this.fetchId.platform,
      pageNumber: 1,
      pageSize: 10,
    };
    this.commondata.GetSlaDM(this.filterDto).subscribe((res: any) => {

      if(this.fetchId.platform == "Facebook"){
        this.FbUnrespondedMsgCountByCustomer = res.TotalCount;
      }
      if(this.fetchId.platform == "Twitter"){
        this.TwitterUnrespondedMsgCountByCustomer = res.TotalCount;
      } 
      
    });
  }
    
  }

  ngAfterViewChecked(){
this.totalCountsIncludingMsgs();
  }

  totalCountsIncludingMsgs(){
    
    if(this.FbUnrespondedMsgCountByCustomer == undefined){
      this.totalFbUnrespondedCountByCustomer = this.FbUnrespondedCmntCountByCustomer;
    } else if (this.FbUnrespondedCmntCountByCustomer == undefined){
      this.totalFbUnrespondedCountByCustomer = this.FbUnrespondedMsgCountByCustomer
    } else {
      this.totalFbUnrespondedCountByCustomer = (this.FbUnrespondedCmntCountByCustomer + this.FbUnrespondedMsgCountByCustomer);
    }

    if(this.TwitterUnrespondedCmntCountByCustomer == undefined){
      this.totalTwitterUnrespondedCountByCustomer = this.TwitterUnrespondedMsgCountByCustomer;
    } else if (this.TwitterUnrespondedMsgCountByCustomer == undefined){
      this.totalTwitterUnrespondedCountByCustomer = this.TwitterUnrespondedCmntCountByCustomer
    } else {
      this.totalTwitterUnrespondedCountByCustomer = (this.TwitterUnrespondedCmntCountByCustomer + this.TwitterUnrespondedMsgCountByCustomer);
    }
    
  }
  AgentsTeamList:any;
  AgentDetails:any;

  getAgentsTeamList(){
    this.commondata.GetAgentsTeamList().subscribe((res:any)=>{
      this.AgentsTeamList = res;
    });
  }

  getAgentById(){
    this.commondata.GetAgentById(this.agentId).subscribe((res:any)=>{
      this.AgentDetails = res;
    });
  }

  markAsCompleteDto = new MarkAsCompleteDto();

  markAsComplete(string: any, userId: any) {
    
    this.markAsCompleteDto.user = userId;
    this.markAsCompleteDto.plateForm = 'Facebook';

    this.commondata.MarkAsComplete(this.markAsCompleteDto).subscribe((res: any) => {
        if (res.message === 'Success Responded') {
          alert(res.message);
          this.route.navigateByUrl('/all-inboxes/conversation');
          this.headerService.updateMessage(string);
        }
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  openedTab() {
    if (this.fetchposttype.postType == 'IC') {
      this.facebookTab = false;
      this.instagramTab = true;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'FC') {
      this.facebookTab = true;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'FCP') {
      this.facebookTab = true;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'TT') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = true;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'TM') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = true;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'Message') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = true;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'Mail') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = true;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'YC') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = true;
      this.phoneTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'WM') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = true;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'SMS') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = true;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'Phone') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = true;
      this.webChatTab = false;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'WC') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = true;
      this.linkedInTab=false;
      this.playStoreTab=false;
    }
    if (this.fetchposttype.postType == 'LIC') {
      this.facebookTab = false;
      this.instagramTab = false;
      this.whatsappTab = false;
      this.smsTab = false;
      this.twitterTab = false;
      this.emailTab = false;
      this.youtubeTab = false;
      this.phoneTab = false;
      this.webChatTab = false;
      this.linkedInTab=true;
      this.playStoreTab=false;
    }
  }

  showAgentsList : boolean = false;
  showMoreOptions : boolean = false;
  showTeamList(){
    this.getAgentsTeamList();
    this.showAgentsList = true;
    this.showMoreOptions = false;
  }

  hideTeamList(){
    this.showAgentsList = false;
    this.showMoreOptions = true;
  }
  closeTeamList(){
    this.showAgentsList = false;
    this.showMoreOptions = false;
  }

  sendAgentId(id:string){
    
    this.assignQuerryDto = {
      agentId : Number(localStorage.getItem('agentId')),
      profileId : 561,
      agentIds: id.toString()
    }
  }
  assignToAnotherAgent(){
    
    this.commondata.AssignToAnotherAgent(this.assignQuerryDto).subscribe((res:any)=>{
      alert(res.message)
    },
    ({error})=>{
      alert(error.message)
    });
  }

}
