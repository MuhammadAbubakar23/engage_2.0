import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {
  @Input() toasterMsg: string = '';
  @Input() isToaster: boolean = false;
  toastermessage = false;
  constructor() { }
  ngOnInit(): void {
  }
  closeToaster() {
    this.toastermessage = false;
  }
}
