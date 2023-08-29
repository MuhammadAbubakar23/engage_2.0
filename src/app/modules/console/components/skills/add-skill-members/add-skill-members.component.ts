import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormControlName,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-skill-members',
  standalone:true,
  imports:[CommonModule ,ReactiveFormsModule,FormsModule],
  templateUrl: './add-skill-members.component.html',
  styleUrls: ['./add-skill-members.component.scss']
})
export class AddSkillMembersComponent implements OnInit {
  isSelectedIds:any[]=[];
  isSelectedIdstostring:string='';
  numbers:any;
  search:any='User name'
  isSelectedTeam:any=''
  AlterMsg='Team Members Added Successfully'
  toastermessage:boolean=false
  constructor() { }
  teamMemberForm=new FormGroup({
 numbersIds:new FormControl('',Validators.required)
  })

  ngOnInit(): void {



  }
  
  teamMemberDetails:any[]=[
    {
      imageUrl:"../../../../../../assets/images/avatar-16.jpg",
      name:"Usman Khan",
      id:1
    },
    {
      imageUrl:"../../../../../../assets/images/avatar-11.jpg",
      name:"Ahmad Khan",
      id:2

    },
    {
      imageUrl:"../../../../../../assets/images/avatar-11.jpg",
      name:"Awais Khan",
      id:3
    },
    {
      imageUrl:"../../../../../../assets/images/avatar-10.jpg",
      name:"Umair Khan",
      id:4
    },
    {
      imageUrl:"../../../../../../assets/images/avatar-16.jpg",
      name:"Ali khan",
      id:5
    },
    {
      imageUrl:"../../../../../../assets/images/avatar-11.jpg",
      name:"test user",
      id:6
    },
     {
      imageUrl:"../../../../../../assets/images/avatar-10.jpg",
      name:"Abu Bakar",
      id:7

    }
  ]
  
  save(){

    this.isSelectedIdstostring=this.isSelectedIds.toString();
    this.teamMemberForm.value.numbersIds=this.isSelectedIdstostring;
    console.log("this.teamMemberForm===>",this.teamMemberForm.value.numbersIds)
  }

isSelected(id:number):boolean{
  return this.isSelectedIds.indexOf(id)>=1
}
toggleSelectionIds(id:number):void{

  const index =this.isSelectedIds.findIndex((x:any)=>x==id)
  if(index >=0){
    this.isSelectedIds.splice(index,1)
  }
  else{
    this.isSelectedIds.push(id)
  }
 console.log("this.isSelectedIds==>",this.isSelectedIds)
 if(this.isSelectedIds.length>=0){}
}


closeToaster(){
  this.toastermessage=false
}
}
