import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/services/FilterService/filter.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'inbox-menu',
  templateUrl: './inbox-menu.component.html',
  styleUrls: ['./inbox-menu.component.scss']
})
export class InboxMenuComponent implements OnInit {


  public Subscription! :Subscription
  UnResponded : number =0;
  SlaUnResponded : number = 0;
  WaUnResponded : number =0;
  SmsUnResponded : number =0;
  FbUnResponded : number =0;
  EmailUnResponded : number =0;
  WebchatUnResponded : number =0;
  TwitterUnResponded : number =0;
  InstaUnResponded : number =0;
  LinkedInUnResponded : number =0;
  PlaystoreUnResponded : number =0;
  YoutubeUnResponded : number =0;

  constructor(private filterService : FilterService,
    private _sharedData : SharedService,
    private commonService : CommonDataService,
    private _route : ActivatedRoute,
    private route : Router) { }

  ngOnInit(): void {

    this.getAllConversationCount();
    this.getSlaCount();
    this.getEmailCount();
    this.getWhatsappCount();
    this.getSmsCount();
    this.getFacebookCount();
    this.getWebchatCount();
    this.getTwitterCount();
    this.getInstagramCount();
    this.getLinkedInCount();
    this.getPlaystoreCount();
    this.getYoutubeCount();
    
     
    this.Subscription = this._sharedData.getCount().subscribe(res => {
      this.UnResponded = res;
    })
    // this.Subscription = this._sharedData.getSlaCount().subscribe(res => {
    //   this.SlaUnResponded = res;
    // })
    // this.Subscription = this._sharedData.getWaCount().subscribe(res => {
    //   this.WaUnResponded = res;
    // })
    // this.Subscription = this._sharedData.getSmsCount().subscribe(res => {
    //   this.SmsUnResponded = res;
    // })
    // this.Subscription = this._sharedData.getFbCount().subscribe(res => {
    //   this.FbUnResponded = res;
    // })
    // this.Subscription = this._sharedData.getEmailCount().subscribe(res => {
    //   this.EmailUnResponded = res;
    // })
  }

  filterDto = new FiltersDto();
  pageNumber:number=1;
  pageSize:number=500;

  getAllConversationCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.UnResponded = res.TotalCount
    });
    
  }

  getSlaCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
    }
    this.commonService.GetSlaList(this.filterDto).subscribe((res:any)=>{
      this.SlaUnResponded = res.TotalCount
    });
  }
  getEmailCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "Email",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.EmailUnResponded = res.TotalCount
    });
    
  }
  getWhatsappCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "WhatsApp",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.WaUnResponded = res.TotalCount
    });
    
  }
  getSmsCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "SMS",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.SmsUnResponded = res.TotalCount
    });
    
  }
  getFacebookCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "Facebook",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.FbUnResponded = res.TotalCount
    });
    
  }
  getWebchatCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "Webchat",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.WebchatUnResponded = res.TotalCount
    });
    
  }
  getTwitterCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "Twitter",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.TwitterUnResponded = res.TotalCount
    });
    
  }
  getInstagramCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "Instagram",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.InstaUnResponded = res.TotalCount
    });
    
  }
  getLinkedInCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "LinkedIn",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.LinkedInUnResponded = res.TotalCount
    });
    
  }
  getPlaystoreCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "Playstore",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.PlaystoreUnResponded = res.TotalCount
    });
    
  }
  getYoutubeCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "Youtube",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.YoutubeUnResponded = res.TotalCount
    });
    
  }

  updatevalue(string:any){
    
    this.filterService.addTogglePanel(string);
    
  }
 
}

