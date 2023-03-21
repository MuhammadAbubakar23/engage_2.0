import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/HeaderService/header.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }

}
