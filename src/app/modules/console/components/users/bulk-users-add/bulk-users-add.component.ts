import { Component, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Component({
  selector: 'app-bulk-users-add',
  standalone:true,
  templateUrl: './bulk-users-add.component.html',
  styleUrls: ['./bulk-users-add.component.scss']
})
export class BulkUsersAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
  }

}
