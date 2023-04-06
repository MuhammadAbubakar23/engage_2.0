import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responder-tickets',
  templateUrl: './responder-tickets.component.html',
  styleUrls: ['./responder-tickets.component.scss']
})
export class ResponderTicketsComponent implements OnInit {

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
