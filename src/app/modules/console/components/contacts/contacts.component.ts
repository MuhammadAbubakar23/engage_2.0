import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/HeaderService/header.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ConsoleContactsComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  // updatevalue(string:any){
  //   this.headerService.updateMessage(string);
  // }


}
