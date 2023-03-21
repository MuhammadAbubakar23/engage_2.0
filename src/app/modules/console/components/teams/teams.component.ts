import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CreateTeamComponent } from './create-team/create-team.component';

@Component({
  selector: 'app-teams',
  standalone:true,
  imports:[CommonModule, RouterModule, CreateTeamComponent],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
  }
  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }
}
