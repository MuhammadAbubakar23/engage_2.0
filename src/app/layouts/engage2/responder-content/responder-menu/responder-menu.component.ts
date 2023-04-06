import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
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
  selector: 'responder-menu',
  templateUrl: './responder-menu.component.html',
  styleUrls: ['./responder-menu.component.scss']
})
export class ResponderMenuComponent implements OnInit {

  filterOpen:boolean = false;
  ConversationList: any = 0;
  SlaList: any = 0;
  TotalUnresponded: number = 0;
  TodayDate: any;
  pageNumber: number = 1;
  pageSize: number = 20;

  listingDto = new ListingDto();
  filterDto = new FiltersDto();
  assignQuerryDto = new AssignQuerryDto();

  public criteria!: SortCriteria;

  constructor(
    private _route: Router,
    private headerService: HeaderService,
    private fetchId: FetchIdService,
    private shareddata: SharedService,
    private SpinnerService: NgxSpinnerService,
    private fetchposttype: FetchPostTypeService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef,
    private leftsidebar: LeftsidebarExpandedService,
    private commondata: CommonDataService
  ) {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
  }

  ngOnInit(): void {
    this.TodayDate = new Date();

    this.getConversationList();

    // this.signalRService.startConnection();
    // this.addTransferChatDataListener();
  }

  totalPageNumbers: any;
  reroute(user:any){
    let a:string = 'responder/(c1:'+ user.platform+')';
    this._route.navigateByUrl(a);
  }
  getConversationList() {
    
    this.filterDto = {
      // fromDate : new Date(),
      // toDate : new Date(),
      user: '',
      pageId: '',
      plateForm: '',
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    this.SpinnerService.show();
    this.commondata
      .GetConversationList(this.filterDto)
      .subscribe((res: any) => {
        this.SpinnerService.hide();
        this.ConversationList = res.List;
        this.TotalUnresponded = res.TotalCount;
       
      });
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
    platform: any,
    profileId: any
  ) {
    debugger
   // this.socialHeader.getRouteParam('conversation');
    this.headerService.updateMessage(string);
    this.leftsidebar.updateMessage(leftExpandedMenu);
    this.fetchId.setPlatform(platform);
    this.fetchId.sendAutoAssignedId(id);
    this.fetchId.setIds(id, userId, postType);
    this.fetchposttype.sendPostType(postType);

    this.assignQuerryDto = {
      agentId: Number(localStorage.getItem('agentId')),
      profileId: profileId,
      agentIds: 'string',
    };

    this.commondata.AssignQuerry(this.assignQuerryDto).subscribe(
      (res: any) => {
        if (res.message === 'Query Assign Successfully to Aggent') {
          alert(res.message);
        }
      },
      ({ error }) => {
        alert(error.message);
      }
    );
  }

  FilterOpen(){
    this.filterOpen = !this.filterOpen
  }
}
