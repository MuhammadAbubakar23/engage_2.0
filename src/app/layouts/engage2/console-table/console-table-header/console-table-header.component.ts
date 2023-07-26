import { Component, Input, OnInit } from '@angular/core';
import { ConsoleTableVisibilityPipe } from '../console-table-visibility.pipe';

@Component({
  selector: '[console-table-header]',
  templateUrl: './console-table-header.component.html',
  styleUrls: ['./console-table-header.component.scss'],
  providers: [ ConsoleTableVisibilityPipe ]
})
export class ConsoleTableHeaderComponent implements OnInit {
  @Input() tblHeaders$ : any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
