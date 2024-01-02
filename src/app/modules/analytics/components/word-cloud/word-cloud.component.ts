import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagCloudComponent } from 'angular-tag-cloud-module';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { DataExchangeServicesService } from 'src/app/services/dataExchangeServices/data-exchange-services.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  standalone:true,
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss'],
  imports:[CommonModule,TagCloudComponent,NgxSpinnerModule]
})
export class WordCloudComponent implements OnInit {
  @Input()wordCloud:any;
  Subscription !: Subscription;
  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 0.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.2 // Zoom will take affect after 0.8 seconds
  };
  options: CloudOptions = {
    width: 400,
    height: 400,
    overflow: false,
  };
  data:any[]=[]
  wordcloudData:any=[]=[]
  startDate:any;
  item:any
  endDate:any
  constructor(
    private commonDataService: CommonDataService,
    private _wordCloudDateS:DataExchangeServicesService,
    private cd:ChangeDetectorRef,
    private spinerS:NgxSpinnerService,
  ) { }
  ngOnChanges(){
    
    this.item=this.wordCloud
    this.getWordCloud()
  }
  ngOnInit(): void {
 

   this.getWordCloud()
 
  }
  getWordCloud() {
         let obj={
            "startDate":this.item?.startDate ,
            "endDate": this.item?.endDate
         }
         this.spinerS.show()
       this.cd.detectChanges()
       this.data=[]
        this.commonDataService.GetwordCloud(obj).subscribe((res:any) => {
          this.wordcloudData = res?.keywords    
          this.spinerS.hide()
          if (this.wordcloudData.length > 0) {
           this.data=[]    
           this.wordcloudData .forEach((element: any) => {
              let  obj = {
                text: element.keyword,
                weight:Number( element.weight)
              };
              if(this.data!==null && this.data!==undefined){
                this.data.push(obj);
              }
             
    
            });
         
          }

        });
    
      }
}
