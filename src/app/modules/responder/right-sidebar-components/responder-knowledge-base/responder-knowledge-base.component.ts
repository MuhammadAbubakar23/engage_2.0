import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-responder-knowledge-base',
  templateUrl: './responder-knowledge-base.component.html',
  styleUrls: ['./responder-knowledge-base.component.scss']
})
export class ResponderKnowledgeBaseComponent implements OnInit {
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
