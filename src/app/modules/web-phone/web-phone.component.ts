import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-phone',
  templateUrl: './web-phone.component.html',
  styleUrls: ['./web-phone.component.scss']
})
export class WebPhoneComponent implements OnInit {
  constructor() { }

  for:any="Taimoor";
  ngOnInit(): void {
    debugger
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));


  }
method()
{
  // console.log(this.for);
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
