import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {

  
  @Input() imagename: string = '';
  fullName: string = '';
  
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
  platform: string = '';
  updatedList: any;

  isAttachment : boolean = false;

  listingDto = new ListingDto();
  filterDto = new FiltersDto();
  assignQuerryDto = new AssignQuerryDto();

  public criteria!: SortCriteria;
  public subscription!: Subscription;

  searchForm !: FormGroup;

  text:string='';
  userName:string='';
  user:string='';
  notInclude:string='';
  include:string='';

  fromDate!: any;
  toDate!: any;

  searchCustomerForm !: FormGroup;

  constructor(
    private fetchId: FetchIdService,
    private SpinnerService: NgxSpinnerService,
    private fetchposttype: FetchPostTypeService,
    private changeDetect: ChangeDetectorRef,
    private commondata: CommonDataService,
    private filterService: FilterService,
    private router: Router,
    private updateListService: UpdateListService,
    private lodeModuleService: ModulesService,
    private removeAssignedQueryService: RemoveAssignedQuerryService,
    private datePipe : DatePipe
  ) {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };

    this.searchForm = new FormGroup({
      // agentId: new FormControl(0),
      user: new FormControl(""),
      userName: new FormControl(""),
      notInclude: new FormControl(""),
      include: new FormControl(""),
      // plateForm: new FormControl(""),
      fromDate: new FormControl(null),
      toDate: new FormControl(null),
      isAttachment: new FormControl(this.isAttachment),
      // queryType: new FormControl(""),
      text: new FormControl(""),
      // pageNumber: new FormControl(1),
      // pageSize: new FormControl(20),
      dateWithin: new FormControl(""),
    });

    this.searchCustomerForm = new FormGroup({
      userName: new FormControl('')
    })
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
        // this.updatedList = res;
        this.updateListDataListener(res);
      });

    this.subscription = this.removeAssignedQueryService
      .receiveAssignedQuerry()
      .subscribe((res) => {
        this.removeAssignedQueryListener(res);
      });

    setInterval(() => {
      if (this.ConversationList?.length > 0) {
        this.TodayDate = new Date();
        this.ConversationList?.forEach((group: any) => {
          group.items.forEach((item:any) => {
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

  to: number = 0;
  from: number = 0;

  customersList : any[]=[];

  getConversationList() {
    debugger;
    if(this.searchForm.value.dateWithin == "1 day"){
      this.fromDate = this.datePipe.transform((new Date), 'YYYY-MM-dd')+"T00:00:00.000Z";
      this.toDate = this.datePipe.transform((new Date), 'YYYY-MM-dd')+"T11:59:59.999Z";
    } else if(this.searchForm.value.dateWithin == "3 days"){
      let currentDate = new Date();
      let prevDate =  currentDate.setDate(currentDate.getDate() - 2);
      const fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
      this.fromDate = fromDate;

      this.toDate = this.datePipe.transform((new Date), 'YYYY-MM-dd')+"T11:59:59.999Z";
    } else if(this.searchForm.value.dateWithin == "1 week"){
      let currentDate = new Date();
      let prevDate =  currentDate.setDate(currentDate.getDate() - 6);
      const fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
      this.fromDate = fromDate;

      this.toDate = this.datePipe.transform((new Date), 'YYYY-MM-dd')+"T11:59:59.999Z";
    } else if(this.searchForm.value.dateWithin == "2 weeks"){
      let currentDate = new Date();
      let prevDate =  currentDate.setDate(currentDate.getDate() - 13);
      const fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
      this.fromDate = fromDate;

      this.toDate = this.datePipe.transform((new Date), 'YYYY-MM-dd')+"T11:59:59.999Z";
    } else if(this.searchForm.value.dateWithin == "1 month"){
      let currentDate = new Date();
      let prevDate =  currentDate.setDate(currentDate.getDate() - 30);
      const fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
      this.fromDate = fromDate;

      this.toDate = this.datePipe.transform((new Date), 'YYYY-MM-dd')+"T11:59:59.999Z";
    } else if(this.searchForm.value.dateWithin == "2 months"){
      let currentDate = new Date();
      let prevDate =  currentDate.setDate(currentDate.getDate() - 60);
      const fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
      this.fromDate = fromDate;

      this.toDate = this.datePipe.transform((new Date), 'YYYY-MM-dd')+"T11:59:59.999Z";
    } else if(this.searchForm.value.dateWithin == "6 months"){
      let currentDate = new Date();
      let prevDate =  currentDate.setDate(currentDate.getDate() - 180);
      const fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
      this.fromDate = fromDate;

      this.toDate = this.datePipe.transform((new Date), 'YYYY-MM-dd')+"T11:59:59.999Z";
    } else if(this.searchForm.value.dateWithin == "1 year"){
      let currentDate = new Date();
      let prevDate =  currentDate.setDate(currentDate.getDate() - 365);
      const fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
      this.fromDate = fromDate;

      this.toDate = this.datePipe.transform((new Date), 'YYYY-MM-dd')+"T11:59:59.999Z";
    } else if(this.searchForm.value.fromDate != null && (this.searchForm.value.toDate == null || this.searchForm.value.toDate == undefined)){
      this.fromDate = this.searchForm.value.fromDate+"T00:00:00.000Z"
      this.toDate = this.searchForm.value.fromDate+"T11:59:59.999Z"
    } else if(this.searchForm.value.fromDate != null && this.searchForm.value.toDate != null){
      this.fromDate = this.searchForm.value.fromDate+"T00:00:00.000Z"
      this.toDate = this.searchForm.value.toDate+"T11:59:59.999Z"
    } 
    
    this.searchForm.patchValue({
      text: this.text,
      user: this.user,
      userName: this.userName,
      notInclude: this.notInclude,
      include: this.include,
      isAttachment: this.isAttachment,
    });
    this.filterDto = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      user: this.searchForm.value.user,
      pageId: '',
      plateForm: this.platform,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      isAttachment: this.searchForm.value.isAttachment,
      queryType: '',
      text: this.searchForm.value.text,
      include: this.searchForm.value.include,
      userName: this.searchForm.value.userName,
      notInclude: this.searchForm.value.notInclude,
    };
    this.SpinnerService.show();
    this.commondata.GetConversationList(this.filterDto).subscribe(
      (res: any) => {
        this.searchForm.reset();
        this.SpinnerService.hide();
        this.advanceSearch = false;
        this.showDateRange = false;
        this.ConversationList = res.List;
        this.TotalUnresponded = res.TotalCount;

        let groupedItems = this.ConversationList.reduce(
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

        this.ConversationList = Object.keys(groupedItems).map((createdDate) => {
          return {
            createdDate,
            items: groupedItems[createdDate],
          };
        });

        if (this.TotalUnresponded < this.pageSize) {
          this.from = this.TotalUnresponded;
        } else if (
          this.TotalUnresponded > this.pageSize &&
          this.from < this.pageSize
        ) {
          this.from = this.pageSize;
        }
        if (this.ConversationList.length == 0) {
          this.to = 0;
        } else if (
          this.ConversationList.length != 0 &&
          this.from != 0 &&
          this.pageNumber == 1
        ) {
          this.to = 1;
        }
      },
      (error) => {
        if (error.message.includes('401')) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
          this.SpinnerService.hide();
        }
      }
    );
  }

  searchUser:string="";

  getCustomers(){
    debugger
    this.filterDto = {
      fromDate: null,
      toDate: null,
      user: '',
      pageId: '',
      plateForm: '',
      pageNumber: 1,
      pageSize: 30,
      isAttachment: false,
      queryType: '',
      text: '',
      include: '',
      userName: this.searchUser,
      notInclude: '',
    };
    this.commondata.GetCustomers(this.filterDto).subscribe((res:any)=>{
      this.customersList = res;
    });
  }

  getConversationListByCustomer(fromId:string){
    this.searchForm.patchValue({
      user : fromId
    });
    this.getConversationList();
  }

  anyTime(value:string){
    if(value == "Any Time"){
      this.toDate = null;
      this.fromDate = null;
    } else if(value == "Older then a week"){
      let currentDate = new Date();
      let olderThenAWeek =  currentDate.setDate(currentDate.getDate() - 7);
      this.toDate = this.datePipe.transform(olderThenAWeek, 'YYYY-MM-dd')+"T11:59:59.999Z";

      const oneYearFromToDate = currentDate.setDate(currentDate.getDate() - 365)
      this.fromDate = this.datePipe.transform(oneYearFromToDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
    } else if(value == "Older then a month"){
      let currentDate = new Date();
      let olderThenAMonth =  currentDate.setDate(currentDate.getDate() - 30);
      this.toDate = this.datePipe.transform(olderThenAMonth, 'YYYY-MM-dd')+"T11:59:59.999Z";

      const oneYearFromToDate = currentDate.setDate(currentDate.getDate() - 365)
      this.fromDate = this.datePipe.transform(oneYearFromToDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
    }
    else if(value == "Older then a 6 months"){
      let currentDate = new Date();
      let olderThenASixMonth =  currentDate.setDate(currentDate.getDate() - 180);
      this.toDate = this.datePipe.transform(olderThenASixMonth, 'YYYY-MM-dd')+"T11:59:59.999Z";

      const oneYearFromToDate = currentDate.setDate(currentDate.getDate() - 365)
      this.fromDate = this.datePipe.transform(oneYearFromToDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
    }
    else if(value == "Older then a year"){
      let currentDate = new Date();
      let olderThenAYear =  currentDate.setDate(currentDate.getDate() - 365);
      this.toDate = this.datePipe.transform(olderThenAYear, 'YYYY-MM-dd')+"T11:59:59.999Z";

      const oneYearFromToDate = currentDate.setDate(currentDate.getDate() - 365)
      this.fromDate = this.datePipe.transform(oneYearFromToDate, 'YYYY-MM-dd')+"T00:00:00.000Z";
    }
    this.getConversationList();
  }
  hasAttachment(value:boolean) {
    this.isAttachment = value;
    this.getConversationList();
  }

  isAttachmentChecked(){
    this.isAttachment = !this.isAttachment
  }

  updateListDataListener(res: any) {
    res.forEach((newMsg: any) => {
      if (this.platform == newMsg.platform && this.isAttachment != true) {
        this.ConversationList.forEach((group:any)=>{
          const index = group.items?.findIndex(
            (obj: any) => obj.user === newMsg.user
          );
          if (index >= 0) {
            group.items.forEach((main: any) => {
              if (newMsg.user == main.user) {
                this.listingDto = newMsg;
                this.listingDto.unrespondedCount = main.unrespondedCount + 1;
                group.items[index] = this.listingDto;
              }
            });
          } else if (group.items) {
            this.listingDto = newMsg;
            group.items.unshift(this.listingDto);
            if (group.items.length > this.pageSize) {
              group.items.pop();
              this.TotalUnresponded = this.TotalUnresponded + 1;
            } else if (group.items.length <= this.pageSize) {
              this.TotalUnresponded = this.TotalUnresponded + 1;
              this.from = this.from + 1;
            }
          } else {
            group.items = res;
            this.to = 1;
            this.TotalUnresponded = 1;
            this.from = 1;
          }
        });
        
      } else if (newMsg.isAttachment == true && this.isAttachment == true) {
        this.ConversationList.forEach((group:any)=>{
          if (this.platform == newMsg.platform) {
            const index = group.items?.findIndex(
              (obj: any) => obj.user === newMsg.user
            );
            if (index >= 0) {
              group.items.forEach((main: any) => {
                if (newMsg.user == main.user) {
                  this.listingDto = newMsg;
                  this.listingDto.unrespondedCount = main.unrespondedCount + 1;
                  group.items[index] = this.listingDto;
                }
              });
            } else if (group.items) {
              this.listingDto = newMsg;
              group.items.unshift(this.listingDto);
              if (group.items.length > this.pageSize) {
                group.items.pop();
                this.TotalUnresponded = this.TotalUnresponded + 1;
              } else if (group.items.length <= this.pageSize) {
                this.TotalUnresponded = this.TotalUnresponded + 1;
                this.from = this.from + 1;
              }
            } else {
              group.items = res;
              this.to = 1;
              this.TotalUnresponded = 1;
              this.from = 1;
            }
          } else if (this.platform == '') {
            const index = group.items?.findIndex(
              (obj: any) => obj.user === newMsg.user
            );
            if (index >= 0) {
              group.items.forEach((main: any) => {
                if (newMsg.user == main.user) {
                  this.listingDto = newMsg;
                  this.listingDto.unrespondedCount = main.unrespondedCount + 1;
                  group.items[index] = this.listingDto;
                }
              });
            } else if (group.items) {
              this.listingDto = newMsg;
              group.items.unshift(this.listingDto);
              if (group.items.length > this.pageSize) {
                group.items.pop();
                this.TotalUnresponded = this.TotalUnresponded + 1;
              } else if (group.items.length <= this.pageSize) {
                this.TotalUnresponded = this.TotalUnresponded + 1;
                this.from = this.from + 1;
              }
            } else {
              group.items = res;
              this.to = 1;
              this.TotalUnresponded = 1;
              this.from = 1;
            }
          }
        })
        
      } 
      
      else if (this.platform == '' && this.isAttachment != true) {
        this.ConversationList.forEach((group:any)=>{
          const index = group.items?.findIndex(
            (obj: any) => obj.user === newMsg.user
          );
          if (index >= 0) {
            group.items.forEach((main: any) => {
              if (newMsg.user == main.user) {
                this.listingDto = newMsg;
                this.listingDto.unrespondedCount = main.unrespondedCount + 1;
                group.items[index] = this.listingDto;
              }
            });
          } else if (group.items) {
            this.listingDto = newMsg;
            group.items.unshift(this.listingDto);
            if (group.items.length > this.pageSize) {
              group.items.pop();
              this.TotalUnresponded = this.TotalUnresponded + 1;
            } else if (group.items.length <= this.pageSize) {
              this.TotalUnresponded = this.TotalUnresponded + 1;
              this.from = this.from + 1;
            }
          } else {
            group.items = res;
            this.to = 1;
            this.TotalUnresponded = 1;
            this.from = 1;
          }
        });
      }
    });
    this.changeDetect.detectChanges();
  }

  removeAssignedQueryListener(res: any) {
    this.ConversationList.forEach((group)=>{
      const index = group.items.findIndex(
        (x:any) => x.profileId == res.profileId
      );
      if (index !== -1) {
        group.items.splice(index, 1);
        this.TotalUnresponded = this.TotalUnresponded - 1;
        this.from = this.from - 1;
      }
      this.changeDetect.detectChanges();
    })
    
  }

  Reload() {
    this.TotalUnresponded = 0;
    this.Ids = [];
    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
    this.searchForm.reset();
    this.text = "";
    this.user = "";
    this.userName = "";
    this.notInclude = "";
    this.include = "";
    this.advanceSearch = false;
    this.getConversationList();
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
      (res:any) => {
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

        this.lodeModuleService.updateModule('responder');
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
    this.ConversationList.forEach((group)=>{
      group.items.forEach(
        (c: any) => (c.isChecked = evt.target.checked)
      );
      this.masterSelected = group.items.every(
        (l: any) => l.isChecked == true
      );
      if (this.masterSelected == true) {
        group.items.forEach((d: any) => {
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
        group.items.forEach((d: any) => {
          for (var i = 0; i <= this.Ids.length; i++) {
            var abc = this.Ids.find((x) => x.Id == d.id);
            this.Ids.splice(abc, 1);
          }
        });
        //  // // console.log(this.Ids);
        this.isChecked = false;
        this.isCheckedAll = false;
      }
    });
    
  }

  isAllSelected(evt: any, index: any, platform: any) {
    let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      this.Ids.push(id);
    }
    if (evt.target.checked == false) {
      var abc = this.Ids.find((x) => x.Id == id);
      this.Ids.splice(abc, 1);
    }
    this.ConversationList.forEach((group)=>{
      group.items[index].isChecked = evt.target.checked;
      this.masterSelected = group.items.every(
        (l: any) => l.isChecked == true
      );
  
      let checkselectedlogs = group.items.find(
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
    });
    
  }

  remaining: number = 0;
  NextPage(pageNumber: any) {
    
    if (this.TotalUnresponded < this.from) {
      this.from = this.TotalUnresponded;
    }
    this.totalPageNumbers = this.TotalUnresponded / this.pageSize;
    if (this.totalPageNumbers > pageNumber) {
      this.totalPageNumbers = Math.round(this.totalPageNumbers + 1);
    }
    let page = pageNumber + 1;
    if (page <= this.totalPageNumbers) {
      this.pageNumber = page;
      this.getConversationList();
      this.remaining = this.TotalUnresponded - this.from;
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
        if (this.remaining > this.pageSize) {
          this.from = this.from - this.pageSize;
        } else {
          this.from = this.from - this.remaining;
        }
        if (this.to > this.pageSize) {
          this.remaining = this.pageSize;
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

  getAgentReportDto = new GetAgentReportDto();

  download() {
    this.getAgentReportDto.agentId = 1;
    this.commondata
      .GetAgentReport(this.getAgentReportDto)
      .subscribe((res: any) => {
        const a = document.createElement('a');
        a.href = res;
        a.download = 'AgentReport.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // console.log(res);
      });
  }

  advanceSearch:boolean=false;

  AdvanceSearch(){
    this.advanceSearch = !this.advanceSearch;
  }

  CloseAdvanceSearch(){
    this.advanceSearch = false;
  }

  ResetSearchForm(){
    this.searchForm.reset();
    this.text = "";
    this.user = "";
    this.userName = "";
    this.notInclude = "";
    this.include = "";
    this.getConversationList();
  }

  anyTimeDropdown = false;
  showDateRange = false;

  ShowDateRange(){
    this.anyTimeDropdown = false;
    this.showDateRange = true;
  }
  CloseDateRange(){
    this.anyTimeDropdown = true;
    this.showDateRange = false;
  }
}