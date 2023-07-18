import { Component, OnInit } from '@angular/core';
import { GetDispositionHistoryDto } from 'src/app/shared/Models/GetDispositionHistoryDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-responder-history',
  templateUrl: './responder-history.component.html',
  styleUrls: ['./responder-history.component.scss']
})
export class ResponderHistoryComponent implements OnInit {

  dispositionHistory:any;
  searchText:string='';

  getDispositionHistoryDto = new GetDispositionHistoryDto;

  customerProfileId = Number(localStorage.getItem('profileId'))

  constructor(private commonService : CommonDataService) { }

  ngOnInit(): void {
    this.getDispositionHistory();
  }

  getDispositionHistory(){
    this.getDispositionHistoryDto = {
      customerProfileId : this.customerProfileId,
      pageNumber : 1,
      pageSize : 50
    }
    this.commonService.GetDispositionHistory(this.getDispositionHistoryDto).subscribe((res:any)=>{
      
      this.dispositionHistory = res;
    })
  }

  show:any=false;
  click(val:any){
     
    if(val == true){
      this.show =false
    }
    if(val == false){
      this.show =true;
    }
  }
}
