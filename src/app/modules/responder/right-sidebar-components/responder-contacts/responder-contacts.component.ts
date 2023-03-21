import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responder-contacts',
  templateUrl: './responder-contacts.component.html',
  styleUrls: ['./responder-contacts.component.scss']
})
export class ResponderContactsComponent implements OnInit {

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
