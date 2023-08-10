import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { TeamsService } from '../../../services/teams.service';
import { AddTeamMembersComponent } from '../add-team-members/add-team-members.component';


@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddTeamMembersComponent, LayoutsModule],
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  menulistselectall: string = "Privileges";
  isActive = false;

  teamForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(),
    normalizedName: new UntypedFormControl(),
    name: new UntypedFormControl(),
    description: new UntypedFormControl(),
    acesses: this.formbuilder.array([]),
    permissions: this.formbuilder.array([]),
    properties: this.formbuilder.array([]),

  });

  identity: number = 0;
  submitted = false;
  TeamIn: any;
  TeamsNAccesses: MenuModel[] = [];
  TeamsNAccessesChecked: Array<any> = [];

  constructor(private headerService: HeaderService, private _Activatedroute: ActivatedRoute, private formbuilder: UntypedFormBuilder, private teamservice: TeamsService, private router: Router) { }

  ngOnInit(): void {
    this.TeamsNAccesses = this._Activatedroute.snapshot.data["teamsnpermission"];
    this.TeamIn = this._Activatedroute.snapshot.data["teamin"];
    this._Activatedroute.paramMap.subscribe(paramMap => {
      this.identity = Number(paramMap.get('id'));
    });
    // console.log(this.TeamsNAccesses);
    // console.table(this.TeamsNAccesses);

    // console.log(this.TeamIn);
    // console.table(this.TeamIn);

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));

    this.teamForm = this.formbuilder.group({
      id: [this.identity],
      normalizedName: [this.TeamIn?.normalizedName],
      name: [this.TeamIn?.name, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      description: [this.TeamIn?.desc, [Validators.required]],
      acesses: this.formbuilder.array([], [Validators.required]),
      // businesshours:['', [Validators.required]],
      // supportchannelhour:['', [Validators.required]],
      // supportchannelteam:['', [Validators.required]]

    })
  }

  onSubmit(): void {
    // console.log(this.teamForm.value);
    const acesses: FormArray = this.teamForm.get('acesses') as FormArray;
    while (acesses.length !== 0) {
      acesses.removeAt(0)
    }
    this.TeamsNAccessesChecked.forEach(function (jsonval: any) {
      acesses.push(new FormControl(jsonval));
    });
    console.log(this.teamForm.value);
    // if (this.teamForm.invalid) {
    //   console.log("In invalid")
    //  // return;
    // }
    // console.log(this.userForm.value);
    // console.log();
    //breturn;
    let controllerRoute = "AddTeam";
    this.teamservice.save(controllerRoute, this.teamForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.router.navigate(['/console/teams']);

      },
      error: (err: HttpErrorResponse) => {
        // this.errorMessage = err.message;
        // this.showError = true;
      }
    });


  }
  setMenuList(menuData: any) {
    let _self = this;
    this.TeamsNAccessesChecked = [];
    console.log(menuData);
    // let val = Object.values(menuData);
    // console.log(val);
    //Object.entries(menuData).
    Object.values(menuData).forEach((innerArray: any) => {
      //console.log(innerArray);
      innerArray.forEach(function (jsonval: any) {
        _self.TeamsNAccessesChecked.push(jsonval.mainId);
        //console.log(jsonval);
      });
    })
    console.log(_self.TeamsNAccessesChecked);
  }
  AddTeamFormArry(e: any) {
    const checkArray: FormArray = this.teamForm.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  cancelForm() {
    this.router.navigate(['/console/teams']);

  }
}
