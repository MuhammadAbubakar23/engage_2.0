import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-responder-documents',
  templateUrl: './responder-documents.component.html',
  styleUrls: ['./responder-documents.component.scss']
})
export class ResponderDocumentsComponent implements OnInit {
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
