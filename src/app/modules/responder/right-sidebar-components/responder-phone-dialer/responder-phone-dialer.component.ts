import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responder-phone-dialer',
  templateUrl: './responder-phone-dialer.component.html',
  styleUrls: ['./responder-phone-dialer.component.scss']
})
export class ResponderPhoneDialerComponent implements OnInit {


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
