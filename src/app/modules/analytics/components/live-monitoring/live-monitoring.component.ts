import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
@Component({
  selector: 'app-live-monitoring',
  standalone: true,
  imports:[],
  templateUrl: './live-monitoring.component.html',
  styleUrls: ['./live-monitoring.component.scss']
})
export class LiveMonitoringComponent implements OnInit {
  constructor(private _hS:HeaderService) { }
  ngOnInit(): void {
    const newObj = {title:'Live Monitoring',url:'/analytics/executive-dashboard'};
    this._hS.setHeader(newObj);
  }
}
