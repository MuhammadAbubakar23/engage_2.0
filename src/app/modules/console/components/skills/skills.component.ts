import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-skills',
  standalone:true,
  imports:[CommonModule, RouterModule,FormsModule],//, CreateTeamComponent
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  search:any='VW'
  fillter:any="Roles"
  selectedIds:any[]=[]
  isChecked:boolean=false
  showIcon:boolean=false
  allSelected:boolean=false
  Page:any=1
  itemperpage:any=10;
  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
  }
  updatevalue(string:any){

    this.headerService.updateMessage(string);
  }
   userDetails:any[]=[

    { id: 1, teams:"vw",userid:333,department:"information technology"},
    { id: 2, teams:"special Projects",userid:3434,department:"Sales"},
    { id:3, teams:"Corporte Team",userid:3422,department:"Account,Support"},
    { id:4, teams:"lead Management",userid:9988,department:"All"}
   ]















   isSelected(id:number){
    debugger
    return this.selectedIds.indexOf(id)>=0;
   }
   toggleSelection(id:number){
    debugger
      const index= this.selectedIds.findIndex((x)=>x==id);
     if(index>=0){
        this.selectedIds.splice(index,1)
    }
    else{
      this.selectedIds.push(id)
    }

    if(this.selectedIds.length>=0){
      this.showIcon=true
      this.allSelected=true
      this.isChecked=false
    }
    else
    {
      this.showIcon=false
      this.selectedIds=[];
      this.allSelected=false

  
    }
   }


   isSectedAll(){
    this.allSelected=!this.allSelected;
    this.isChecked=!this.isChecked;
    if(this.isChecked){
      this.selectedIds=this.  userDetails.map(item=>item.id);
    }
    else{
      this.selectedIds=[];
    }
    console.log("Selected All===>",this.selectedIds)
    if(this.selectedIds.length>0){
      this.showIcon=true
    }
    else {
      this.showIcon=false
    }
  }
  refresh(){
    this.showIcon=false,
    this.allSelected=false
    this.isChecked=false
    this.selectedIds=[]
  }

}
