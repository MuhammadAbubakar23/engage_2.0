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


  public Subscription! :Subscription
  UnResponded : number = 0;
  SlaUnResponded : number = 0;
  WaUnResponded : number = 0;
  SmsUnResponded : number = 0;
  FbUnResponded : number = 0;
  EmailUnResponded : number = 0;
  OfficeEmailUnResponded : number =0;
  WebchatUnResponded : number = 0;
  TwitterUnResponded : number = 0;
  InstaUnResponded : number = 0;
  LinkedInUnResponded : number = 0;
  PlaystoreUnResponded : number = 0;
  YoutubeUnResponded : number = 0;

  constructor(private filterService : FilterService,
    private commonService : CommonDataService,
    private unrespondedCountService : UnRespondedCountService,
    private updateListService : UpdateListService) { }

  ngOnInit(): void {

    this.getAllChannelsUnrespondedCounts();

    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        
        // this.UnResponded = res.totalCount
        res.platformCount.forEach((platform:any) => {
          // if(platform.platform == 'Facebook'){
          //   this.FbUnResponded = platform.count;
          // }
          // if(platform.platform == 'Instagram'){
          //   this.InstaUnResponded = platform.count;
          // }
          // if(platform.platform == 'Twitter'){
          //   this.TwitterUnResponded = platform.count;
          // }
          // if(platform.platform == 'LinkedIn'){
          //   this.LinkedInUnResponded = platform.count;
          // }
          // if(platform.platform == 'Youtube'){
          //   this.YoutubeUnResponded = platform.count;
          // }
          // if(platform.platform == 'SMS'){
          //   this.SmsUnResponded = platform.count;
          // }
          if(platform.platform == 'WhatsApp'){
            this.WaUnResponded = platform.count;
            this.UnResponded = res.totalCount
          }
          // if(platform.platform == 'WebChat'){
          //   this.WebchatUnResponded = platform.count;
          // }
          // if(platform.platform == 'Email'){
            
          //   this.EmailUnResponded = platform.count;
          // }
          if(platform.platform == 'OfficeEmail'){
            
            this.OfficeEmailUnResponded = platform.count;
            this.UnResponded = res.totalCount
          }
          // if(platform.platform == 'PlayStore'){
          //   this.PlaystoreUnResponded = platform.count;
          // }
        });
        
      });

      this.Subscription = this.updateListService.receiveList().subscribe((res) => {
      
      res.forEach((platform:any) => {
        // this.UnResponded = platform.unrespondedCount + this.UnResponded;
        // if(platform.platform == 'Facebook'){
        //   this.FbUnResponded = platform.unrespondedCount + this.FbUnResponded;
        // }
        // if(platform.platform == 'Instagram'){
        //   this.InstaUnResponded = platform.unrespondedCount + this.InstaUnResponded;
        // }
        // if(platform.platform == 'Twitter'){
        //   this.TwitterUnResponded = platform.unrespondedCount + this.TwitterUnResponded;
        // }
        // if(platform.platform == 'LinkedIn'){
        //   this.LinkedInUnResponded = platform.unrespondedCount + this.LinkedInUnResponded;
        // }
        // if(platform.platform == 'Youtube'){
        //   this.YoutubeUnResponded = platform.unrespondedCount + this.YoutubeUnResponded;
        // }
        // if(platform.platform == 'SMS'){
        //   this.SmsUnResponded = platform.unrespondedCount + this.SmsUnResponded;
        // }
        if(platform.platform == 'WhatsApp'){
          this.WaUnResponded = platform.unrespondedCount + this.WaUnResponded;
          this.UnResponded = platform.unrespondedCount + this.UnResponded;
        }
        // if(platform.platform == 'WebChat'){
        //   this.WebchatUnResponded = platform.unrespondedCount + this.WebchatUnResponded;
        // }
        // if(platform.platform == 'Email'){
          
        //   this.EmailUnResponded = platform.unrespondedCount + this.EmailUnResponded;
        // }
        if(platform.platform == 'OfficeEmail'){
          
          this.OfficeEmailUnResponded = platform.unrespondedCount + this.OfficeEmailUnResponded;
          
        }
        // if(platform.platform == 'PlayStore'){
        //   this.PlaystoreUnResponded = platform.unrespondedCount + this.PlaystoreUnResponded;
        // }
      });
      });
  }

  getAllChannelsUnrespondedCounts(){
    this.commonService.GetAllChannelsUnrespondedCount().subscribe((res:any)=>{
      // this.UnResponded = res.totalCount
      res.platformCount.forEach((platform:any) => {

        // if(platform.platform == 'Facebook'){
        //   this.FbUnResponded = platform.count;
        // }
        // if(platform.platform == 'Instagram'){
        //   this.InstaUnResponded = platform.count;
        // }
        // if(platform.platform == 'Twitter'){
        //   this.TwitterUnResponded = platform.count;
        // }
        // if(platform.platform == 'LinkedIn'){
        //   this.LinkedInUnResponded = platform.count;
        // }
        // if(platform.platform == 'Youtube'){
        //   this.YoutubeUnResponded = platform.count;
        // }
        // if(platform.platform == 'SMS'){
        //   this.SmsUnResponded = platform.count;
        // }
        if(platform.platform == 'WhatsApp'){
          this.WaUnResponded = platform.count;
        }
        // if(platform.platform == 'WebChat'){
        //   this.WebchatUnResponded = platform.count;
        // }
        // if(platform.platform == 'Email'){
          
        //   this.EmailUnResponded = platform.count;
        // }
        if(platform.platform == 'OfficeEmail'){
          this.OfficeEmailUnResponded = platform.count;
        }
        // if(platform.platform == 'PlayStore'){
        //   this.PlaystoreUnResponded = platform.count;
        // }

        // for TPPL only
        this.UnResponded = this.WaUnResponded + this.OfficeEmailUnResponded
      });
    });
  }
  

  updatevalue(string:any){
    
    this.filterService.addTogglePanel(string);
    
  }
 
}

