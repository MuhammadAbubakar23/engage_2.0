import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard-shortcuts',
  templateUrl: './keyboard-shortcuts.component.html',
  styleUrls: ['./keyboard-shortcuts.component.scss']
})
export class KeyboardShortcutsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  show:any=false;
  click(val:any){
     
    if(val == true){
      this.show =false
    }
    if(val == false){
      this.show =true;
    }
    
  }
}
