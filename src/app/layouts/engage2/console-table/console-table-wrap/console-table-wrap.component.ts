import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'console-table-wrap',
  templateUrl: './console-table-wrap.component.html',
  styleUrls: ['./console-table-wrap.component.scss']
})
export class ConsoleTableWrapComponent implements OnInit {
  @Input() wrapdata: any=[];
  @Input() wrapflow: number=0;

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
    // console.log("Length --->>>", this.wrapdata.length);
    // this.show = true;
    //console.log("show --->>>", this.show);
    if(typeof this.wrapdata !== "undefined" && this.wrapdata != null){
      if(this.wrapdata.length > this.wrapflow){
        this.show =true;
      //  console.log("show --->>>", this.show);
        this.overflow = this.wrapdata.length-2;
      //  console.log("overflow --->>>", this.overflow);
      } 
      this.wrapdata.forEach((item:string, index:number, arr:any) => {
        if(index < 2) _self.display+=item+", ";
        else _self.hidden.push(item);
        //arr[index] = item * 10;
      });
    }
    
    // for(let rap:any in this.wrapdata){
      
    //   else 
    //   console.log(rap);
    //   console.log(this.wrapdata[rap]);
    // }
  }

}
