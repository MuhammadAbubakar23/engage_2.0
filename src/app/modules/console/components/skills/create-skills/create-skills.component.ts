import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AddSkillMembersComponent } from '../add-skill-members/add-skill-members.component';

@Component({
  selector: 'app-create-skills',  
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule, AddSkillMembersComponent],
  templateUrl: './create-skills.component.html',
  styleUrls: ['./create-skills.component.scss']
})
export class CreateSkillsComponent implements OnInit {

  isActive=false;

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

  onSubmit() : void {
    console.log(this.userForm.value);
  }
  
  AddTeamMembers(){
    this.isActive=!this.isActive;
  }

}
