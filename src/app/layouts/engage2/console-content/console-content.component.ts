import {  Component, OnInit } from '@angular/core';


@Component({
  selector: 'console-content',
  templateUrl: './console-content.component.html',
  styleUrls: ['./console-content.component.scss']
})
export class ConsoleContentComponent implements OnInit {

  toggleLeftBar:boolean = true
  
  constructor(

  ) { }

  ngOnInit(): void {
   
  }
 
  toggleSubLeftBar() {

  
    this.toggleLeftBar = !this.toggleLeftBar;
   
  }
}
