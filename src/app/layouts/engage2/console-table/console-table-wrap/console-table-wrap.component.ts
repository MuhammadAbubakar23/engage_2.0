import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'console-table-wrap',
  templateUrl: './console-table-wrap.component.html',
  styleUrls: ['./console-table-wrap.component.scss']
})
export class ConsoleTableWrapComponent implements OnInit {
  @Input() wrapdata: any=[];
  @Input() wrapflow: number=0;

  @Input() wrapindex: string= "";

  show:boolean=false;
  overflow:number=0;
  display:string="";
  hidden:Array<string>=[];
  bundle?:string;
  morecount:number = 0;
  constructor() { }

  ngOnInit(): void {
    let _self = this;
    //let count = 0;
    // this.show = true;
    if(typeof this.wrapdata !== "undefined" && this.wrapdata != null){
      if(this.wrapdata.length > this.wrapflow){
        this.show =true;
        this.overflow = this.wrapdata.length-2;
      }
      this.wrapdata.forEach((item:any, index:number, arr:any) => {
        if(typeof this.wrapindex !== "undefined" && this.wrapindex.length > 0 ){
          if(index < 2) _self.display += item[this.wrapindex]+", ";
          else _self.hidden.push(item);
        }
        else{
          if(index < 2) _self.display+=item+", ";
          else _self.hidden.push(item);
        }
        
        //arr[index] = item * 10;
      });
    }
    
    // for(let rap:any in this.wrapdata){
      
    //   else 
    // }
  }

}
