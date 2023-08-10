import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { Observable } from 'rxjs';
import { ConsoleTableParams } from 'src/app/layouts/engage2/console-table/console-table-params';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { ToasterService } from 'src/app/layouts/engage2/toaster/toaster.service';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { AddTeamMembersComponent } from './add-team-members/add-team-members.component';
import { CreateTeamComponent } from './create-team/create-team.component';
// import { DataTablesModule } from "angular-datatables";
@Component({
  selector: 'app-teams',//DataTablesModule
  standalone:true,
  imports:[CommonModule, RouterModule, LayoutsModule, CreateTeamComponent, AddTeamMembersComponent],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  Teams: Array<any> = [];
  TeamsCount: number = 0;
  identifire:string = "mainId"
  model:MenuModel[] = [];
  filter?: Observable<ConsoleTableParams>;
  showConsoleTable:boolean= false;
  isActive=false;
  
  constructor(private headerService: HeaderService, private _Activatedroute:ActivatedRoute, private toaster:ToasterService) { }

  async ngOnInit() {
    this.filter = await this._Activatedroute.snapshot.data["teamJ"];
    if(typeof this.filter !== 'undefined'){
      this.showConsoleTable = true;
    }
    // this.Teams = await this._Activatedroute.snapshot.data["teams"];
    // this.TeamsCount =  this.Teams.length;
    console.log(this.filter);
    // this.Teams =  this._Activatedroute.snapshot.data["teams"];
  }  

  updatevalue(string:any){
    this.toaster.show('error', 'Check it out!', 'This is a error alert');
    return;
    //this.headerService.updateMessage(string);
  }
  AddTeamMembers(){
    this.isActive=!this.isActive;
  }
}
