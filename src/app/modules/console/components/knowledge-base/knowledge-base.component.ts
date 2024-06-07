import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss']
})
export class ConsoleKnowledgeBaseComponent implements OnInit {
  constructor(private headerService: HeaderService) { }
  ngOnInit(): void {
  }
  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }
}
