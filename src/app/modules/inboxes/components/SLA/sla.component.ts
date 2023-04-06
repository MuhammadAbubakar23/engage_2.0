import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { LeftsidebarExpandedService } from 'src/app/services/LeftSideBar-Expanded/leftsidebar-expanded.service';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { AssignQuerryDto } from 'src/app/shared/Models/AssignQuerryDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { ListingDto } from 'src/app/shared/Models/ListingDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.scss']
})
export class SlaComponent implements OnInit {

  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;

  Ids: any[] = [];

  ConversationList:any;
  TotalUnresponded: number = 0;
  TodayDate: any;
  pageNumber:number=1;
  pageSize:number=300;

  listingDto = new ListingDto();
  filterDto = new FiltersDto();
  assignQuerryDto = new AssignQuerryDto();

  public criteria!: SortCriteria;

  constructor(
    private headerService: HeaderService,
    private fetchId: FetchIdService,
    private shareddata: SharedService,
    private SpinnerService: NgxSpinnerService,
    private fetchposttype: FetchPostTypeService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef,
    private leftsidebar: LeftsidebarExpandedService,
    private commondata : CommonDataService
  ) {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
  }

  ngOnInit(): void {
    this.TodayDate = new Date();

    this.getSlaList();

    // this.signalRService.startConnection();
    // this.addTransferChatDataListener();
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
  }

  getSlaList(){
    this.filterDto ={
      // fromDate : "2022-12-07T08:17:33.090Z",
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize
    }
    this.SpinnerService.show();
    this.commondata.GetSlaList(this.filterDto).subscribe((res:any)=>{
      this.SpinnerService.hide();
      this.ConversationList = res.List;

      this.TotalUnresponded = res.TotalCount
    })
  }

  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on('UnrespondedTweetsChats', (data) => {
      // this.TwitterList.forEach((abc: any) => {
      //   this.TwitterIds.push(abc.id);
      // });
      data.Data.forEach((xyz: any) => {
        this.listingDto = {
          id: xyz.id,
          userName: xyz.userName,
          unrespondedCount: xyz.unrespondedCount,
          message: xyz.message,
          createdDate: xyz.createdDate,
          platform: data.Platform,
          user: xyz.userId,
          postType: xyz.postType,
          url: 'conversation:twitter',
          userId: 0,
        };
        // if (!this.TwitterIds.includes(xyz.id)) {
        //    this.TwitterList.push(this.listingDto);
        //   this.ConversationList.push(this.listingDto);
        // }
      });
      this.changeDetect.detectChanges();
    });
  };

  Reload() {
    this.TotalUnresponded=0;
    this.getSlaList();

    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
  }

  ngAfterViewChecked() {
    this.totalCount();
  }

  totalCount() {
    this.shareddata.unRespondedCount(this.TotalUnresponded);
  }

  updatevalue(
    string: any,
    id: any,
    postType: any,
    userId: any,
    leftExpandedMenu: any,
    platform:any,
    profileId:any
  ) {
   // this.socialHeader.getRouteParam('sla');
    this.headerService.updateMessage(string);
    this.leftsidebar.updateMessage(leftExpandedMenu);
   this.fetchId.setPlatform(platform);
   this.fetchId.setSlaId(id);

    // if (id.includes('+')) {
    //   this.fetchId.setOption(id.split('+')[1]);
    // } else {
    //   this.fetchId.setOption(id);
    // }
    this.fetchId.setIds(id, userId, postType);
    this.fetchposttype.sendPostType(postType);

    this.assignQuerryDto = {
      agentId : Number(localStorage.getItem('agentId')),
      profileId : profileId,
      agentIds : "string"
    }

    this.commondata.AssignQuerry(this.assignQuerryDto).subscribe((res:any)=>{
      
      if(res.message === "Query Assign Successfully to Aggent"){
        alert(res.message);
      }
      
    },
    ({error}) => {
      
      alert(error.message)
    }
    )
  }

  checkUncheckAll(evt: any) {
    this.ConversationList.forEach(
      (c: any) => (c.isChecked = evt.target.checked)
    );
    this.masterSelected = this.ConversationList.every(
      (l: any) => l.isChecked == true
    );
    if (this.masterSelected == true) {
      this.ConversationList.forEach((d: any) => {
        // var abc = this.Ids.find(
        //   (x) => x.Id == d.id && x.Platform == d.Platform
        // );
        if (!(this.Ids.includes(d.id))) {
          this.Ids.push(d.id);
        }
      });
      console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    } else {
      this.ConversationList.forEach((d: any) => {
        for (var i = 0; i <= this.Ids.length; i++) {
          var abc = this.Ids.find(
            (x) => x.Id == d.id
          );
          this.Ids.splice(abc, 1);
        }
      });
      console.log(this.Ids);
      this.isChecked = false;
      this.isCheckedAll = false;
    }
  }

  isAllSelected(evt: any, index: any, platform: any) {
    let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      ;
      this.Ids.push(id);
      console.log(this.Ids);
    }
    if (evt.target.checked == false) {
      var abc = this.Ids.find((x) => x.Id == id);
      this.Ids.splice(abc, 1);
    }
    this.ConversationList[index].isChecked = evt.target.checked;
    this.masterSelected = this.ConversationList.every(
      (l: any) => l.isChecked == true
    );

    let checkselectedlogs = this.ConversationList.find(
      (x: any) => x.isChecked == true
    );
    if (this.masterSelected == true) {
      this.isChecked = true;
      this.isCheckedAll = true;
    } else if (checkselectedlogs != undefined) {
      this.isChecked = true;
      this.isCheckedAll = false;
    } else {
      this.isChecked = false;
    }
  }

}
