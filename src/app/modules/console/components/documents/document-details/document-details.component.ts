import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  isGridView=false
  isListView=true
  constructor() { }

  ngOnInit(): void {
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
