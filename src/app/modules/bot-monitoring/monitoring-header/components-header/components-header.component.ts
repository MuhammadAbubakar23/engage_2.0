import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({

  selector: 'app-components-header',
  templateUrl: './components-header.component.html',
  styleUrls: ['./components-header.component.scss']
})
export class ComponentsHeaderComponent implements OnInit {
  setName:any
  constructor() { }
  formatUtterance(utterance: string): string {
    return utterance.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  ngOnInit(): void {
    this.setName=localStorage.getItem("name")
  }

}
