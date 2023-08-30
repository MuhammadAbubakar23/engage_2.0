import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
   ReactiveFormsModule, 
  FormsModule,  
  UntypedFormBuilder,
   UntypedFormControl, 
   UntypedFormGroup, 
   Validators ,FormControl,FormControlName,} from '@angular/forms';
import { AddSkillMembersComponent } from '../add-skill-members/add-skill-members.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-skills',  
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule, FormsModule, AddSkillMembersComponent],
  templateUrl: './create-skills.component.html',
  styleUrls: ['./create-skills.component.scss']
})
export class CreateSkillsComponent implements OnInit {
  toastermessage=false
  AlterMsg="Team Information Add Successfully"
  isActive=false;
  text:any='Team Name'
isChecked:boolean=false
selectedIds:any[]=[]
allselected:boolean=false
showIcon:boolean=false;
fillter:any="Roles";
isSelectedTeam:any='';
isSelectedTeamArray:any=[]
sort:any=''
sortDir=1
  userForm : UntypedFormGroup = new UntypedFormGroup({
    teamname : new UntypedFormControl(),
    description : new UntypedFormControl(),
    businesshours : new UntypedFormControl(),
    supportchannelhour : new UntypedFormControl(),
    supportchannelteam : new UntypedFormControl(),
    
  });
  submitted = false;
  
  constructor(private formbuilder : UntypedFormBuilder,private router: Router) {
   
   }

  ngOnInit(): void {
    this.teamMembersList.forEach((x)=>{
      this.isSelectedTeam=x.team
      this.isSelectedTeamArray.push(this.isSelectedTeam)
      console.log("this.isSelectedTeamArray==>",this.isSelectedTeamArray)

    })

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.userForm = this.formbuilder.group({
      teamname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      description: ['',[Validators.required]],
      businesshours:['', [Validators.required]],
      supportchannelhour:['', [Validators.required]],
      supportchannelteam:['', [Validators.required]]
      
    })
  }

  onSubmit(){
    let data={
      "name":this.userForm.value,
      "assignment":this.assignment,
     
    }
    console.log("this.userForm.value===>",data);
    this.userForm.reset()
    this.router.navigateByUrl('/console/skills')
  }
  
  AddTeamMembers(){
    this.isActive=!this.isActive;
  }







  // the listing of teams and Member  and other components team Members
  teamMembersList:any[]=[
    {
      imageURI:"../../../../../../assets/images/avatar-16.jpg",
      id:1,
      name:"Ahamad Khab",
      EMPid:76777,
      role:"Agent",
      team:"Support",
    },
    {
      imageURI:"../../../../../../assets/images/avatar-16.jpg",
      id:2,
      name:"Ali Khan",
      EMPid:8989,
      role:"Employee",
      team:"VW Tach"
    },
    {
      imageURI:"../../../../../../assets/images/avatar-10.jpg",
      id:3,
      name:"Usman Khan",
      EMPid : 9877,
      role:"User ",
      team:"Jazz"
    },
    {
      imageURI:"../../../../../../assets/images/avatar-11.jpg",
      id:4,
      name:"Umar khan",
      EMPid : 9877,
      role:"Employee ",
      team:"Zong"
    }
  ]
  
  isSelected(id:number){
    return this.selectedIds.indexOf (id)>=0 }
    toggleselection(id:number){
      const index =this.selectedIds.findIndex((x)=>x==id)
      if(index>=0){
        this.selectedIds.splice(index,1)
      }
      else{
        this.selectedIds.push(id)
      }
      if(this.selectedIds.length>=0){
     this.showIcon=true
   this.isChecked=false
   
      }
      else{
        this.showIcon=false
        this.allselected=false
        this.selectedIds=[]
      }
    }
    refresh(){
      this.showIcon=false
      this.selectedIds=[]
      this.allselected=false
      this.isChecked=false
      
    }

    selectedunselectedAll(){
      this.allselected=!this.allselected
      this.isChecked=!this.isChecked
      if(this.isChecked){
        this.selectedIds=this.teamMembersList.map(item=>item.id)
        console.log("this.selectedIds===>",this.selectedIds)
      }
      else{
        this.selectedIds=[]
      }
      if(this.selectedIds.length>=0){
        this.showIcon=true
        this.allselected=true;
        this.isChecked=false
      }
      else{
        this.showIcon=false
        this.selectedIds=[]
        this.isChecked=false
      }
      if(this.selectedIds.length==4){
        this.isChecked=true
      }
    }
    
   
    assignment:any=''
    getAssignmentByid(value:string){
    this.assignment=value

    }
    availability:any=''
   getAvailability(id:any){
    this.availability=id

   }
   isDescendingOrder: boolean = false
   sortedBy(data: string, ) {
this.isDescendingOrder=!this.isDescendingOrder
   this. teamMembersList.sort((a: any, b: any) => {
        if (a [data] < b[data]) {
            return this.isDescendingOrder ? 1 : -1;
        }
        if (a[data] > b[data]) {
            return this.isDescendingOrder ? -1 : 1;
        }
        return 0;
    });
}


routerLink(){
this.router.navigateByUrl('/console/skills')
}

  }