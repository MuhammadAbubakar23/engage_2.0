import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'overlay-right-panel',
  templateUrl: './overlay-right-panel.component.html',
  styleUrls: ['./overlay-right-panel.component.scss']
})
export class OverlayRightPanelComponent implements OnInit {
  @Input() isActive:boolean = false;
  @Input() header:string = "Header";
  @Input() search:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
