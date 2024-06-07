import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuModel } from '../menu-state/menu.model';
import { CardBoxListCheckboxComponent } from './card-box-list-checkbox/card-box-list-checkbox.component';

@Component({
  selector: 'engage2-card-box-list',
  // standalone:true,
  // imports:[CommonModule, CardBoxListCheckboxComponent],
  templateUrl: './card-box-list.component.html',
  styleUrls: ['./card-box-list.component.scss']
})
export class CardBoxListComponent implements OnInit {
  @Input() menulist: any = []; //; //Observable<T>
  @Output() menulistchecked: EventEmitter<any> = new EventEmitter<any>();
  @Input() menulistselectall?: string; //; //Observable<T>
  // menulistChecked:any;
  // @Input() header: string[] = [];
  selectedList:Array<any> = [];
  cardboxListMaster: boolean = false;
  cardboxListCheck:any;
  cardboxListChecked:Array<any> = [];

  childListChecked:any = {};

  constructor() { }

  ngOnInit(): void {
    this.cardboxListSelected();
  }
  cardboxListSelected(){
    this.cardboxListChecked = [];
    for (var i = 0; i < this.menulist.length; i++) {
      if(this.menulist[i].isSelected)
        this.cardboxListChecked.push(this.menulist[i]);
    }
    this.sendmenulistchecked();
  }
  sendmenulistchecked(){
    this.childListChecked["parent"] = this.cardboxListChecked;
    this.menulistchecked.emit(this.childListChecked);
  }
  menulistChecked(childData:any){
    this.childListChecked[childData.name] = childData.data;
    this.sendmenulistchecked();
    // for (var i = 0; i < this.childListChecked.length; i++) {
    //   if(this.childListChecked[i].name == childData.name){
    //     // delete this.childListChecked[i];
    //     const index = this.childListChecked.indexOf(i, 0);
    //     if (index > -1) {
    //       this.childListChecked.splice(index, 1);
    //     }
    //   }        
    // }
    // this.cardboxListChecked = [];
    // for (var i = 0; i < this.menulist.length; i++) {
    //   if(this.menulist[i].isSelected)
    //   this.cardboxListChecked.push(this.menulist[i]);
    // }
  }
}
