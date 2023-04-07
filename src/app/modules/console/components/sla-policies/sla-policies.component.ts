import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';

@Component({
  selector: 'app-sla-policies',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl: './sla-policies.component.html',
  styleUrls: ['./sla-policies.component.scss']
})
export class SlaPoliciesComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }

}
