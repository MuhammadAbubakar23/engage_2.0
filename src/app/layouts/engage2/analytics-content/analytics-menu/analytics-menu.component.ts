import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'analytics-menu',
  templateUrl: './analytics-menu.component.html',
  styleUrls: ['./analytics-menu.component.scss'],
})
export class AnalyticsMenuComponent implements OnInit {
  activeMenu = '';
  constructor(private _hS: HeaderService) {}

  ngOnInit(): void {
    this._hS.getHeader().subscribe((res: any) => {
      // this.activeMenu = res.title;
    });
  }
}
