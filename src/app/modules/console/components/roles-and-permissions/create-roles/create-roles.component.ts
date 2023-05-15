import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { RolesAndPermissionsService } from '../roles-and-permissions.service';

@Component({
  selector: 'app-create-roles',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, LayoutsModule],
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
  menulistselectall:string = "Permissions";
  RolesNPermission:any=[];
  roleForm : UntypedFormGroup = new UntypedFormGroup({
    name : new UntypedFormControl(),
    description : new UntypedFormControl(),
    // businesshours : new UntypedFormControl(),
    // supportchannelhour : new UntypedFormControl(),
    // supportchannelteam : new UntypedFormControl(),
    
  });
  submitted = false;
  RolesNPermissionsChecked:Array<any>=[];
  constructor(private location: Location, private headerService: HeaderService, private _Activatedroute:ActivatedRoute, private formbuilder : UntypedFormBuilder, private roleService : RolesAndPermissionsService, private router: Router) { }

  ngOnInit(): void {
    this.RolesNPermission = this._Activatedroute.snapshot.data["rolesnpermission"];
    console.log(this.RolesNPermission);
    console.table(this.RolesNPermission);
    this.roleForm = this.formbuilder.group({
      name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      description: ['',[Validators.required]],     
      acesses: this.formbuilder.array([], [Validators.required]),
      // businesshours:['', [Validators.required]],
      // supportchannelhour:['', [Validators.required]],
      // supportchannelteam:['', [Validators.required]]
      
    })
  }
  onSubmit() : void {
    // console.log(this.teamForm.value);
    const acesses: FormArray = this.roleForm.get('acesses') as FormArray;
    while (acesses.length !== 0) {
      acesses.removeAt(0)
    }
    this.RolesNPermissionsChecked.forEach(function (jsonval:any) {
      acesses.push(new FormControl(jsonval));
    });
    console.log(this.roleForm.value);
    // if (this.teamForm.invalid) {
    //   console.log("In invalid")
    //  // return;
    // }
    // console.log(this.userForm.value);
    // console.log();
    //breturn;
    let controllerRoute = "AddRole";
    this.roleService.save(controllerRoute, this.roleForm.value).subscribe({ 
      next: (res:any) => {
        console.log(res)
      },
      error: (err: HttpErrorResponse) => {
        // this.errorMessage = err.message;
        // this.showError = true;
      }
    });
    
    
  }
  setMenuList(menuData:any){
    let _self = this;
    this.RolesNPermissionsChecked = [];
    console.log(menuData);
    // let val = Object.values(menuData);
    // console.log(val);
    //Object.entries(menuData).
    Object.values(menuData).forEach((innerArray:any) => {
      //console.log(innerArray);
      innerArray.forEach(function (jsonval:any) {
        _self.RolesNPermissionsChecked.push(jsonval.mainId);
        //console.log(jsonval);
      });      
    })
    console.log(_self.RolesNPermissionsChecked);
  }
  onBtnClick(){
    // Navigate to /products page
    // this.router.navigate(['/console/roles-permissions']);
    this.location.back();
  }
}
