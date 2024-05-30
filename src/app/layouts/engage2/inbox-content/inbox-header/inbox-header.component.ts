import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ClosePanelService } from 'src/app/services/ClosePanelServices/close-panel.service';
import { ChangeDetectorRef } from '@angular/core';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { RulesGroupIdsService } from 'src/app/services/RulesGroupIds/rules-group-ids.service';
@Component({
  selector: 'inbox-header',
  templateUrl: './inbox-header.component.html',
  styleUrls: ['./inbox-header.component.scss']
})
export class InboxHeaderComponent implements OnInit {

  flag:string='';
  followUpCount: number = 0;
  inboxHeader:any[]=[];
  constructor(private stor: StorageService,
    private commonService: CommonDataService,
    private reviceTotalCountServices:ClosePanelService,
    private cd:ChangeDetectorRef,
    private _route: Router,
    private getWing: GetWingsService,
    private getRulesGroupIdsService : RulesGroupIdsService) { }

  ngOnInit(): void {

    this.flag = this._route.url.split('/')[2];
    // this.getAllConversationCount();
  this.reviceTotalCountServices.reciveTaotalCounts().subscribe((res:any)=>{

    this.followUpCount=res
    console.log("FollowupCount===>",this.followUpCount)
  })
    const headerMenu = this.stor.retrive('Tags', 'O').local;
      headerMenu.forEach((item:any) => {
        if(item.name == "Engage Header"){
          
          item.subTags.forEach((singleInboxHeaderMenu:any) => {

            if(!this.inboxHeader.includes(singleInboxHeaderMenu)){
            this.inboxHeader.push(singleInboxHeaderMenu)
            }
          });
        }
      });
      // this.getFollowUpCount();
    }
  
    getFollowUpCount(){
      
      let obj = {
        agentId: 0,
        user: "",
        postId: "",
        profile_Page_Email: "string",
        plateForm: "string",
        fromDate: "2023-01-01T09:29:55.197Z",
        toDate: "2024-01-01T09:29:55.197Z",
        isAttachment: true,
        queryType: "string",
        flag: "string",
        text: "string",
        notInclude: "string",
        userName: "string",
        include: "string",
        pageNumber: 0,
        pageSize: 0,
        wings: this.getWing.wings,
        groupId: this.getRulesGroupIdsService.rulesGroupIds,
      }
      this.commonService.GetFollowUpCount(obj).subscribe((res:any)=>{
        this.followUpCount = res
      })
    }

  filterDto = new FiltersDto();
  pageNumber:number=1;
  pageSize:number=500;
  UnResponded:number=0;

  getAllConversationCount(){
    this.filterDto = {
      // fromDate : new Date(),
      // toDate : new Date(),
      user: '',
      pageId: '',
      plateForm: '',
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      hasBlueTick:false,
      isAttachment: false,
      queryType: '',
      text: '',
      userName: '',
      notInclude: '',
      include: '',
      flag: '',
      wings:'',
      skills:[]
    };
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      
      this.UnResponded = res.TotalCount
    });
    
  }

  update(menuLink: any) {
 
    this.flag = this._route.url.split('/')[2];

    if (
      localStorage.getItem('assignedProfile') == null ||
      localStorage.getItem('assignedProfile') == '' ||
      localStorage.getItem('assignedProfile') == undefined
    ) {
      this._route.navigateByUrl('/' + menuLink);
    } else {
      this.reloadComponent('querryAssigned')
    } 
    this.cd.detectChanges()
  }

  AlterMsg:any;
  toastermessage:any;
  
  reloadComponent(type: any) {
    if (type == 'querryAssigned') {
      this.AlterMsg = 'Please Complete Querry First!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
}
