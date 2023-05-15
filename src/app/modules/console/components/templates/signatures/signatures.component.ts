import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/HeaderService/header.service';

@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.scss']
})
export class SignaturesComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }

}
