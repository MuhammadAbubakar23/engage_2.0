import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListingDto } from 'src/app/shared/Models/ListingDto';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { FiltersDto, FiltersDtolocal } from 'src/app/shared/Models/FiltersDto';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
import { AssignQuerryDto } from 'src/app/shared/Models/AssignQuerryDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { UpdateListService } from 'src/app/services/UpdateListService/update-list.service';
import { GetAgentReportDto } from 'src/app/shared/Models/GetAgentReportDto';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';
import { RemoveAssignedQuerryService } from 'src/app/services/RemoveAssignedQuery/remove-assigned-querry.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { HeaderCountService } from 'src/app/services/headerCountService/header-count.service';

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

  isAttachment: boolean = false;

  listingDto = new ListingDto();
  filterDto = new FiltersDto();
  filterDtolocal= new FiltersDtolocal()
  assignQuerryDto = new AssignQuerryDto();

  public criteria!: SortCriteria;
  public subscription!: Subscription;

  searchForm!: FormGroup;

  text: string = '';
  userName: string = '';
  user: string = '';
  notInclude: string = '';
  include: string = '';

  fromDate: any;
  toDate: any;

  searchCustomerForm!: FormGroup;

  groupByDateList: any[] = [];

  constructor(
    private fetchId: FetchIdService,
    private SpinnerService: NgxSpinnerService,
    private fetchposttype: FetchPostTypeService,
    private changeDetect: ChangeDetectorRef,
    private commondata: CommonDataService,
    private router: Router,
    private updateListService: UpdateListService,
    private lodeModuleService: ModulesService,
    private removeAssignedQueryService: RemoveAssignedQuerryService,
    private datePipe: DatePipe,
    private userInfoService: UserInformationService,
    private headerCountService: HeaderCountService
  ) {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };

    this.searchForm = new FormGroup({
      user: new FormControl(''),
      userName: new FormControl(''),
      notInclude: new FormControl(''),
      include: new FormControl(''),
      fromDate: new FormControl(null),
      toDate: new FormControl(null),
      isAttachment: new FormControl(this.isAttachment),
      text: new FormControl(''),
      dateWithin: new FormControl(''),
    });

    this.searchCustomerForm = new FormGroup({
      userName: new FormControl(''),
    });
  }

  currentUrl: string = '';
  FlagForAssignToMe: string = '';

  ngOnInit(): void {
    

      const date_fillter= localStorage.getItem('datefillter')
      if(date_fillter){
        this.filterDtolocal=JSON.parse(date_fillter)
      }

    
    this.currentUrl = this.router.url;
    this.FlagForAssignToMe = this.currentUrl.split('/')[2];
    this.TodayDate = new Date();

    if (this.currentUrl.split('/')[2] == 'assigned_to_me') {
      this.SpinnerService.show();
      
   
 this.commondata.GetAllocatedProfiles().subscribe(
        (res: any) => {
          this.SpinnerService.hide();
          this.ConversationList = res;
          this.TotalUnresponded = this.ConversationList.length;
          this.to = 1;
          this.from = this.ConversationList.length;
          let groupedItems = this.ConversationList.reduce(
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

          this.groupByDateList = Object.keys(groupedItems).map(
            (createdDate) => {
              return {
                createdDate,
                items: groupedItems[createdDate],
              };
            }
          );
        },
        (error) => {
          this.SpinnerService.hide();
          if (error.status == 401) {
            alert('Unauthorized, Please login again');
          }
          // this.reloadComponent('')
        }
      );
    } else {
      this.getConversationList();
    }
      
     

    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
      (tooltipNode) => new Tooltip(tooltipNode)
    );

    this.subscription = this.updateListService
      .receiveList()
      .subscribe((res) => {
        
        this.updateListDataListener(res);
      });

    this.subscription = this.removeAssignedQueryService
      .receiveAssignedQuerry()
      .subscribe((res) => {
        this.removeAssignedQueryListener(res);
      });

    setInterval(() => {
      if (this.currentUrl.split('/')[2] == 'focused') {
        if (this.groupByDateList?.length > 0) {
          this.TodayDate = new Date();
          this.groupByDateList?.forEach((group: any) => {
            group.items.forEach((item: any) => {
              const twentyMinutesInMs = 20 * 60 * 1000; // 20 minute in milliseconds
              const fortyMinutesInMs = 40 * 60 * 1000; // 40 minute in milliseconds
              const time = new Date(item.createdDate);
              const timeDifference = this.TodayDate.getTime() - time.getTime();
              if (
                timeDifference < twentyMinutesInMs &&
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
      } else if (this.currentUrl.split('/')[2] == 'follow_up') {
        if (this.groupByDateList?.length > 0) {
          this.TodayDate = new Date();
          this.groupByDateList?.forEach((group: any) => {
            group.items.forEach((item: any) => {
              const twentyMinutesInMs = 20 * 60 * 1000; // 20 minute in milliseconds
              const fortyMinutesInMs = 40 * 60 * 1000; // 40 minute in milliseconds
              const time = new Date(item.follow_Up_Status);
              const timeDifference = this.TodayDate.getTime() - time.getTime();
              if (timeDifference > twentyMinutesInMs) {
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
      }
    }, 1000);
  }

  totalPageNumbers: any;
  filter: any;

  getPlatform() {
    // this.subscription = this.filterService.getTogglePanel().subscribe((res) => {
    //   this.platform = res;
    //   this.pageNumber = 1;
    //   this.getConversationList();
    // });
  }

  to: number = 0;
  from: number = 0;
  flag: string = '';

  customersList: any[] = [];

  getConversationList() {
    
    // if (this.currentUrl.split('/')[2] == 'completed') {
    //   this.flag = 'sent';
    //   this.platform = this.currentUrl.split('/')[3];
    // } else {
    this.flag = this.currentUrl.split('/')[2];
    this.platform = this.currentUrl.split('/')[3];
    // }

    if (this.searchForm.value.dateWithin == '1 day') {
      this.fromDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.searchForm.value.dateWithin == '3 days') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 2);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.searchForm.value.dateWithin == '1 week') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 6);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.searchForm.value.dateWithin == '2 weeks') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 13);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.searchForm.value.dateWithin == '1 month') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 30);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.searchForm.value.dateWithin == '2 months') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 60);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.searchForm.value.dateWithin == '6 months') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 180);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if (this.searchForm.value.dateWithin == '1 year') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 365);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;

      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    } else if ( this.searchForm.value.fromDate != null && (this.searchForm.value.toDate == null || this.searchForm.value.toDate == undefined)) {
      this.fromDate = this.searchForm.value.fromDate + 'T00:00:00.000Z';
      this.toDate = this.searchForm.value.fromDate + 'T23:59:59.999Z';
    } else if (this.searchForm.value.fromDate != null && this.searchForm.value.toDate != null) {
      this.fromDate = this.searchForm.value.fromDate + 'T00:00:00.000Z';
      this.toDate = this.searchForm.value.toDate + 'T23:59:59.999Z';
    } 
    else if ((this.searchForm.value.fromDate == null && this.searchForm.value.toDate == null) && (this.fromDate == undefined && this.toDate == undefined) && (this.flag == 'completed' || this.flag == 'sent')) {
      this.fromDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    }
    // else if ((this.searchForm.value.fromDate != null && this.searchForm.value.toDate != null) && (this.fromDate != undefined && this.toDate != undefined) && (this.flag == 'completed' || this.flag == 'sent')) {
    //   this.fromDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T00:00:00.000Z';
    //   this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
    // }

    this.searchForm.patchValue({
      text: this.text,
      user: this.user,
      userName: this.userName,
      notInclude: this.notInclude,
      include: this.include,
      isAttachment: this.isAttachment,
    });
  if(this.filterDtolocal.fromDate!=undefined ){
 this.filterDto=this.filterDtolocal
  }
  else{
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
      flag: this.flag,
    };
  }
    
    
    
    
    

    
    this.SpinnerService.show();
     localStorage.setItem('datefillter',JSON.stringify(this.filterDto))
    this.commondata.GetConversationList(this.filterDto).subscribe(
      (res: any) => {
        if (Object.keys(res).length > 0) {
          this.searchForm.reset();
          this.SpinnerService.hide();
          this.advanceSearch = false;
          this.showDateRange = false;
          this.ConversationList = res.List;
          this.TotalUnresponded = res.TotalCount;

          let groupedItems = this.ConversationList.reduce(
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

          this.groupByDateList = Object.keys(groupedItems).map(
            (createdDate) => {
              return {
                createdDate,
                items: groupedItems[createdDate],
              };
            }
          );

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
        } else if (Object.keys(res).length == 0) {
          this.SpinnerService.hide();
          this.ConversationList = [];
          this.groupByDateList = [];
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

  searchUser: string = '';

  getCustomers() {
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
      flag: '',
    };
    this.commondata.GetCustomers(this.filterDto).subscribe((res: any) => {
      this.customersList = res;
    });
  }

  getConversationListByCustomer(fromId: string) {
    this.searchForm.patchValue({
      user: fromId,
    });
    this.getConversationList();
  }

  anyTime(value: string) {
    if (value == 'Any Time') {
      this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
      this.fromDate = new Date('0001-01-01T23:59:59.999Z');
    } else if (value == 'Older then a week') {
      let currentDate = new Date();
      let olderThenAWeek = currentDate.setDate(currentDate.getDate() - 7);
      this.toDate =
        this.datePipe.transform(olderThenAWeek, 'YYYY-MM-dd') +
        'T23:59:59.999Z';

      const oneYearFromToDate = currentDate.setDate(
        currentDate.getDate() - 365
      );
      this.fromDate =
        this.datePipe.transform(oneYearFromToDate, 'YYYY-MM-dd') +
        'T00:00:00.000Z';
    } else if (value == 'Older then a month') {
      let currentDate = new Date();
      let olderThenAMonth = currentDate.setDate(currentDate.getDate() - 30);
      this.toDate =
        this.datePipe.transform(olderThenAMonth, 'YYYY-MM-dd') +
        'T23:59:59.999Z';

      const oneYearFromToDate = currentDate.setDate(
        currentDate.getDate() - 365
      );
      this.fromDate =
        this.datePipe.transform(oneYearFromToDate, 'YYYY-MM-dd') +
        'T00:00:00.000Z';
    } else if (value == 'Older then a 6 months') {
      let currentDate = new Date();
      let olderThenASixMonth = currentDate.setDate(currentDate.getDate() - 180);
      this.toDate =
        this.datePipe.transform(olderThenASixMonth, 'YYYY-MM-dd') +
        'T23:59:59.999Z';

      const oneYearFromToDate = currentDate.setDate(
        currentDate.getDate() - 365
      );
      this.fromDate =
        this.datePipe.transform(oneYearFromToDate, 'YYYY-MM-dd') +
        'T00:00:00.000Z';
    } else if (value == 'Older then a year') {
      let currentDate = new Date();
      let olderThenAYear = currentDate.setDate(currentDate.getDate() - 365);
      this.toDate =
        this.datePipe.transform(olderThenAYear, 'YYYY-MM-dd') +
        'T23:59:59.999Z';

      const oneYearFromToDate = currentDate.setDate(
        currentDate.getDate() - 365
      );
      this.fromDate =
        this.datePipe.transform(oneYearFromToDate, 'YYYY-MM-dd') +
        'T00:00:00.000Z';
    }
    this.getConversationList();
  }
  hasAttachment(value: boolean) {
    this.isAttachment = value;
    this.getConversationList();
  }

  isAttachmentChecked() {
    this.isAttachment = !this.isAttachment;
  }

  updateListDataListener(res: any) {
  const username=localStorage.getItem('username')
    if(this.searchUser=='' ){
      if (this.currentUrl.split('/')[2] === 'focused') {
        res.forEach((newMsg: any) => {
          localStorage.setItem('username',newMsg.userName)
          if (newMsg?.profileStatus?.length == 0) {
            if (this.platform === newMsg.platform && !this.isAttachment) {
              this.updateConversationList(newMsg);
            } else if (newMsg.isAttachment && this.isAttachment) {
              if (this.platform === newMsg.platform || this.platform === 'all') {
                this.updateConversationList(newMsg);
              }
            } else if (this.platform === 'all' && !this.isAttachment) {
              this.updateConversationList(newMsg);
            }
          }
        });
  
        const groupedItems = this.groupItemsByDate();
        this.groupByDateList = Object.keys(groupedItems).map((createdDate) => ({
          createdDate,
          items: groupedItems[createdDate],
        }));
  
        this.setFromAndToValues();
        this.changeDetect.detectChanges();
      }
    }
   
  }
  updateConversationList(newMsg: any) {
    const index = this.ConversationList.findIndex(
      (obj: any) => obj.user === newMsg.user
    );
    this.listingDto = newMsg;
    if (index >= 0) {
      const main = this.ConversationList[index];
      this.listingDto.unrespondedCount = main.unrespondedCount + 1;
      this.ConversationList[index] = this.listingDto;
    } else {
      this.ConversationList.unshift(this.listingDto);
      if (this.ConversationList.length > this.pageSize) {
        this.ConversationList.pop();
        this.TotalUnresponded++;
      } else if (this.ConversationList.length <= this.pageSize) {
        this.TotalUnresponded++;
        this.from++;
      }
    }
  }

  groupItemsByDate() {
    return this.ConversationList.reduce((acc: any, item: any) => {
      const date = item.createdDate?.split('T')[0];
      acc[date] = acc[date] || [];
      acc[date].push(item);
      return acc;
    }, {});
  }

  setFromAndToValues() {
    if (this.TotalUnresponded < this.pageSize) {
      this.from = this.TotalUnresponded;
    } else if (
      this.TotalUnresponded > this.pageSize &&
      this.from < this.pageSize
    ) {
      this.from = this.pageSize;
    }

    this.to =
      this.ConversationList.length === 0
        ? 0
        : this.from === 0 && this.pageNumber === 1
        ? 1
        : 0;
  }

  removeAssignedQueryListener(res: any) {
    if (this.currentUrl.split('/')[2] == 'focused') {
      this.groupByDateList.forEach((group) => {
        const index = group.items.findIndex(
          (x: any) => x.profileId == res.profileId
        );
        if (index !== -1) {
          group.items.splice(index, 1);
          this.TotalUnresponded = this.TotalUnresponded - 1;
          this.from = this.from - 1;
        }
        this.ConversationList.forEach((item: any) => {
          const index = this.ConversationList.findIndex(
            (x: any) => x.profileId == res.profileId
          );
          if (index !== -1) {
            this.ConversationList.splice(index, 1);
          }
        });
        this.changeDetect.detectChanges();
      });
    }
  }

  Reload() {
    



    if (this.FlagForAssignToMe == 'assigned_to_me') {
    }
    this.TotalUnresponded = 0;
    this.Ids = [];
    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
    this.searchForm.reset();
    this.text = '';
    this.user = '';
    this.userName = '';
    this.notInclude = '';
    this.include = '';
    this.advanceSearch = false;
    this.pageNumber = 1;
    this.pageSize = 20;
    this.to = 0;
    this.from = 0;
    this.fromDate = null;
    this.toDate = null;
    this.searchUser=''
   localStorage.removeItem('username')
    localStorage.removeItem('datefillter')
    this.getConversationList();
  }

  updatevalue(
    count: any,
    id: any,
    postType: any,
    userName: any,
    profilePic: any,
    platform: any,
    profileId: any
  ) {
    
    localStorage.setItem('previousUrl', this.currentUrl);
    if (
      this.currentUrl.split('/')[2] == 'focused' ||
      this.currentUrl.split('/')[2] == 'follow_up'
    ) {
      this.assignQuerryDto = {
        userId: Number(localStorage.getItem('agentId')),
        profileId: profileId,
        agentIds: 'string',
        platform: platform,
      };
      this.SpinnerService.show();
      this.commondata.AssignQuerry(this.assignQuerryDto).subscribe(
        (res: any) => {
          this.SpinnerService.hide();
          var userInfo = {
            unrespondedCount: count,
            userId: id,
            postType: postType,
            userName: userName,
            profilePic: profilePic,
            platform: platform,
            profileId: profileId,
          };

          // this.userInfoService.shareUserInformation(userInfo);
          this.headerCountService.shareUnresponedCount(count);
          this.reloadComponent('queryallocated');

          // this.headerService.updateMessage(string);
          // this.leftsidebar.updateMessage(leftExpandedMenu);
          this.fetchId.setPlatform(platform);
          this.fetchId.setOption(id);
          // this.fetchId.setIds(id, userId, postType);
          this.fetchposttype.sendPostType(postType);
          localStorage.setItem('profileId', profileId);
          localStorage.setItem('assignedProfile', profileId);
          this.router.navigateByUrl(this.currentUrl + '/responder/' + platform);

          this.lodeModuleService.updateModule('responder');
          if (this.from < this.TotalUnresponded) {
            this.pageNumber = 1;
            this.pageSize = 20;
            this.getConversationList();
          }
        },
        (error) => {
          this.SpinnerService.hide();
          this.reloadComponent('queryallocatedtoanotheruser');
        }
      );
    } else if (this.currentUrl.split('/')[2] == 'trash') {
      this.reloadComponent('removeFromTrashToOpen');
    } else if (this.currentUrl.split('/')[2] == 'assigned_to_me') {
      
      this.SpinnerService.show();
      this.headerCountService.shareUnresponedCount(count);
      this.fetchId.setPlatform(platform);
      this.fetchId.setOption(id);
      this.fetchposttype.sendPostType(postType);
      localStorage.setItem('profileId', profileId);
      localStorage.setItem('assignedProfile', profileId);
      this.router.navigateByUrl(this.currentUrl + '/responder/' + platform);
      this.lodeModuleService.updateModule('responder');
      this.SpinnerService.hide();
    } else {
      this.SpinnerService.show();
      this.headerCountService.shareUnresponedCount(count);
      this.fetchId.setPlatform(platform);
      this.fetchId.setOption(id);
      this.fetchposttype.sendPostType(postType);
      localStorage.setItem('profileId', profileId);
      this.router.navigateByUrl(this.currentUrl + '/responder/' + platform);
      this.SpinnerService.hide();

      this.lodeModuleService.updateModule('responder');
    }
  }
  AlterMsg: any;
  toastermessage = false;

  reloadComponent(type: any) {
    if (type == 'undoblack_list') {
      this.AlterMsg = 'Profile(s) has been removed from Blacklisted items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'undospam') {
      this.AlterMsg = 'Profile(s) has been removed from spam items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'removeFromTrashToOpen') {
      this.AlterMsg = 'Please move this item to all conversation to open';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'undosnooze') {
      this.AlterMsg = 'Profile(s) has been removed from snoozed items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'undostarred') {
      this.AlterMsg = 'Profile(s) has been removed from starred items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'undotrash') {
      this.AlterMsg = 'Profile(s) has been moved to all conversations';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'trash') {
      this.AlterMsg = 'Profile(s) moved to trash items!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'archived') {
      this.AlterMsg = 'Profile(s) has been archived!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'undoarchived') {
      this.AlterMsg = 'Profile(s) has been un-archived!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'starred') {
      this.AlterMsg = 'Profile(s) has been marked as starred!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'snooze') {
      this.AlterMsg = 'Profile(s) has been snoozed!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'spam') {
      this.AlterMsg = 'Profile(s) has been marked as spam!';
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
    if (type == 'queryallocatedtoanotheruser') {
      this.AlterMsg = 'Profile Already Allocated to Another Agent!';
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
    this.groupByDateList.forEach((group) => {
      group.items.forEach((c: any) => (c.isChecked = evt.target.checked));
      this.masterSelected = group.items.every((l: any) => l.isChecked == true);
      if (this.masterSelected == true) {
        group.items.forEach((d: any) => {
          var abc = this.Ids.find((x) => x.profileId == d.profileId);
          if (abc == undefined) {
            this.Ids.push({ profileId: d.profileId, platform: d.platform });
          }
          // if (!this.Ids.includes(item.profileId)) {
          //   this.Ids.push({ profileId: d.profileId, platform: d.platform });
          // }
        });
        //  // // console.log(this.Ids);
        this.isChecked = true;
        this.isCheckedAll = true;
      } else {
        group.items.forEach((d: any) => {
          for (var i = 0; i <= this.Ids.length; i++) {
            // var abc = this.Ids.find((x) => x.profileId == d.profileId);
            // this.Ids.splice(abc, 1);
            var indexOfQuery = this.Ids.findIndex(
              (x) => x.profileId == d.profileId
            );
            if (indexOfQuery !== -1) {
              this.Ids.splice(indexOfQuery, 1);
            }
          }
        });
        //  // // console.log(this.Ids);
        this.isChecked = false;
        this.isCheckedAll = false;
      }
    });
  }

  isAllSelected(
    evt: any,
    index: any,
    platform: any,
    profileId: any,
    date: any
  ) {
    // let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      this.Ids.push({ profileId: profileId, platform: platform });
    }
    if (evt.target.checked == false) {
      var indexOfQuery = this.Ids.findIndex((x) => x.profileId == profileId);
      if (indexOfQuery !== -1) {
        this.Ids.splice(indexOfQuery, 1);
      }
    }
    this.groupByDateList.forEach((group) => {
      if (group.createdDate == date) {
        group.items[index].isChecked = evt.target.checked;

        this.masterSelected = this.ConversationList.every(
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
      this.Ids = [];
      this.isChecked = false;
      this.isCheckedAll = false;
      this.masterSelected = false;
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
        this.Ids = [];
        this.isChecked = false;
        this.isCheckedAll = false;
        this.masterSelected = false;
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
        a.download = 'AgentReport' + this.fromDate + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // console.log(res);
      });
  }

  advanceSearch: boolean = false;

  AdvanceSearch() {
    this.advanceSearch = !this.advanceSearch;
  }

  CloseAdvanceSearch() {
    localStorage.removeItem('datefillter')
    this.advanceSearch = false;
  }

  ResetSearchForm() {
    this.searchForm.reset();
    this.text = '';
    this.user = '';
    this.userName = '';
    this.notInclude = '';
    this.include = '';
    this.getConversationList();
    localStorage.removeItem('datefillter')
  }

  anyTimeDropdown = false;
  showDateRange = false;

  ShowDateRange() {
    this.anyTimeDropdown = false;
    this.showDateRange = true;
  }
  CloseDateRange() {
    this.anyTimeDropdown = true;
    this.showDateRange = false;
  }

  itemsToBeUpdated: any[] = [];

  InsertTagInProfile(tagName: string, type: string) {
    this.Ids.forEach((query: any) => {
      var obj = {
        feedId: query.profileId,
        tagName: tagName,
        type: type,
        platform: query.platform,
      };
      this.itemsToBeUpdated.push(obj);
    });
    this.commondata
      .InsertTagInProfile(this.itemsToBeUpdated)
      .subscribe((res: any) => {
        if (res.message === 'Data Added Successfully') {
          this.itemsToBeUpdated = [];
          this.reloadComponent(tagName);
          this.Reload();
        }
      });
  }

  RemoveTagInProfile(tagName: string, type: string) {
    this.Ids.forEach((query: any) => {
      var obj = {
        feedId: query.profileId,
        tagName: tagName,
        type: type,
        platform: query.platform,
      };
      this.itemsToBeUpdated.push(obj);
    });
    this.commondata
      .RemoveTagInProfile(this.itemsToBeUpdated)
      .subscribe((res: any) => {
        if (res.message === 'Data Deleted Successfully') {
          this.itemsToBeUpdated = [];
          this.reloadComponent('undo' + tagName);
          this.Reload();
        }
      });
  }

  // Delete() {
  //   this.Ids.forEach((id: any) => {
  //     // var obj = {
  //     //   channel: '',
  //     //   flag: 'trash',
  //     //   status: true,
  //     //   messageId: 0,
  //     //   profileId: id,
  //     // };
  //     var obj = {
  //       feedId: id,
  //       tagName: 'Trash',
  //       type: 'Tag',
  //       platform: true,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('delete');
  //         this.Reload();
  //       }
  //     });
  // }

  // UndoDelete() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'trash',
  //       status: false,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('undoDelete');
  //         this.Reload();
  //       }
  //     });
  // }

  // Archive() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'archived',
  //       status: true,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('archive');
  //         this.Reload();
  //       }
  //     });
  // }
  // Unarchive() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'archived',
  //       status: false,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('unarchive');
  //         this.Reload();
  //       }
  //     });
  // }

  // Snooze() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'snoozed',
  //       status: true,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('snooze');
  //         this.Reload();
  //       }
  //     });
  // }

  // RemoveSnooze() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'snoozed',
  //       status: false,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('removeSnooze');
  //         this.Reload();
  //       }
  //     });
  // }

  // Spam() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'spam',
  //       status: true,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('spam');
  //         this.Reload();
  //       }
  //     });
  // }

  // RemoveSpam() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'spam',
  //       status: false,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('removeSpam');
  //         this.Reload();
  //       }
  //     });
  // }

  // Starred() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'starred',
  //       status: true,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('starred');
  //         this.Reload();
  //       }
  //     });
  // }

  // RemoveStarred() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'starred',
  //       status: false,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('RemoveStarred');
  //         this.Reload();
  //       }
  //     });
  // }

  // Unblock() {
  //   this.Ids.forEach((id: any) => {
  //     var obj = {
  //       channel: '',
  //       flag: 'blacklist',
  //       status: false,
  //       messageId: 0,
  //       profileId: id,
  //     };
  //     this.itemsToBeUpdated.push(obj);
  //   });
  //   this.commondata
  //     .UpdateStatus(this.itemsToBeUpdated)
  //     .subscribe((res: any) => {
  //       if (res.message === 'Status Updated Successfully') {
  //         this.itemsToBeUpdated = [];
  //         this.reloadComponent('unblock');
  //         this.Reload();
  //       }
  //     });
  // }
}
