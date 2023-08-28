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
fillter:any="Roles"
sort:any=''
  userForm : UntypedFormGroup = new UntypedFormGroup({
    teamname : new UntypedFormControl(),
    description : new UntypedFormControl(),
    businesshours : new UntypedFormControl(),
    supportchannelhour : new UntypedFormControl(),
    supportchannelteam : new UntypedFormControl(),
    
  });
  submitted = false;
  
  constructor(private formbuilder : UntypedFormBuilder) { }

  ngOnInit(): void {

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
    debugger
    let data={
      "name":this.userForm.value,
      "assignment":this.assignment,
      "availability":this.availability,
    }
    console.log("this.userForm.value===>",data);
    this.userForm.reset()
  }
  
  AddTeamMembers(){
    this.isActive=!this.isActive;
  }







  // the listing of teams and Member
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
      role:"Admin",
      team:"VW Tach"
    },
    {
      imageURI:"../../../../../../assets/images/avatar-16.jpg",
      id:3,
      name:"Usman Khan",
      EMPid : 9877,
      role:"User ",
      team:"Jazz"
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
      }
      else{
        this.showIcon=false
        this.selectedIds=[]
        this.isChecked=false
      }
    }
    sortedBy(data:string){
      // this.teamMembersList.sort((a,b)=>a[data]>b[data] ? 1 :-1)
    } 
    assignment:any=''
    getAssignmentByid(id:any){
    this.assignment=id

    }
    availability:any=''
   getAvailability(id:any){
    this.availability=id

   }
}
