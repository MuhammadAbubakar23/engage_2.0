import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
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
  errormessage: any
  AlterMsg: any;
  teamType: any[] = []
  toastermessage: boolean = false
  constructor(private headerService: HeaderService, private _aRoute: ActivatedRoute, private formbuilder: UntypedFormBuilder,
    private commonService: CommonDataService, private teamservice: TeamsService, private router: Router) { }
  teamForm !: FormGroup
  currentid: any;
  ngOnInit() {
    this.currentid = Number(this._aRoute.snapshot.paramMap.get('id'))
    this.commonService.TeamGetById(this.currentid).subscribe((res: any) => {
      this.teamForm.patchValue({
        name: res.name,
        desc: res.desc,
        timeZone: res.timeZone,
        typeId: res.typeId
      })
    })
    // this._aRoute.params.subscribe((res) => {
    //   this.currentid = Number(res);
    //   if (this.currentid !== 0 && this.currentid !== undefined) {
    //   }
    // })
    this.initializeForm();
    this.getTeamType();
    // this.getClient()
  }
  initializeForm() {
    this.teamForm = this.formbuilder.group({
      name: ['', Validators.required],
      desc: ['', [Validators.required]],
      timeZone: ['', Validators.required],
      norm: [''],
      slug: [''],
      typeId: ['', Validators.required],
      // type: ['', Validators.required],
      // active:['1',Validators.required]
    });
  }
  getTeamType() {
    this.commonService.GetTeamType().subscribe((res: any) => {
      this.teamType = res
    })
  }
  closeToaster() {
    this.toastermessage = false
  }
  formData: any
  onSubmit() {
    if (this.teamForm.valid) {
      // if(this.currentid !==0){
      // }
      if (this.currentid == 0) {
        this.formData = {
          typeId: Number(this.teamForm.value.typeId),
          name: this.teamForm.value.name,
          desc: this.teamForm.value.desc,
          timeZone: this.teamForm.value.timeZone,
          norm: this.teamForm.value.norm,
          slug: this.teamForm.value.slug,
          type: this.teamForm.value.type
        }
        this.commonService.AddTeam(this.formData).subscribe(
          (response: any) => {
            this.reloadComponent('teamAdd');
            this.router.navigate(['/console/teams']);
          },
          (error: any) => {
            console.error("Add Team Error:", error);
            this.handleError(error);
          }
        );
      }
      else {
        this.formData = {
          id: this.currentid,
          typeId: Number(this.teamForm.value.typeId),
          name: this.teamForm.value.name,
          desc: this.teamForm.value.desc,
          timeZone: this.teamForm.value.timeZone,
          norm: this.teamForm.value.norm,
          slug: this.teamForm.value.slug,
          type: this.teamForm.value.type
        };
        this.commonService.UpdateTeam(this.formData).subscribe(
          (res: any) => {
            this.router.navigate(['/console/teams']);
          },
          (error: any) => {
            console.error("Update Error:", error);
            this.handleError(error);
          }
        );
      }
    } else {
      // Handle invalid form data
    }
  }
  private handleError(error: any) {
    this.errormessage = error.error.message;
    this.reloadComponent('error');
  }
  cancelForm() {
    this.router.navigate(['/console/teams']);
    this.headerService.updateMessage('teams');
  }
  reloadComponent(value: any) {
    if (value == 'error') {
      this.AlterMsg = this.errormessage
      this.toastermessage = true
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);
    }
    if (value == 'teamAdd') {
      this.AlterMsg = 'team Add Successfully !';
      this.toastermessage = true
      setTimeout(() => {
        this.toastermessage = false
      }, 2000)
    }
  }
}
