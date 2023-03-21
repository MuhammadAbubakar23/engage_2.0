import { Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'app-livechats',
  templateUrl: './livechats.component.html',
  styleUrls: ['./livechats.component.scss']
})
export class LivechatsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
  }

}
