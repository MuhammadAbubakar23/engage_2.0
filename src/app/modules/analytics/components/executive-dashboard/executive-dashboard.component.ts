import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports:[],
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.scss']
})
export class ExecutiveDashboardComponent implements OnInit {

  constructor(private _hS:HeaderService) { }

  ngOnInit(): void {
    const newObj = {title:'Executive Dashboard',url:'/analytics/executive-dashboard'};
    this._hS.setHeader(newObj);
  }

}
