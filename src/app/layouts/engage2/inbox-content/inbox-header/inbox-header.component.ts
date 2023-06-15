import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'inbox-header',
  templateUrl: './inbox-header.component.html',
  styleUrls: ['./inbox-header.component.scss']
})
export class InboxHeaderComponent implements OnInit {
  constructor(private sharedService: SharedService,
    private commonService: CommonDataService) { }

  ngOnInit(): void {
    
    this.getAllConversationCount();
  }

  filterDto = new FiltersDto();
  pageNumber:number=1;
  pageSize:number=500;
  UnResponded:number=0;

  getAllConversationCount(){
    
    this.filterDto ={
      // fromDate : new Date(),
      // toDate : new Date(),
      user : "",
      pageId : "",
      plateForm : "",
      pageNumber : this.pageNumber,
      pageSize : this.pageSize,
      isAttachment: false,
      queryType: ''
      
    }
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.UnResponded = res.TotalCount
    });
    
  }
}
