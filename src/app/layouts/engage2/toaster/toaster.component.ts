import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from './toaster';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent  {//implements OnInit
  @Input() toaster!: Toaster;
  @Input() i!: number;

  @Output() remove = new EventEmitter<number>();
  //constructor() { }

  // ngOnInit(): void {
  // }

}
