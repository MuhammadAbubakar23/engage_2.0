import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/services/FilterService/filter.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateListService } from 'src/app/services/UpdateListService/update-list.service';

@Component({
  selector: 'inbox-menu',
  templateUrl: './inbox-menu.component.html',
  styleUrls: ['./inbox-menu.component.scss']
})
export class InboxMenuComponent implements OnInit {


  public Subscription!: Subscription
  UnResponded: number = 0;
  SlaUnResponded: number = 0;
  WaUnResponded: number = 0;
  SmsUnResponded: number = 0;
  FbUnResponded: number = 0;
  EmailUnResponded: number = 0;
  OfficeEmailUnResponded: number = 0;
  WebchatUnResponded: number = 0;
  TwitterUnResponded: number = 0;
  InstaUnResponded: number = 0;
  LinkedInUnResponded: number = 0;
  PlaystoreUnResponded: number = 0;
  YoutubeUnResponded: number = 0;

  constructor(private filterService: FilterService,
    private commonService: CommonDataService,
    private unrespondedCountService: UnRespondedCountService,
    private updateListService: UpdateListService) { }

  ngOnInit(): void {

    this.GetChannels();

    this.getAllChannelsUnrespondedCounts();

    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {

        this.UnResponded = res.totalCount
        res.platformCount.forEach((platform: any) => {
          if (platform.platform == 'Facebook') {
            this.FbUnResponded = platform.count;
          }
          if (platform.platform == 'Instagram') {
            this.InstaUnResponded = platform.count;
          }
          if (platform.platform == 'Twitter') {
            this.TwitterUnResponded = platform.count;
          }
          if (platform.platform == 'LinkedIn') {
            this.LinkedInUnResponded = platform.count;
          }
          if (platform.platform == 'Youtube') {
            this.YoutubeUnResponded = platform.count;
          }
          if (platform.platform == 'SMS') {
            this.SmsUnResponded = platform.count;
          }
          if (platform.platform == 'WhatsApp') {
            this.WaUnResponded = platform.count;
          }
          if (platform.platform == 'WebChat') {
            this.WebchatUnResponded = platform.count;
          }
          if (platform.platform == 'Email') {

            this.EmailUnResponded = platform.count;
          }
          if (platform.platform == 'OfficeEmail') {

            this.OfficeEmailUnResponded = platform.count;
          }
          if (platform.platform == 'PlayStore') {
            this.PlaystoreUnResponded = platform.count;
          }
        });

      });

    this.Subscription = this.updateListService.receiveList().subscribe((res) => {

      res.forEach((platform: any) => {
        this.UnResponded = this.UnResponded + 1;
        if (platform.platform == 'Facebook') {
          this.FbUnResponded = this.FbUnResponded + 1;
        }
        if (platform.platform == 'Instagram') {
          this.InstaUnResponded = this.InstaUnResponded + 1;
        }
        if (platform.platform == 'Twitter') {
          this.TwitterUnResponded = this.TwitterUnResponded + 1;
        }
        if (platform.platform == 'LinkedIn') {
          this.LinkedInUnResponded = this.LinkedInUnResponded + 1;
        }
        if (platform.platform == 'Youtube') {
          this.YoutubeUnResponded = this.YoutubeUnResponded + 1;
        }
        if (platform.platform == 'SMS') {
          this.SmsUnResponded = this.SmsUnResponded + 1;
        }
        if (platform.platform == 'WhatsApp') {
          this.WaUnResponded = this.WaUnResponded + 1;
        }
        if (platform.platform == 'WebChat') {
          this.WebchatUnResponded = this.WebchatUnResponded + 1;
        }
        if (platform.platform == 'Email') {

          this.EmailUnResponded = this.EmailUnResponded + 1;
        }
        if (platform.platform == 'OfficeEmail') {

          this.OfficeEmailUnResponded = this.OfficeEmailUnResponded + 1;
        }
        if (platform.platform == 'PlayStore') {
          this.PlaystoreUnResponded = this.PlaystoreUnResponded + 1;
        }
      });
    });
  }

  channels: any[]=[];

  GetChannels(){
    this.commonService.GetChannels().subscribe((res:any)=>{
      this.channels = res[0].subMenu;
    })
  }

  platformWiseCount:any[]=[];

  getAllChannelsUnrespondedCounts(){
    this.commonService.GetAllChannelsUnrespondedCount().subscribe((res:any)=>{
      this.UnResponded = res.totalCount
      this.platformWiseCount = res.platformCount
      res.platformCount.forEach((platform:any) => {

        if (platform.platform == 'Facebook') {
          this.FbUnResponded = platform.count;
        }
        if (platform.platform == 'Instagram') {
          this.InstaUnResponded = platform.count;
        }
        if (platform.platform == 'Twitter') {
          this.TwitterUnResponded = platform.count;
        }
        if (platform.platform == 'LinkedIn') {
          this.LinkedInUnResponded = platform.count;
        }
        if (platform.platform == 'Youtube') {
          this.YoutubeUnResponded = platform.count;
        }
        if (platform.platform == 'SMS') {
          this.SmsUnResponded = platform.count;
        }
        if (platform.platform == 'WhatsApp') {
          this.WaUnResponded = platform.count;
        }
        if (platform.platform == 'WebChat') {
          this.WebchatUnResponded = platform.count;
        }
        if (platform.platform == 'Email') {

          this.EmailUnResponded = platform.count;
        }
        if (platform.platform == 'OfficeEmail') {

          this.OfficeEmailUnResponded = platform.count;
        }
        if (platform.platform == 'PlayStore') {
          this.PlaystoreUnResponded = platform.count;
        }
      });
    });
  }


  updatevalue(string: any) {

    this.filterService.addTogglePanel(string);

  }

}

