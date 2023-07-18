import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListingDto } from 'src/app/shared/Models/ListingDto';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
import { AssignQuerryDto } from 'src/app/shared/Models/AssignQuerryDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { FilterService } from 'src/app/services/FilterService/filter.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { UpdateListService } from 'src/app/services/UpdateListService/update-list.service';
import { GetAgentReportDto } from 'src/app/shared/Models/GetAgentReportDto';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';
import { RemoveAssignedQuerryService } from 'src/app/services/RemoveAssignedQuery/remove-assigned-querry.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  unread = false;
  alertWarning = false;
  alertDanger = false;

  currentDate: any = new Date();

  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;

  Ids: any[] = [];

  ConversationList: any[] = [];
  TotalUnresponded: number = 0;
  TodayDate: any;
  pageNumber: number = 1;
  pageSize: number = 20;
  platform: any;
  updatedList: any;

  isAttachment = false;

  listingDto = new ListingDto();
  filterDto = new FiltersDto();
  assignQuerryDto = new AssignQuerryDto();

  public criteria!: SortCriteria;
  public subscription!: Subscription;

  constructor(
    private fetchId: FetchIdService,
    private SpinnerService: NgxSpinnerService,
    private fetchposttype: FetchPostTypeService,
    private changeDetect: ChangeDetectorRef,
    private commondata: CommonDataService,
    private filterService: FilterService,
    private router: Router,
    private updateListService: UpdateListService,
    private lodeModuleService : ModulesService,
    private removeAssignedQueryService : RemoveAssignedQuerryService
  ) {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };

    // this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSSSS')
  }

  ngOnInit(): void {
    this.TodayDate = new Date();
    this.getConversationList();
    this.getPlatform();

    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
      (tooltipNode) => new Tooltip(tooltipNode)
    );

    this.subscription = this.updateListService
      .receiveList()
      .subscribe((res) => {
        
        this.updatedList = res;
        this.updateListDataListener();
      });

      this.subscription = this.removeAssignedQueryService
      .receiveAssignedQuerry()
      .subscribe((res) => {
        this.removeAssignedQueryListener(res);
      });
      

    setInterval(() => {
      if (this.ConversationList != null || this.ConversationList != undefined) {
        this.TodayDate = new Date();
        this.ConversationList?.forEach((item: any) => {
          const twentyMinutesInMs = 20 * 60 * 1000; // 20 minute in milliseconds
          const fortyMinutesInMs = 40 * 60 * 1000; // 40 minute in milliseconds
          const time = new Date(item.createdDate);
          const timeDifference = this.TodayDate.getTime() - time.getTime();
          if (
            timeDifference > twentyMinutesInMs &&
            timeDifference < fortyMinutesInMs
          ) {
            this.alertWarning = true;
            item['slaFlag'] = 'warning';
          }
          if (timeDifference > fortyMinutesInMs) {
            this.alertDanger = true;
            this.alertWarning = false;
            item['slaFlag'] = 'danger';
          } else if (
            timeDifference < twentyMinutesInMs &&
            timeDifference < fortyMinutesInMs
          ) {
            this.alertDanger = false;
            this.alertWarning = false;
            item['slaFlag'] = 'unread';
          }
        });
      }
    }, 1000);
  }

  totalPageNumbers: any;
  filter: any;

  getPlatform() {
    this.subscription = this.filterService.getTogglePanel().subscribe((res) => {
      this.platform = res;
      this.pageNumber = 1;
      this.getConversationList();
    });
  }

  to: number=0;
  from: number=0;

  getConversationList() {
    
    this.filterDto = {
      // fromDate : new Date(),
      // toDate : new Date(),
      user: '',
      pageId: '',
      plateForm: this.platform,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      isAttachment: this.isAttachment,
    };
    this.SpinnerService.show();
    this.commondata
      .GetConversationList(this.filterDto)
      .subscribe((res: any) => {
        this.SpinnerService.hide();
        this.ConversationList = res.List;
        this.TotalUnresponded = res.TotalCount;
        if (this.TotalUnresponded < this.pageSize) {
          this.from = this.TotalUnresponded;
        } else if (this.TotalUnresponded > this.pageSize && this.from < this.pageSize) {
          this.from = this.pageSize
        } 
        if(this.ConversationList.length == 0){
          this.to = 0;
        } else if(this.ConversationList.length != 0 && this.from != 0 && this.pageNumber == 1) {
          this.to = 1;
        }        
       
      });
  }

  hasAttachment() {
    this.isAttachment = !this.isAttachment;
    this.getConversationList();
  }

  updateListDataListener() {
    this.updatedList.forEach((newMsg: any) => {
      const index = this.ConversationList?.findIndex(
        (obj: any) => obj.user === newMsg.user
      );
      if (index >= 0) {
        this.ConversationList.forEach((main: any) => {
          if (newMsg.user == main.user) {
            this.listingDto = newMsg;
            this.listingDto.unrespondedCount =
              main.unrespondedCount + 1;
            this.ConversationList[index] = this.listingDto;
          }
        });
      } else if (this.ConversationList) {
        this.listingDto = newMsg;
        this.ConversationList.unshift(this.listingDto);
        // this.TotalUnresponded = this.TotalUnresponded + 1;
        if(this.ConversationList.length > this.pageSize){
          this.ConversationList.pop();
          this.TotalUnresponded = this.TotalUnresponded + 1;
        } else if(this.ConversationList.length <= this.pageSize){
          this.TotalUnresponded = this.TotalUnresponded + 1;
          this.from = this.from + 1;
        }
      } else {
        this.ConversationList = this.updatedList;
        this.to = 1
        this.TotalUnresponded = 1;
        this.from = 1;
      }
    });
    this.changeDetect.detectChanges();
  }

  removeAssignedQueryListener(res:any){
      const index = this.ConversationList.findIndex(x=>x.profileId == res.profileId)
      if(index !== -1){
        this.ConversationList.splice(index, 1);
        this.TotalUnresponded = this.TotalUnresponded - 1;
        this.from = this.from - 1;
      }
      this.changeDetect.detectChanges();
  }

  Reload() {
    this.TotalUnresponded = 0;
    this.Ids = [];
    this.getConversationList();

    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
  }

  updatevalue(
    string: any,
    id: any,
    postType: any,
    userId: any,
    leftExpandedMenu: any,
    platform: any,
    profileId: any
  ) {
    this.assignQuerryDto = {
      userId: Number(localStorage.getItem('agentId')),
      profileId: profileId,
      agentIds: 'string',
      platform: platform,
    };

    this.commondata.AssignQuerry(this.assignQuerryDto).subscribe(
      (res) => {
        
        this.reloadComponent('queryallocated');
        
        
        // this.headerService.updateMessage(string);
        // this.leftsidebar.updateMessage(leftExpandedMenu);
        this.fetchId.setPlatform(platform);
        this.fetchId.setOption(id);
        // this.fetchId.setIds(id, userId, postType);
        this.fetchposttype.sendPostType(postType);
        localStorage.setItem('profileId', profileId);
        localStorage.setItem('assignedProfile', profileId);
        this.router.navigateByUrl('/all-inboxes/responder/' + platform);

        this.lodeModuleService.updateModule('responder')
      },
      (error) => {
        this.reloadComponent('queryallocatedtoanotheruser');
      }
    );
  }
  AlterMsg: any;
  toastermessage = false;

  reloadComponent(type: any) {
    if (type == 'queryallocated') {
      this.AlterMsg = 'Querry Assigned Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'queryallocatedtoanotheruser') {
      this.AlterMsg = 'Profile Already Allocated to Another Aggent!';
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
        if (!this.Ids.includes(d.id)) {
          this.Ids.push(d.id);
        }
      });
      //  // console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    } else {
      this.ConversationList.forEach((d: any) => {
        for (var i = 0; i <= this.Ids.length; i++) {
          var abc = this.Ids.find((x) => x.Id == d.id);
          this.Ids.splice(abc, 1);
        }
      });
      //  // console.log(this.Ids);
      this.isChecked = false;
      this.isCheckedAll = false;
    }
  }

  isAllSelected(evt: any, index: any, platform: any) {
    let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      this.Ids.push(id);
      //  // console.log(this.Ids);
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
      this.isCheckedAll = false;
    }
  }

  remaining:number=0;
  NextPage(pageNumber: any) {
    
    if (this.TotalUnresponded < this.from) {
      this.from = this.TotalUnresponded;
    }
    this.totalPageNumbers = (this.TotalUnresponded / this.pageSize);
    if(this.totalPageNumbers > pageNumber){
      this.totalPageNumbers = Math.round(this.totalPageNumbers + 1);
    }
    let page = pageNumber + 1;
    if (page <= this.totalPageNumbers) {
      this.pageNumber = page;
      this.getConversationList();
      this.remaining = this.TotalUnresponded - this.from
      if (this.remaining > this.pageSize) {
        this.to = 1 + this.from;
        this.from = this.from + this.pageSize;
      } else {
        this.to = 1 + this.from;
        this.from = this.TotalUnresponded;
      }
    }
    this.pageNumber;
  }
  PreviousPage(pageNumber: any) {
    
    if (pageNumber >= 1) {
      let page = pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
        this.getConversationList();
        if(this.remaining > this.pageSize){
          this.from = this.from - this.pageSize
        } else {
          this.from = this.from - this.remaining;
        }
        if(this.to > this.pageSize){
          this.remaining = this.pageSize
        }
        if (this.to > this.pageSize) {
          this.to = this.from - (this.pageSize - 1);
        } else {
          this.to = 1;
          this.from = this.pageSize;
        }
      }
    }
  }

  closeToaster() {
    this.toastermessage = false;
  }

  getAgentReportDto = new GetAgentReportDto

  download(){
    
    this.getAgentReportDto.agentId = 1;
    this.commondata.GetAgentReport(this.getAgentReportDto).subscribe((res:any)=>{
      const a = document.createElement('a');
      a.href = res;
      a.download = 'AgentReport.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log(res)
    })
  }
}