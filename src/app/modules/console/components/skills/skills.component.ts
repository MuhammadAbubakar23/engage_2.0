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
  fillter:any="Sales"
  selectedIds:any[]=[]
  isChecked:boolean=false
  showIcon:boolean=false
  allSelected:boolean=false
  Page:any=1
  itemperpage:any=7;
  isSelectedDepartment:any='';
  toastermessage:boolean=false
  isDepartmentArray:any[]=[]
  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    this.userDetails.forEach((x)=>{
      this.isSelectedDepartment=x.department
      console.log("this.isSelectedDepartment==>",this.isDepartmentArray)
      this.isDepartmentArray.push(this.isSelectedDepartment)
    });
 
    
  }
  updatevalue(string:any){

    this.headerService.updateMessage(string);
  }

  
   userDetails:any[]=[
    { id: 1, teams:"vw",userid:333,department:"Information technology"},
    { id: 2, teams:"special Projects",userid:3434,department:"Sales"},
    { id:3, teams:"Corporte Team",userid:3422,department:"Account,Support"},
    { id:4, teams:"lead Management",userid:9988,department:"All"},
    { id:5, teams:"PK Sport",userid:9988,department:"All"},
    { id:6, teams:"HR Management",userid:9988,department:"All"},
    { id:7, teams:"IT Managment",userid:9908,department:"IT Managemnet"},

   ]
   isSelected(id:number){
    return this.selectedIds.indexOf(id)>=0;
   }
   toggleSelection(id:number){
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

    if(this.selectedIds.length==this.itemperpage){
      this.isChecked=true
      this.refresh()
    }
   }

   isSectedAll(){
    this.allSelected=!this.allSelected;
    this.isChecked=!this.isChecked;
    if(this.isChecked){
      this.selectedIds=this.userDetails.map(item=>item.id);
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
    this.selectedIds=[];
  }
isDecsendingorder:boolean=false

isDeccsendingsort:string=''

sortedBy(data:string){

  this.isDecsendingorder=!this.isDecsendingorder
 this.userDetails.sort((a:any,b:any)=>{
  if(a[data]<b[data]){
   
    return this.isDecsendingorder ? 1:-1;
  }
  if(a[data]>b[data]){
   
    return this.isDecsendingorder ? -1:1;
  }
  return 0
 })
}
deleted(id:number){
  
console.log("This.delted ====>",id)
this.userDetails= this.userDetails.filter((x)=>x.id!==id)
this.toastermessage=true
setTimeout(() => {
  this.toastermessage=false
}, 2000);
}
checkout:any=''
getByDepartment(event:any){
  
  this.fillter=event.target.value


}
getbySearch(){
  if(this.search.length>=2){

  }
}
closeToaster(){
  this.toastermessage=false
}
}
