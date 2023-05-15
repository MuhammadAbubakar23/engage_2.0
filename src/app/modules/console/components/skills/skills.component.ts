import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';

@Component({
  selector: 'app-skills',
  standalone:true,
  imports:[CommonModule, RouterModule],//, CreateTeamComponent
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
  }
  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }

}
