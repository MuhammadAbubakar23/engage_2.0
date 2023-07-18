import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  toggleLeftBar:boolean = true
  constructor() { }

  ngOnInit(): void {
  }
  toggle() {
    this.toggleLeftBar = !this.toggleLeftBar;
  }

}
