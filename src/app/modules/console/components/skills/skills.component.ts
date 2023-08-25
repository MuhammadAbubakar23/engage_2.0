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
   userDetails:any[]=[
    {teams:"vw",userid:333,department:"information technology"},
    {teams:"special Projects",userid:3434,department:"Sales"},
    {teams:"Corporte Team",userid:3422,department:"Account,Support"},
    {teams:"lead Management",userid:9988,department:"All"}
   ]
}
