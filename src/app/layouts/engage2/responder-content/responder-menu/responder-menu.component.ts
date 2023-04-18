import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { AssignQuerryDto } from 'src/app/shared/Models/AssignQuerryDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { ListingDto } from 'src/app/shared/Models/ListingDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'responder-menu',
  templateUrl: './responder-menu.component.html',
  styleUrls: ['./responder-menu.component.scss'],
})
export class ResponderMenuComponent implements OnInit {
  @Output() someEvent = new EventEmitter<'123'>();

  filterOpen: boolean = false;
  AllocatedProfiles: any[] = [];
  SlaList: any = 0;
  TotalUnresponded: number = 0;
  TodayDate: any;
  pageNumber: number = 1;
  pageSize: number = 20;

  listingDto = new ListingDto();
  filterDto = new FiltersDto();
  assignQuerryDto = new AssignQuerryDto();

  public criteria!: SortCriteria;

  alertWarning = false;
  alertDanger = false;

  constructor(
    private _route: Router,
    private fetchId: FetchIdService,
    private SpinnerService: NgxSpinnerService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef,
    private commondata: CommonDataService
  ) {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
  }

  ngOnInit(): void {
    this.TodayDate = new Date();

    this.getAllocatedProfiles();

    setInterval(() => {
      if (this.userSpecificAllocatedProfiles != null || this.userSpecificAllocatedProfiles != undefined) {
        this.TodayDate = new Date();
        this.userSpecificAllocatedProfiles?.forEach((item: any) => {
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
          // console.log("slaFlag", item['slaFlag'])
        });
      }

      //  console.log("list", this.userSpecificAllocatedProfiles)
    }, 1000);
  }

  totalPageNumbers: any;
  userSpecificAllocatedProfiles :any[]= [];

  getAllocatedProfiles() {
    
    this.SpinnerService.show();
    this.commondata
      .GetAllocatedProfiles()
      .subscribe((res: any) => {
        this.SpinnerService.hide();
        this.AllocatedProfiles = res;
        
        this.AllocatedProfiles.forEach((profile:any) => {
          if(profile.userId == localStorage.getItem('agentId')){
            this.userSpecificAllocatedProfiles.push(profile)
          }
        });
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
        //   this.userSpecificAllocatedProfiles.push(this.listingDto);
        // }
      });
      this.changeDetect.detectChanges();
    });
  };

  assignedProfile = localStorage.getItem('assignedProfile');

  updatevalue(
    fromId: any,
    platform: any,
    profileId: any
  ) {
    
    if (
      this.assignedProfile == null ||
      this.assignedProfile == '' ||
      this.assignedProfile == undefined
    ) {
      this.fetchId.setPlatform(platform);
      if (localStorage.getItem('parent') == platform) {
        this.fetchId.sendAutoAssignedId(fromId);
       // this.fetchposttype.sendPostTypeAsObservable(postType);
      } else {
        this.fetchId.setOption(fromId);
      //  this.fetchposttype.sendPostType(postType);
      }

      localStorage.setItem('profileId', profileId);

      this.assignQuerryDto = {
        userId: Number(localStorage.getItem('agentId')),
        //  agentId : 2,
        profileId: profileId,
        agentIds: 'string',
        platform: platform,
      };

      this.commondata.AssignQuerry(this.assignQuerryDto).subscribe(
        (res: any) => {
          if (res?.message === 'Query Assign Successfully to Aggent') {
            //   alert(res.message);
            this._route.navigateByUrl('/responder/' + platform);
          }
        },
        ({ error }) => {
          alert(error.message);
        }
      );
    } else {
      this.reloadComponent('querryAssigned')
    }
  }

  FilterOpen() {
    this.filterOpen = !this.filterOpen;
  }

  closeToaster() {
    this.toastermessage = false;
  }

  AlterMsg: any;
  toastermessage: any;

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
