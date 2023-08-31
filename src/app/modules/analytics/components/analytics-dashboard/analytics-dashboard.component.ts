import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports:[],
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss']
})
export class AnalyticsDashboardComponent implements OnInit {

  constructor(private _hS:HeaderService) { }

  ngOnInit(): void {
    const newObj = {title:'Dashboard',url:'/analytics/dashboard'};
    this._hS.setHeader(newObj);
  }

}
