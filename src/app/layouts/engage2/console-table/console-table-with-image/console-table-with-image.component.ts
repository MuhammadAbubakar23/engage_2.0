import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'console-table-with-image',
  templateUrl: './console-table-with-image.component.html',
  styleUrls: ['./console-table-with-image.component.scss']
})
export class ConsoleTableWithImageComponent implements OnInit {
  @Input() name:string="";
  @Input() subname:string="";
  @Input() imagename:string="";
  @Input() linkname:string="javascript:;";
  constructor() { }

  ngOnInit(): void {
  }

}
