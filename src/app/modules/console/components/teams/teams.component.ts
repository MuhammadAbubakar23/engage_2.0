import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  Teams: Array<any> = [];
  TeamsCount: number = 0;  
  //Teams: Array<any> = [];
  constructor(private headerService: HeaderService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.Teams = this._Activatedroute.snapshot.data["teams"];
    this.TeamsCount =  this.Teams.length;
    console.log(this.Teams);
    // this.Teams =  this._Activatedroute.snapshot.data["teams"];
  }  

  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }
}
