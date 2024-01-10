import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
import { FilterService } from 'src/app/services/FilterService/filter.service';
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

  ConversationList: any[] = [];
  TotalUnresponded: number = 0;
  TodayDate: any;
  pageNumber: number = 1;
  pageSize: number = 50;
  platform: any;

  listingDto = new ListingDto();
  filterDto = new FiltersDto();
  assignQuerryDto = new AssignQuerryDto();

  public criteria!: SortCriteria;
  public subscription!: Subscription;

  constructor(
    private headerService: HeaderService,
    private fetchId: FetchIdService,
    private shareddata: SharedService,
    private SpinnerService: NgxSpinnerService,
    private fetchposttype: FetchPostTypeService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef,
    private leftsidebar: LeftsidebarExpandedService,
    private commondata: CommonDataService,
    private filterService: FilterService,
    private _route: ActivatedRoute,
    private router : Router
  ) {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
  }

  ngOnInit(): void {
    this.TodayDate = new Date();

    this.getSlaList();
    this.getPlatform();

    this.signalRService.startConnection();
    this.addTransferChatDataListener();

    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
      (tooltipNode) => new Tooltip(tooltipNode)
    );
  }

  totalPageNumbers: any;
  filter: any;

  getPlatform() {
    this.subscription = this.filterService.getTogglePanel().subscribe((res) => {
      this.platform = res;
      this.getSlaList();
    });
  }

  to: any = 1;
  from: any = this.pageSize;

  getSlaList() {
    
    this.filterDto = {
      // fromDate : new Date(),
      // toDate : new Date(),
      user: '',
      pageId: '',
      plateForm: this.platform,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      isAttachment: false,
      queryType: '',
      text: '',
      userName: '',
      notInclude: '',
      include: '',
      flag: '',
    };
    this.SpinnerService.show();
    this.commondata
      .GetSlaList(this.filterDto)
      .subscribe((res: any) => {
        
        this.SpinnerService.hide();
        this.ConversationList = res.List;
        this.TotalUnresponded = res.TotalCount;
        if (this.TotalUnresponded < this.from) {
          this.from = this.TotalUnresponded;
        }
      //  // // console.log("list", this.ConversationList)
      });
  }

  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on('SendData', (data) => {
      
      data.conversationQueues.forEach((newMsg: any) => {
        const index = this.ConversationList.findIndex((obj) => obj.user === newMsg.user);
        if (index !== -1) {
          this.ConversationList.forEach((main: any) => {
            if (newMsg.user == main.user) {
              this.listingDto = newMsg;
              this.listingDto.unrespondedCount = main.unrespondedCount + newMsg.unrespondedCount;
              this.ConversationList[index] = this.listingDto;
            }
          });
        } else {
          this.ConversationList.push(newMsg);
        }
      //  // // console.log("after signalR", this.ConversationList)
        this.changeDetect.detectChanges();
      });
    });
  };

  Reload() {
    this.TotalUnresponded = 0;
    this.getSlaList();

    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
  }

  // ngAfterViewChecked() {
  //   this.totalCount();
  // }
  // totalCount() {
  //   this.shareddata.unRespondedCount(this.TotalUnresponded);
  // }

  updatevalue(
    string: any,
    id: any,
    postType: any,
    userId: any,
    leftExpandedMenu: any,
    platform: any,
    profileId: any
  ) {this.assignQuerryDto = {
    userId: Number(localStorage.getItem('agentId')),
     profileId: profileId,
     agentIds: 'string',
     platform: platform
   };

   this.commondata.AssignQuerry(this.assignQuerryDto).subscribe((res:any) =>{
     this.reloadComponent('queryallocated');
     this.router.navigateByUrl("/responder/"+platform);
     this.headerService.updateMessage(string);
   this.leftsidebar.updateMessage(leftExpandedMenu);
   this.fetchId.setPlatform(platform);
   this.fetchId.setOption(id);
   this.fetchId.setIds(id, userId, postType);
   this.fetchposttype.sendPostType(postType);
   localStorage.setItem('profileId', profileId)
    },
    (error) => {
     this.reloadComponent('queryallocatedtoanotheruser');
    })
  }
  AlterMsg:any;
  toastermessage = false;

  reloadComponent(type: any) {
    if (type == 'queryallocatedtoanotheruser') {
      this.AlterMsg = 'Profile Already Allocated to Another Agent!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'queryallocated') {
      this.AlterMsg = 'Querry Assigned Successfully!';
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
    //  // // console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    } else {
      this.ConversationList.forEach((d: any) => {
        for (var i = 0; i <= this.Ids.length; i++) {
          var abc = this.Ids.find((x) => x.Id == d.id);
          this.Ids.splice(abc, 1);
        }
      });
    //  // // console.log(this.Ids);
      this.isChecked = false;
      this.isCheckedAll = false;
    }
  }

  isAllSelected(evt: any, index: any, platform: any) {
    let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      this.Ids.push(id);
    //  // // console.log(this.Ids);
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

  NextPage(pageNumber: any) {
    if (this.TotalUnresponded < this.from) {
      this.from = this.TotalUnresponded;
    }
    this.totalPageNumbers = Math.round(this.TotalUnresponded / this.pageSize);
    let page = pageNumber + 1;
    if (page <= this.totalPageNumbers) {
      this.pageNumber = page;
      // if (this.MachineUsers.find(x => x.isChecked == true)){
      //   this.isChecked = false;
      //   this.isCheckedAll = false;
      //   this.masterSelected = false;
      //   }
      this.getSlaList();
      if (this.TotalUnresponded - this.from > this.pageSize) {
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
        // if (this.MachineUsers.find(x => x.isChecked == true)){
        //   this.isChecked = false;
        //   this.isCheckedAll = false;
        //   this.masterSelected = false;
        //   }
        this.getSlaList();
        this.from = this.from - this.pageSize;
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

  isAttachment = false
  hasAttachment() {
    this.isAttachment = !this.isAttachment;
    this.getSlaList();
  }

}
