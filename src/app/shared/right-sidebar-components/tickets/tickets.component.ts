import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
  public ngOnDestroy(): void {
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
