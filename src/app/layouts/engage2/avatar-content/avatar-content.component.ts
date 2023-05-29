import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'avatar-content',
  templateUrl: './avatar-content.component.html',
  styleUrls: ['./avatar-content.component.scss']
})
export class AvatarContentComponent implements OnInit {

  @Input() name:string="";
  @Input() subname:string="";
  @Input() imagename:string="";
  @Input() linkname:string="javascript:;";
  constructor() { }

  ngOnInit(): void {
    
    
   
  }

}
