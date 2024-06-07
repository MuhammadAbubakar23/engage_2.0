import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
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
  RolesNPermission:MenuModel[]=[];
  roleForm : UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(),
    normalizedName: new UntypedFormControl(),
    name : new UntypedFormControl(),
    description : new UntypedFormControl(),
    acesses: this.formbuilder.array([]),
    permissions: this.formbuilder.array([]),
    properties: this.formbuilder.array([]),
    
  });
  idnetity:number=0;
  submitted = false;
  RolesNPermissionsChecked:Array<any>=[];
  constructor(private location: Location, private headerService: HeaderService, private _Activatedroute:ActivatedRoute, private formbuilder : UntypedFormBuilder, private roleService : RolesAndPermissionsService, private router: Router) { }

  ngOnInit(): void {
    this.RolesNPermission = this._Activatedroute.snapshot.data["rolesnpermission"];


    this.roleForm = this.formbuilder.group({
      name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      description: ['',[Validators.required]],     
      permissions: this.formbuilder.array([], [Validators.required]),
      // businesshours:['', [Validators.required]],
      // supportchannelhour:['', [Validators.required]],
      // supportchannelteam:['', [Validators.required]]
      
    })
  }
  onSubmit() : void {
    const permissions: FormArray = this.roleForm.get('permissions') as FormArray;
    while (permissions.length !== 0) {
      permissions.removeAt(0)
    }
    this.RolesNPermissionsChecked.forEach(function (jsonval:any) {
      permissions.push(new FormControl(jsonval));
    });
    // if (this.teamForm.invalid) {
    //  // return;
    // }
    //breturn;
    let controllerRoute = "AddRole";
    this.roleService.save(controllerRoute, this.roleForm.value).subscribe({ 
      next: (res:any) => {
        this.router.navigate(['/console/roles-permissions']);

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
    // let val = Object.values(menuData);
    //Object.entries(menuData).
    Object.values(menuData).forEach((innerArray:any) => {
      innerArray.forEach(function (jsonval:any) {
        _self.RolesNPermissionsChecked.push(jsonval.mainId);
      });      
    })
  }
  onBtnClick(){
    // Navigate to /products page
    // this.router.navigate(['/console/roles-permissions']);
    this.location.back();
  }
}
