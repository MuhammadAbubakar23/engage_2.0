import { Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'app-phone-dialer',
  templateUrl: './phone-dialer.component.html',
  styleUrls: ['./phone-dialer.component.scss']
})
export class PhoneDialerComponent implements OnInit {

  constructor() { }

  for:any="Taimoor";
  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));


  }
method()
{
  console.log(this.for);
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
