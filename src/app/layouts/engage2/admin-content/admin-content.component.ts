import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})
export class AdminContentComponent implements OnInit {

  toggleLeftBar:boolean = true
  constructor() { }

  ngOnInit(): void {
  }
  toggle() {
    this.toggleLeftBar = !this.toggleLeftBar;
  }

}
