import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-web-phone-contacts',
  templateUrl: './web-phone-contacts.component.html',
  styleUrls: ['./web-phone-contacts.component.scss']
})
export class WebPhoneContactsComponent implements OnInit {
  @Output() callNumber = new EventEmitter<number>();
  @Output() contactsComponent = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit(): void {
  }
  public call(number:any) : void{
    this.callNumber.emit(number);
    this.contactsComponent.emit(false)
  }
}
