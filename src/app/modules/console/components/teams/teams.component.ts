import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { Observable } from 'rxjs';
import { ConsoleTableParams } from 'src/app/layouts/engage2/console-table/console-table-params';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
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
  // dtOptions: DataTables.Settings = {};
  model:MenuModel[] = [];
  filter?: Observable<ConsoleTableParams>;
  showConsoleTable:boolean= false;
  Teams: Array<any> = [];
  TeamsCount: number = 0;
  isActive=false;
  //Teams: Array<any> = [];
  // actions: any[] = [//toolbar: "top", refresh:true 
  //   //  {name:"Edit", type:"rute", actionUrl:"console/users/create", icon:"fal fa-edit me-2"} //, 
  //   {name:"delete", type:"service" , actionUrl:"DeleteTeam", icon:"fal fa-trash me-2"},
  //   {name:"Add Team Members", type:"overlay" , actionUrl:"DeleteTeam", icon:"fal fa-trash me-2"}
  // ];
  // filter: {} ={ search:""
  //             , url : "AllTeams"
  //             , urlparam:"Compwith"
  //             , pageno:1
  //             , pagesize:50
  //             , overlay:{
  //                 search:""
  //               , url:"AllUsers"
  //               , pageno:1
  //               , pagesize:50
  //               , headers: [ { visible:true, index:'', name:"", type:"empty" }
  //                       // , { visible:true, index:["id"], name:"id", type:"check", order:"ASC", search:true, group:-1, actions:false }
  //                       , { visible:true, index:["name"], name:"teams", type:"display", order:"ASC", search:true, group:-1, actions:false }
  //                       , { visible:true, index:["countUser"], name:"users", type:"icondisplay", order:null, search:false, group:2, actions:false }
  //                       , { visible:true, index:["subMenu"], name:"accesses", type:"wrap", order:null, search:false, group:2, actions:false }
  //                       , { visible:true, index:this.actions, name:"...", type:"action-list", order:null, search:false, group:0, actions:true }
  //                       ] 
  //             }
  //             , template: {}
  //             , headers: [ { visible:true, index:'', name:"", type:"empty" }
  //                       // , { visible:true, index:["id"], name:"id", type:"check", order:"ASC", search:true, group:-1, actions:false }
  //                       , { visible:true, index:["name"], name:"teams", type:"display", order:"ASC", search:true, group:-1, actions:false }
  //                       , { visible:true, index:["countUser"], name:"users", type:"icondisplay", order:null, search:false, group:2, actions:false }
  //                       , { visible:true, index:["subMenu"], name:"accesses", type:"wrap", order:null, search:false, group:2, actions:false }
  //                       , { visible:true, index:this.actions, name:"...", type:"action-list", order:null, search:false, group:0, actions:true }
  //                       ]
  //             };
  constructor(private headerService: HeaderService, private _Activatedroute:ActivatedRoute) { }

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
    this.headerService.updateMessage(string);
  }
  AddTeamMembers(){
    this.isActive=!this.isActive;
  }
}
