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

  allChannels:any=[]

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

      this.Subscription = this.unrespondedCountService
        .getUnRespondedCount()
        .subscribe((res) => {
          this.UnResponded = res.totalCount;
          res.platformCount.forEach((platform: any) => {
            switch (platform.platform) {
              case 'Facebook':
                this.FbUnResponded = platform.count;
                break;
              case 'Instagram':
                this.InstaUnResponded = platform.count;
                break;
              case 'Twitter':
                this.TwitterUnResponded = platform.count;
                break;
              case 'LinkedIn':
                this.LinkedInUnResponded = platform.count;
                break;
              case 'Youtube':
                this.YoutubeUnResponded = platform.count;
                break;
              case 'SMS':
                this.SmsUnResponded = platform.count;
                break;
              case 'WhatsApp':
                this.WaUnResponded = platform.count;
                break;
              case 'WebChat':
                this.WebchatUnResponded = platform.count;
                break;
              case 'Email':
                this.EmailUnResponded = platform.count;
                break;
              case 'OfficeEmail':
                this.OfficeEmailUnResponded = platform.count;
                break;
              case 'PlayStore':
                this.PlaystoreUnResponded = platform.count;
                break;
            }
          });
        });

      this.Subscription.add(
        this.updateListService.receiveList().subscribe((res) => {
          res.forEach((platform: any) => {
            this.UnResponded += 1;
            switch (platform.platform) {
              case 'Facebook':
                this.FbUnResponded += 1;
                break;
              case 'Instagram':
                this.InstaUnResponded += 1;
                break;
              case 'Twitter':
                this.TwitterUnResponded += 1;
                break;
              case 'LinkedIn':
                this.LinkedInUnResponded += 1;
                break;
              case 'Youtube':
                this.YoutubeUnResponded += 1;
                break;
              case 'SMS':
                this.SmsUnResponded += 1;
                break;
              case 'WhatsApp':
                this.WaUnResponded += 1;
                break;
              case 'WebChat':
                this.WebchatUnResponded += 1;
                break;
              case 'Email':
                this.EmailUnResponded += 1;
                break;
              case 'OfficeEmail':
                this.OfficeEmailUnResponded += 1;
                break;
              case 'PlayStore':
                this.PlaystoreUnResponded += 1;
                break;
            }
          });
        })
      );

      this.getAllChannelsUnrespondedCounts();

    }


  channels: any[]=[];


  platformWiseCount:any[]=[];

  getAllChannelsUnrespondedCounts(){
    this.commonService.GetAllChannelsUnrespondedCount().subscribe((res:any)=>{
      this.GetChannels();
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

  GetChannels(){

    this.commonService.GetChannels().subscribe((res:any)=>{
      this.channels = res[0].subMenu;
      console.log("this.channels", this.channels);
      const newArray = res[0].subMenu.map((item:any) => {
        let newItem = {};
        switch (item.name) {
          case "Email":
            newItem = { icon: '<i class="fas fa-envelope coal"></i>', title: "Emails", subtitle: "/Gmail",color:'iconButton medium whiteBg',count:this.EmailUnResponded};
            break;
          case "WhatsApp":
            newItem = { icon: '<i class="fab fa-whatsapp"></i>', title: "WhatsApp", subtitle: "",color:"iconButton medium mintBg",count:this.WaUnResponded};
            break;
          case "SMS":
            newItem = { icon: '<i class="fal fa-comment-alt-lines"></i>', title: "SMS", subtitle: "",color:"iconButton medium cherryBg",count:this.SmsUnResponded};
            break;
          case "Facebook":
            newItem = { icon: '<i class="fab fa-facebook-f"></i>', title: "Facebook", subtitle: "/ibex.connect",color:"iconButton medium navyBg",count:this.FbUnResponded};
            break;
          case "Chat":
            newItem = { icon: '<i class="fa-light fa-messages"></i>', title: "WebChat", subtitle: "",color:"iconButton medium webchatbg",count:this.WebchatUnResponded};
            break;
          case "Twitter":
            newItem = { icon: '<i class="fab fa-twitter"></i>', title: "Twitter", subtitle: "",color:"iconButton medium oceanBg",count:this.TwitterUnResponded};
            break;
          case "Instagram":
            newItem = { icon: '<i class="fab fa-instagram"></i>', title: "Instagram", subtitle: "",color:"iconButton medium instabg",count:this.InstaUnResponded};
            break;
          case "LinkedIn":
            newItem = { icon: '<i class="fa-brands fa-linkedin-in"></i>', title: "LinkedIn", subtitle: "",color:"iconButton medium linkedinbg",count:this.LinkedInUnResponded};
            break;
          case "Youtube":
            newItem = { icon: '<i class="fab fa-youtube"></i>', title: "Youtube", subtitle: "" ,color:"iconButton medium radicalBg",count:this.YoutubeUnResponded};
            break;
          default:
            // Keep newItem empty for cases not handled
            break;
        }
        return newItem;
      });
      this.allChannels=newArray;
    })
  }

  updatevalue(string: any) {
    this.filterService.addTogglePanel(string);
  }

}

