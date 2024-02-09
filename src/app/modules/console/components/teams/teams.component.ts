import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToasterService } from 'src/app/layouts/engage2/toaster/toaster.service';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { AddTeamMembersComponent } from './add-team-members/add-team-members.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

// import {  } from '';
// import { DataTablesModule } from "angular-datatables";
@Component({
  selector: 'app-teams',//DataTablesModule
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutsModule, CreateTeamComponent,NgxSpinnerModule, 
    AddTeamMembersComponent],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams_Columns:any[]=[]
  teams: any[] = [];
  ischecked:boolean=false
  Ids:any[]=[]
  logs:any[]=[]
  showTable: boolean = false;
  isActive = false;
  constructor(private headerService: HeaderService,
    private commonService: CommonDataService,
    private route:Router,
    private spinnerService:NgxSpinnerService,
     private _Activatedroute: ActivatedRoute, 
     private toaster: ToasterService) { }
   ngOnInit() {
    this.getTeamList()
  
  }
  getTeamList(){
    this.spinnerService.show()
    this.commonService.GetAllTeams().subscribe((res:any)=>{
      this.teams = res.teamTypes;
      this.logs=this.teams
      this.spinnerService.hide()
  
    },
    error=>{
      this.spinnerService.hide()
   alert(error.error)
    })
  }
  makeTitle(slug: any) {
    var words = slug.split('_');
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return words.join(' ');
  }
  // AddTeamMembers() {
  //   this.isActive = !this.isActive;
  // }
  deleteTeam(value:any){

  }

  
  masterSelected:boolean=false
  isChecked:boolean=false
  isCheckedAll=false
  Logs:any[]=[]
  isAllSelected(evt:any, index:any) {


    this.teams[index].isChecked = evt.target.checked
    this.masterSelected = this.teams.every((l) => l.isChecked == true);

    let checkselectedteams=this.teams.find(x=>x.isChecked==true);
     if(this.masterSelected == true){
     this.isChecked = true;
     this.isCheckedAll = true;
     }
     else if(checkselectedteams !=undefined){
      this.isChecked = true;
      this.isCheckedAll = false;

     }
     else{
       this.isChecked = false
     }

     let id = Number(evt.target.value);
     let log=this.teams.find(x=>x.id===id);
     if (index >= 0 && evt.target.checked == true) {
       this.Ids.push(log.id);

     }

     if (evt.target.checked == false) {
       for (var i = 0; i <= this.Ids.length; i++) {
        this.Ids.forEach((x:any)=>{
          if(x==id){
            this.Ids.splice(i,1)
          }
        })
       }
     
     }
  }
  reloadComponent(){
    this.getTeamList()
    this.isChecked=false
    this.masterSelected=false
    this.isCheckedAll=false
  }
  checkUncheckAll(evt:any) {
    debugger
    this.teams.forEach((c) => { c.isChecked = evt.target.checked })
    this.masterSelected = this.teams.every((l) => l.isChecked == true);
    if (this.masterSelected == true) {
      debugger
      this.teams.forEach((d) => {
        this.Ids.push(d.id);
 
      })
      this.isChecked = true;
      this.isCheckedAll = true;
    }
    else {
      this.teams.forEach((d) => {
        
        for (var i = 0; i <= this.Ids.length; i++) {
          this.Ids.forEach((x:any)=>{
            if(x==d.id){
     this.Ids.splice(i,1)

            }
          })
       
        }
      })
      this.isChecked = false;
      this.isCheckedAll = false;
    }
  }
}
