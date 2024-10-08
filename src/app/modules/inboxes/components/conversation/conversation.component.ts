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
import { HeaderCountService } from 'src/app/services/headerCountService/header-count.service';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { SkillIdsService } from 'src/app/services/sendSkillIds/skill-ids.service';
import { SkillslugService } from 'src/app/services/skillSlug/skillslug.service';
import { InsertTagInProfileFeedDto } from 'src/app/shared/Models/InsertTagaInProfileFeedDto';
import { SearchFilterService } from 'src/app/services/SearchFilter/search-filter.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NotificationSoundService } from 'src/app/shared/services/notificationSound/notification-sound.service';
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
  blueTick: boolean = false;
  listingDto = new ListingDto();
  filterDto = new FiltersDto();
  filterDtolocal = new FiltersDtolocal();
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
  totalPages: any;
  searchCustomerForm!: FormGroup;
  groupByDateList: any[] = [];
  hasAdvanceSerachPermission: boolean = false;
  hasanytimeeSerachPermission: boolean = false;
  hasAttachementeSerachPermission: boolean = false;
  hasSearchInboxPermission: boolean = false;
  hasSearchFromPermission: boolean = false;
  priorityHigh:any
  priorityUrgent:any
  priorityMedium:any
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
    private headerCountService: HeaderCountService,
    private getWing: GetWingsService,
    private storage: StorageService,
    private sendSkillId: SkillIdsService,
    private sendSkillSlug: SkillslugService,
    private getSkillSlug: SkillslugService,
    public searchFilterService: SearchFilterService,
    private _perS: PermissionService,
    private triggerNotification : NotificationSoundService
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
      dateWithin: new FormControl('1 week'),
      hasBlueTick: new FormControl(''),
    });
    this.searchCustomerForm = new FormGroup({
      userName: new FormControl(''),
    });
  }
  currentUrl: string = '';
  FlagForAssignToMe: string = '';
  hasPermission(permissionName: string) {
    const isAccessible = this._perS.hasPermission(permissionName)
    return isAccessible
  }
  ngOnInit(): void {
    this.hasAdvanceSerachPermission = this.hasPermission('_searchadvance_');
    this.hasanytimeeSerachPermission = this.hasPermission('_searchanytime_');
    this.hasAttachementeSerachPermission = this.hasPermission('_searchattachment_');
    this.hasSearchInboxPermission = this.hasPermission('_searchinbox_');
    this.hasSearchFromPermission = this.hasPermission('_searchinbox_');



    this.wings = this.getWing.wings || sessionStorage.getItem('defaultWings');
    const date_fillter = sessionStorage.getItem('datefillter');

    // Sla Policies
    this.commondata.GetSlaReponder(this.wings).subscribe((res:any)=>{
      
      const SLAPolicies=res
    })

    if (date_fillter) {
      this.filterDtolocal = JSON.parse(date_fillter);
    }
    this.currentUrl = this.router.url;
    this.FlagForAssignToMe = this.currentUrl.split('/')[2];
    this.TodayDate = new Date();
    if (this.currentUrl.split('/')[2] == 'assigned_to_me') {
      this.SpinnerService.show();
      this.commondata
        .GetAllocatedProfiles(this.wings, this.skillSlug)
        .subscribe(
          (res: any) => {
            this.SpinnerService.hide();
            this.ConversationList = res;
            this.TotalUnresponded = this.ConversationList.length;
            this.from = 1;
            this.to = this.ConversationList.length;
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
      this.SpinnerService.show();
      setTimeout(() => {
        this.getConversationList();
      }, 2000);
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
              if (timeDifference > twentyMinutesInMs && timeDifference < fortyMinutesInMs
              ) {
                this.alertWarning = true;
                this.alertDanger = false;
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
    this.userName = this.searchFilterService.userNameFilter;
    this.user = this.searchFilterService.userFilter;
    this.text = this.searchFilterService.textFilter;
    this.include = this.searchFilterService.includeFilter;
    this.notInclude = this.searchFilterService.notIncludeFilter;
    this.fromDate = this.searchFilterService.fromDateFilter;
    this.toDate = this.searchFilterService.toDateFilter;
    this.isAttachment = this.searchFilterService.isAttachmentFilter;
    this.blueTick = this.searchFilterService.blueTick;
    if (this.searchFilterService.fromDateFilter != null) { this.searchForm.reset(); }
  }
  wingsList: any[] = [];
  totalPageNumbers: any;
  filter: any;
  to: number = 0;
  from: number = 0;
  flag: string = '';
  customersList: any[] = [];
  wings: any;
  isverifiedAccount: boolean = false;
  skillSlugUrl: any;
  skillSlug = this.getSkillSlug.skillSlug || '';
  getConversationList() {
    this.flag = this.currentUrl.split('/')[2];
    this.skillSlugUrl = this.currentUrl.split('/')[3];
    if (this.skillSlugUrl === 'all') {
      this.skillSlug = [];
    }
    if (this.currentUrl.toLowerCase().includes('facebook')) {
      this.platform = 'Facebook';
    } else if (this.currentUrl.toLowerCase().includes('instagram')) {
      this.platform = 'Instagram';
    } else if (this.currentUrl.toLowerCase().includes('twitter')) {
      this.platform = 'Twitter';
    } else if (this.currentUrl.toLowerCase().includes('linkedin')) {
      this.platform = 'LinkedIn';
    } else if (this.currentUrl.toLowerCase().includes('youtube')) {
      this.platform = 'Youtube';
    } else if (this.currentUrl.toLowerCase().includes('whatsapp')) {
      this.platform = 'WhatsApp';
    } else if (this.currentUrl.toLowerCase().includes('sms')) {
      this.platform = 'SMS';
    } else if (this.currentUrl.toLowerCase().includes('webchat')) {
      this.platform = 'WebChat';
    } else if (this.currentUrl.toLowerCase().includes('gmail')) {
      this.platform = 'Gmail';
    } else if (this.currentUrl.toLowerCase().includes('outlook')) {
      this.platform = 'Outlook';
    } else if (this.currentUrl.toLowerCase().includes('playstore')) {
      this.platform = 'PlayStore';
    } else if (this.currentUrl.toLowerCase().includes('all')) {
      this.platform = 'all';
    }
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
    } else if (
      this.searchForm.value.fromDate != null &&
      (this.searchForm.value.toDate == null ||
        this.searchForm.value.toDate == undefined)
    ) {
      this.fromDate = this.searchForm.value.fromDate + 'T00:00:00.000Z';
      this.toDate = this.searchForm.value.fromDate + 'T23:59:59.999Z';
    } else if (
      this.searchForm.value.fromDate != null &&
      this.searchForm.value.toDate != null
    ) {
      this.fromDate = this.searchForm.value.fromDate + 'T00:00:00.000Z';
      this.toDate = this.searchForm.value.toDate + 'T23:59:59.999Z';
    } else if (
      this.searchForm.value.fromDate == null &&
      this.searchForm.value.toDate == null &&
      this.fromDate == undefined &&
      this.toDate == undefined &&
      (this.flag == 'completed' || this.flag == 'sent')
    ) {
      // 1 day
      // this.fromDate =
      //   this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T00:00:00.000Z';
      // this.toDate =
      //   this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
      // 30 days
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 30);
      const fromDate =
        this.datePipe.transform(prevDate, 'YYYY-MM-dd') + 'T00:00:00.000Z';
      this.fromDate = fromDate;
      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
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
      hasBlueTick: this.blueTick,
    });
    if (this.filterDtolocal.fromDate != undefined) {
      this.filterDto = this.filterDtolocal;
    } else {
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
        hasBlueTick: this.searchForm.value.hasBlueTick,
        flag: this.flag,
        wings: this.wings,
        skills: this.skillSlug,
      };
    }
    this.searchFilterService.setfromDateFilter(this.fromDate);
    this.searchFilterService.setToDateFilter(this.toDate);
    this.searchFilterService.setUserNameFilter(this.userName);
    this.searchFilterService.setUserFilter(this.user);
    this.searchFilterService.setTextFilter(this.text);
    this.searchFilterService.setIncludeFilter(this.include);
    this.searchFilterService.setNotIncludeFilter(this.notInclude);
    this.searchFilterService.setisAttachmentFilter(this.searchForm.get('isAttachment')?.value);
    this.searchFilterService.setBlueTick(this.blueTick);
    this.SpinnerService.show();
    this.changeDetect.detectChanges();
    // sessionStorage.setItem('datefillter',JSON.stringify(this.filterDto))
    this.commondata.GetConversationList(this.filterDto).subscribe(
      (res: any) => {
        if (Object.keys(res).length === 0) {
          this.groupByDateList = [];
          this.from = 0;
          this.TotalUnresponded = 0;
          this.to = 0;
          this.SpinnerService.hide();
        }
        // for followTotalCounts
        res?.List?.forEach((x: any) => {
          // if (x.follow_Up_Status !== null) {
          //   this.sendCount.sendtotalCount(res.TotalCount);
          // }
          if (x.isVerified == true) {
            this.isverifiedAccount = true;
          } else {
            this.isverifiedAccount = false;
          }
        });
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
          // if (this.pageNumber == 1) {
          //   this.from = 1;
          // } else {
          //   this.from = (this.pageNumber - 1) * this.pageSize + 1;
          // }
          // this.totalPages = Math.ceil(this.TotalUnresponded / this.pageSize);
          // if (this.TotalUnresponded <= this.from + this.pageSize - 1) {
          //   this.to = this.TotalUnresponded;
          // } else {
          //   this.to = this.from + this.pageSize - 1;
          // }

          if (this.TotalUnresponded < this.pageSize) {
            this.to = this.TotalUnresponded;
          } else if (
            this.TotalUnresponded > this.pageSize &&
            this.to < this.pageSize
          ) {
            this.to = this.pageSize;
          }
          if (this.ConversationList.length == 0) {
            this.from = 0;
          } else if (
            this.ConversationList.length != 0 &&
            this.to != 0 &&
            this.pageNumber == 1
          ) {
            this.from = 1;
          }
        } else if (Object.keys(res).length == 0) {
          this.SpinnerService.hide();
          this.ConversationList = [];
          this.groupByDateList = [];
        }
      },
      (error) => {
        if (error.message.includes('401')) {
          sessionStorage.clear();
          this.router.navigateByUrl('/login');
          this.SpinnerService.hide();
        } else {
          this.SpinnerService.hide();
          alert(error.error.message);
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
      hasBlueTick: false,
      queryType: '',
      text: '',
      include: '',
      userName: this.searchUser,
      notInclude: '',
      flag: '',
      wings: '',
      skills: [],
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
      this.toDate =
        this.datePipe.transform(new Date(), 'YYYY-MM-dd') + 'T23:59:59.999Z';
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
    this.searchFilterService.setfromDateFilter(this.fromDate);
    this.searchFilterService.setToDateFilter(this.toDate);
    this.getConversationList();
  }
  hasAttachment(value: boolean) {
    this.isAttachment = value;
    this.getConversationList();
  }
  hasBlueTick(value: boolean) {
    this.blueTick = value;
    this.getConversationList();
  }
  isAttachmentChecked() {
    this.isAttachment = !this.isAttachment;
  }
  updateListDataListener(res: any) {
    const username = sessionStorage.getItem('username');
    if (this.searchUser == '') {
      if (this.currentUrl.split('/')[2] === 'focused') {
        res.forEach((newMsg: any) => {
          sessionStorage.setItem('username', newMsg.userName);
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
    // Retrieve data from storage
    let data = this.storage.retrive('skills', 'O').local;
    // Find the rule that includes the new message skill slug
    // let rule = data.find((x: any) => x.skilSlug.includes(newMsg.skillSlug));
    let rule = data.find((x: any) => x.skilSlug.includes(newMsg.rule));
    if(rule == undefined && newMsg.postType == 'WM'){
      rule = {'skilSlug':'pk_tech_whatsapp_message'}
    }
    if (rule) {
      newMsg.skillSlug = rule.skilSlug;
      // Find existing conversation in the list
      const existingConversation = this.ConversationList?.find(
        (obj: any) =>
          obj.user === newMsg.user && obj.skillSlug === newMsg.skillSlug
      );
      if (existingConversation) {
        // Update existing conversation
        existingConversation.message = newMsg.message;
        existingConversation.createdDate = newMsg.createdDate;
        existingConversation.unrespondedCount++;
      } else {
        // Check skillSlug conditions and add new conversation to the list
        if (
          this.skillSlug.length == 0 ||
          this.skillSlug[0] === newMsg.skillSlug
        ) {
          this.ConversationList.unshift(newMsg);
          if (this.ConversationList.length > this.pageSize) {
            this.ConversationList.pop();
          }
          this.TotalUnresponded++;
          this.to++;
        }
      }
      this.triggerNotification.playSound()
    } else {
      console.error('No rule found for the given skill slug.');
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
      this.to = this.TotalUnresponded;
     }
    //  else if (
    //   this.TotalUnresponded > this.pageSize &&
    //   this.to < this.pageSize
    // )
    else {
      this.to = this.pageSize;
    }

    this.from = this.ConversationList.length === 0 ? 0 : 1;
  }
  removeAssignedQueryListener(res: any) {
    if (this.currentUrl.split('/')[2] == 'focused') {
      this.groupByDateList.forEach((group) => {
        const index = group.items.findIndex(
          (x: any) =>
            x.profileId == res.profileId && x.skillSlug == res.skillSlug
        );
        if (index !== -1) {
          group.items.splice(index, 1);
          this.TotalUnresponded = this.TotalUnresponded - 1;
          if (this.to > this.TotalUnresponded) {
            this.to = this.to - 1;
          }
          else {
            this.to = this.pageSize
            this.addOneMore();

          }
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
  addOneMore(){


    this.filterDto = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      user: this.searchForm.value.user,
      pageId: '',
      plateForm: this.platform,
      pageNumber: 1,
      pageSize: 20,
      isAttachment: false,
      queryType: '',
      text: "",
      include: "",
      userName: "",
      notInclude: "",
      hasBlueTick: false,
      flag: this.flag,
      wings: this.wings,
      skills: this.skillSlug,
    };

    this.commondata.GetConversationList(this.filterDto).subscribe((res: any) => {
      console.log("conversa========>", res)
      this.ConversationList.push(res.List[19]);
      this.changeDetect.detectChanges()
    })

  }
  Reload() {
    if (this.FlagForAssignToMe == 'assigned_to_me') {
    }
    this.TotalUnresponded = 0;
    this.Ids = [];
    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
    this.searchForm.reset({
      user: '',
      userName: '',
      notInclude: '',
      include: '',
      fromDate: null,
      toDate: null,
      isAttachment: this.isAttachment,
      text: '',
      dateWithin: '1 week',
      hasBlueTick: '',
    });
    this.advanceSearch = false;
    this.pageNumber = 1;
    this.pageSize = 20;
    this.from = 0;
    this.to = 0;
    this.searchUser = '';
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('datefillter');
    this.getConversationList();
  }
  updatevalue(
    count: any,
    id: any,
    postType: any,
    userName: any,
    profilePic: any,
    platform: any,
    profileId: any,
    wing: any,
    skillId: any,
    skillSlug: string
  ) {
    sessionStorage.setItem('previousUrl', this.currentUrl);
    this.sendSkillSlug.sendSkillSlug([skillSlug]);
    if (
      this.currentUrl.split('/')[2] == 'focused' ||
      this.currentUrl.split('/')[2] == 'follow_up'
    ) {
      this.assignQuerryDto = {
        userId: Number(sessionStorage.getItem('agentId')),
        profileId: profileId,
        agentIds: 'string',
        platform: platform,
        wings: wing,
        skillSlug: skillSlug,
      };
      this.SpinnerService.show();
      this.commondata.AssignQuerry(this.assignQuerryDto).subscribe(
        (res: any) => {
          this.SpinnerService.hide();
          this.headerCountService.shareUnresponedCount(count);
          this.reloadComponent('queryallocated');
          this.fetchId.setPlatform(platform);
          this.sendSkillId.sendSkillIds(skillId);
          this.getWing.sendWings(wing);
          this.fetchId.setOption(id);
          this.fetchposttype.sendPostType(postType);
          sessionStorage.setItem('profileId', profileId);
          sessionStorage.setItem('assignedProfile', profileId);
          this.router.navigateByUrl(this.currentUrl + '/responder/' + platform);
          this.lodeModuleService.updateModule('responder');
          sessionStorage.setItem('skillSlug', skillSlug);
          if (this.to < this.TotalUnresponded) {
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
      this.sendSkillId.sendSkillIds(skillId);
      this.getWing.sendWings(wing);
      this.fetchId.setOption(id);
      this.fetchposttype.sendPostType(postType);
      sessionStorage.setItem('profileId', profileId);
      sessionStorage.setItem('assignedProfile', profileId);
      this.router.navigateByUrl(this.currentUrl + '/responder/' + platform);
      this.lodeModuleService.updateModule('responder');
      sessionStorage.setItem('skillSlug', skillSlug);
      this.SpinnerService.hide();
    } else {
      this.SpinnerService.show();
      this.headerCountService.shareUnresponedCount(count);
      this.fetchId.setPlatform(platform);
      this.sendSkillId.sendSkillIds(skillId);
      this.getWing.sendWings(wing);
      this.fetchId.setOption(id);
      this.fetchposttype.sendPostType(postType);
      sessionStorage.setItem('profileId', profileId);
      this.router.navigateByUrl(this.currentUrl + '/responder/' + platform);
      this.SpinnerService.hide();
      this.lodeModuleService.updateModule('responder');
      sessionStorage.setItem('skillSlug', skillSlug);
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
            this.Ids.push({
              profileId: d.profileId,
              platform: d.platform,
              skillSlug: d.skillSlug,
            });
          }
        });
        this.isChecked = true;
        this.isCheckedAll = true;
      } else {
        group.items.forEach((d: any) => {
          for (var i = 0; i <= this.Ids.length; i++) {
            var indexOfQuery = this.Ids.findIndex(
              (x) => x.profileId == d.profileId
            );
            if (indexOfQuery !== -1) {
              this.Ids.splice(indexOfQuery, 1);
            }
          }
        });
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
    date: any,
    skillSlug: string
  ) {
    // let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      this.Ids.push({
        profileId: profileId,
        platform: platform,
        skillSlug: skillSlug,
      });
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
  // NextPage(pageNumber: any) {
  //   if (this.TotalUnresponded < this.to) {
  //     this.to = this.TotalUnresponded;
  //   }
  //   this.totalPageNumbers = this.TotalUnresponded / this.pageSize;
  //   if (this.totalPageNumbers > pageNumber) {
  //     this.totalPageNumbers = Math.round(this.totalPageNumbers + 1);
  //   }
  //   let page = pageNumber + 1;
  //   if (page <= this.totalPageNumbers) {
  //     this.pageNumber = page;
  //     this.Ids = [];
  //     this.isChecked = false;
  //     this.isCheckedAll = false;
  //     this.masterSelected = false;
  //     this.getConversationList();
  //     this.remaining = this.TotalUnresponded - this.to;
  //     if (this.remaining > this.pageSize) {
  //       this.from = 1 + this.to;
  //       this.to = this.to + this.pageSize;
  //     } else {
  //       this.from = 1 + this.to;
  //       this.to = this.TotalUnresponded;
  //     }
  //   }
  //   this.pageNumber;
  // }
  NextPage(pageNumber: any) {
    if (this.TotalUnresponded < this.to) {
      this.to = this.TotalUnresponded;
    }
    this.totalPageNumbers = Math.ceil(this.TotalUnresponded / this.pageSize);
    let page = pageNumber + 1;
    if (page <= this.totalPageNumbers) {
      this.pageNumber = page;
      this.Ids = [];
      this.isChecked = false;
      this.isCheckedAll = false;
      this.masterSelected = false;
      this.getConversationList();
      this.remaining = this.TotalUnresponded - this.to;
      if (this.remaining > this.pageSize) {
        this.from = 1 + this.to;
        this.to = this.to + this.pageSize;
      } else {
        this.from = 1 + this.to;
        this.to = this.TotalUnresponded;
      }
    }
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
          this.to = this.to - this.pageSize;
        } else {
          this.to = this.to - this.remaining;
        }
        if (this.from > this.pageSize) {
          this.remaining = this.pageSize;
        }
        if (this.from > this.pageSize) {
          this.from = this.to - (this.pageSize - 1);
        } else {
          this.from = 1;
          this.to = this.pageSize;
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
      });
  }
  advanceSearch: boolean = false;
  AdvanceSearch() {
    this.advanceSearch = !this.advanceSearch;
  }
  CloseAdvanceSearch() {
    sessionStorage.removeItem('datefillter');
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
    sessionStorage.removeItem('datefillter');
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
  insertTagInProfileFeedDto = new InsertTagInProfileFeedDto();
  InsertTagInProfile(tagName: string, type: string) {
    this.Ids.forEach((query: any) => {
      this.insertTagInProfileFeedDto = {
        feedId: query.profileId,
        tagName: tagName,
        type: type,
        platform: query.platform,
        wings: this.getWing.wings,
        skillSlug: query.skillSlug,
      };
      this.itemsToBeUpdated.push(this.insertTagInProfileFeedDto);
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
      this.insertTagInProfileFeedDto = {
        feedId: query.profileId,
        tagName: tagName,
        type: type,
        platform: query.platform,
        wings: this.getWing.wings,
        skillSlug: query.skillSlug,
      };
      this.itemsToBeUpdated.push(this.insertTagInProfileFeedDto);
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
}
