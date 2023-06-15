import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reportlisting',
  templateUrl: './reportlisting.component.html',
  styleUrls: ['./reportlisting.component.scss']
})
export class ReportlistingComponent implements OnInit {
  reports:any=[{name:'report1',query:'query',created_at:'date'},{name:'report2',query:'query2',created_at:'date2'}];
  columns=['Name','Query','Created_At']

  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
this.reportService.reportslistApi().subscribe((res:any)=>{
  console.log(res);
  this.reports=res;
})
  }

}
