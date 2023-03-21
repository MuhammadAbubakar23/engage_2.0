import { Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { HeaderService } from 'src/app/services/HeaderService/header.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class ConsoleDocumentsComponent implements OnInit {

  isGridView=false
  isListView=true
  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode)), {
    //   trigger : 'hover'
    // };
  }

  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }


  GridView(){
    this.isGridView=true;
    this.isListView=false;
  }

  ListView(){
    this.isGridView=false;
    this.isListView=true;
  }

}
