import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { TeamsService } from '../../../services/teams.service';
import { AddTeamMembersComponent } from '../add-team-members/add-team-members.component';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';



@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddTeamMembersComponent, LayoutsModule],
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {


  identity: number = 0;
  errormessage:any
  AlterMsg:any;
  toastermessage:boolean=false
  constructor(private headerService: HeaderService, private _aRoute: ActivatedRoute, private formbuilder: UntypedFormBuilder,
     private commonService: CommonDataService, private teamservice: TeamsService, private router: Router) { }



  teamForm !: FormGroup
  currentid = 0;


  ngOnInit() {

    this.initializeForm();
    // this.getClient()
  }



  initializeForm() {
    this.teamForm = this.formbuilder.group({

      name: ['', Validators.required],
      desc: ['', [Validators.required]],
      timeZone: ['', Validators.required],
      norm: [''],
      slug: [''],
      typeId: ['']
      // type: ['', Validators.required],
      // active:['1',Validators.required]


    });

  }
  closeToaster(){
    this.toastermessage=false
  }
  onSubmit() {
    if (this.teamForm.valid) {
      const formData = {
        id: 0,
        typeId: Number(this.teamForm.value.typeId),
        name: this.teamForm.value.name,
        desc: this.teamForm.value.desc,
        timeZone: this.teamForm.value.timeZone,
        norm: this.teamForm.value.norm,
        slug: this.teamForm.value.slug

      };

      if (this.currentid !== 0 && this.currentid !== undefined) {
        this.commonService.UpdateTeam(formData).subscribe((res: any) => {
          console.log("Update Response:", res);
          this.router.navigate(['/console/teams']);


        });
      } else {
        this.commonService.AddTeam(formData).subscribe(
          (response: any) => {
            console.log("Add User Response:", response);
            this.reloadComponent('teamAdd')
            this.router.navigate(['/console/teams']);

          },
          (error: any) => {
            this.errormessage = error.error.message;
            this.reloadComponent('error')
          }
        );
      }

      console.log("Form Data:", formData);
    } else {
      console.log('Form is invalid:', this.teamForm);
      // this.teamForm.markAllAsTouched(); 
    }
  }
  cancelForm() {
    this.router.navigate(['/console/teams']);

  }
  reloadComponent(value:any){
  if(value=='error'){
    this.AlterMsg=this.errormessage
    this.toastermessage=true
    setTimeout(() => {
      this.toastermessage=false
    }, 2000);
  }
  if(value=='teamAdd'){
  this.AlterMsg='team Add Successfully !';
  this.toastermessage=true
  setTimeout(()=>{
this.toastermessage=false
  },2000)
  }
  }
 
}



