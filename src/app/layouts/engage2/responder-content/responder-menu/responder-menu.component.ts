import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
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

  public Subscription!: Subscription;

  alertWarning = false;
  alertDanger = false;

  constructor(
    private _route: Router,
    private fetchId: FetchIdService,
    private SpinnerService: NgxSpinnerService,
    private signalRService: SignalRService,
    private changeDetect: ChangeDetectorRef,
    private commondata: CommonDataService,
    private unrespondedCountService: UnRespondedCountService,
    private updateCommentsService: UpdateCommentsService,
    private queryStatusService: QueryStatusService,
    private getWing: GetWingsService,
  ) {
    // this.criteria = {
    //   property: 'createdDate',
    //   descending: true,
    // };
  }
  wings:string='';
  ngOnInit(): void {
    this.wings = this.getWing.wings;
    this.TodayDate = new Date();

    this.getAllocatedProfiles();

    setInterval(() => {
      if (
        this.userSpecificAllocatedProfiles != null ||
        this.userSpecificAllocatedProfiles != undefined
      ) {
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
        });
      }
    }, 1000);

    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        if (Object.keys(res).length > 0) {
          this.userSpecificAllocatedProfiles.forEach((profile: any) => {
            if (profile.profileId == res.contentCount.profileId) {
              profile.unrespondedCount = res.contentCount.unrespondedCount;
            }
          });
        }
      });
    this.Subscription = this.updateCommentsService
      .receiveComment()
      .subscribe((res) => {
        if (Object.keys(res).length > 0) {
          res.forEach((newMsg: any) => {
            this.userSpecificAllocatedProfiles.forEach((profile: any) => {
              if (profile.fromId == newMsg.userId) {
                profile.unrespondedCount = profile.unrespondedCount + 1;
              }
            });
          });
        }
      });
    this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        if (Object.keys(res).length > 0) {
          res.forEach((newMsg: any) => {
            this.userSpecificAllocatedProfiles.forEach((profile: any) => {
              if (profile.profileId == sessionStorage.getItem('profileId')) {
                profile.unrespondedCount = 0;
              }
            });
          });
        }
      });
    this.changeDetect.detectChanges();
  }
  totalPageNumbers: any;
  userSpecificAllocatedProfiles: any[] = [];
  getAllocatedProfiles() {
    this.SpinnerService.show();
    var skillSlug= sessionStorage.getItem('skillSlug') || ''
    this.commondata.GetAllocatedProfiles(this.wings, skillSlug).subscribe((res: any) => {
      this.SpinnerService.hide();
      this.AllocatedProfiles = res;

      // this.AllocatedProfiles.forEach((profile: any) => {

      //   if (profile.userId == sessionStorage.getItem('agentId')) {
      //     this.userSpecificAllocatedProfiles.push(profile);
      //   }
      // });
    });
  }
  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on(
      'UnrespondedTweetsChats',
      (data: any) => {
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
      }
    );
  };

  assignedProfile = sessionStorage.getItem('assignedProfile');

  updatevalue(fromId: any, platform: any, profileId: any) {
    if (
      sessionStorage.getItem('assignedProfile') == null ||
      sessionStorage.getItem('assignedProfile') == '' ||
      sessionStorage.getItem('assignedProfile') == undefined
    ) {
      this.fetchId.setPlatform(platform);
      if (sessionStorage.getItem('parent') == platform) {
        this.fetchId.sendAutoAssignedId(fromId);
        // this.fetchposttype.sendPostTypeAsObservable(postType);
      } else {
        this.fetchId.setOption(fromId);
        //  this.fetchposttype.sendPostType(postType);
      }

      sessionStorage.setItem('profileId', profileId);

      this.assignQuerryDto = {
        userId: Number(sessionStorage.getItem('agentId')),
        //  agentId : 2,
        profileId: profileId,
        agentIds: 'string',
        platform: platform,
        wings: this.getWing.wings,
        skillSlug: ""
      };

      this.commondata.AssignQuerry(this.assignQuerryDto).subscribe(
        (res: any) => {
          if (res?.message === 'Query Assign Successfully to Agent') {
            //   alert(res.message);
            this._route.navigateByUrl('/responder/' + platform);
          }
        },
        ({ error }) => {
          alert(error.message);
        }
      );
    } else {
      this.reloadComponent('querryAssigned');
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
