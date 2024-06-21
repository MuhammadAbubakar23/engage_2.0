import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'console-table-with-image',
  templateUrl: './console-table-with-image.component.html',
  styleUrls: ['./console-table-with-image.component.scss']
})
export class ConsoleTableWithImageComponent implements OnInit {
  @Input() columns:any="";
  @Input() data:any="";
  ConsoleTableWithImageData$: string[] = [];
  
  @Input() name:string="";
  @Input() subname:string="";
  @Input() imagename:string="";
  @Input() linkname:string="javascript:;";
  constructor() { }

  ngOnInit(): void {
    this.columns.forEach((item:string, index:number, arr:any) => {
      // let val = this.data.any(function(inneritem:any) {
      //   return inneritem[item];
      // })
      this.ConsoleTableWithImageData$[index] = (typeof this.data[item] === 'undefined')?'':this.data[item];
      //this.ConsoleTableWithImageData$.push(val);
      // this.data.filter()
      //  if(index < 2) _self.display+=item+", ";
      //  else _self.hidden.push(item);
      //  arr[index] = item * 10;
    });
  }

}
