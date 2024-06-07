import { Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
  }
  show:any=false;
  click(val:any){
    if(val == true){
      this.show =false
    }
    if(val == false){
      this.show =true;
    }
  }
}
