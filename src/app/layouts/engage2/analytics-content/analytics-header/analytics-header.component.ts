import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'analytics-header',
  templateUrl: './analytics-header.component.html',
  styleUrls: ['./analytics-header.component.scss']
})
export class AnalyticsHeaderComponent implements OnInit {
  header:any={};
  constructor(private _hS:HeaderService) { }

  ngOnInit(): void {
    this._hS.getHeader().subscribe((obj) => {
      if (obj) {
            this.header=obj;
      }
    });
  }

}
