import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {
  @Input() toasterMsg: string = '';
  @Input() isToaster: boolean = false;
  toastermessage = false;
  constructor() { }

  ngOnInit(): void {
   console.log(" this.toasterMsg", this.toasterMsg)
  }

  closeToaster() {
    this.toastermessage = false;
  }
}
