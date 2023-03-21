import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responder-keyboard-shortcuts',
  templateUrl: './responder-keyboard-shortcuts.component.html',
  styleUrls: ['./responder-keyboard-shortcuts.component.scss']
})
export class ResponderKeyboardShortcutsComponent implements OnInit {


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
