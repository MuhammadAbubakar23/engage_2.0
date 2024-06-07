import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { MenuModel } from 'src/app/layouts/engage2/menu-state/menu.model';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
//import { AutoUnsubscribe } from 'src/app/shared/services/decorator/auto-unsubscribe';
import { CompaniesService } from '../../../services/companies.service';


// import { AddCompaniesMembersComponent } from '../add-companies-members/add-companies-members.component'; AddCompaniesMembersComponent,
// import { CompaniesService } from '../companies.service';
/// @AutoUnsubscribe
@Component({
  selector: 'create-companies',
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule,  LayoutsModule],
  templateUrl: './create-companies.component.html',
  styleUrls: ['./create-companies.component.scss']
})
export class CreateCompaniesComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<void> = new Subject();

  permissionlistselectall:string = "Privileges";
  accesslistselectall:string = "Privileges";
  propertieslistselectall:string = "Privileges";
  isActive=false;
  
  companiesForm : UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(),
    normalizedName: new UntypedFormControl(),
    name : new UntypedFormControl(),
    description : new UntypedFormControl(),
    acesses: this.formbuilder.array([]),
    permissions: this.formbuilder.array([]),
    properties: this.formbuilder.array([]),
      
    // businesshours : new UntypedFormControl(),
    // supportchannelhour : new UntypedFormControl(),
    // supportchannelcompanies : new UntypedFormControl(),
    
  });
  identity:number=0;
  submitted = false;
  //CompaniesNAccessesPermissions:MenuModel[]=[];
  Companies?:MenuModel;
  CompaniesNProperties:MenuModel[]=[];
  CompaniesNAccesses:MenuModel[]=[];
  CompaniesNPermissions:MenuModel[]=[];
  CompaniesNPropertiesChecked:MenuModel[]=[];
  CompaniesNAccessesChecked:Array<any>=[];
  CompaniesNPermissionsChecked:Array<any>=[];

  constructor(private headerService: HeaderService, 
    private _Activatedroute:ActivatedRoute, 
    private formbuilder : UntypedFormBuilder, 
    private companiesservice:CompaniesService) { }
    
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.CompaniesNPermissions = this._Activatedroute.snapshot.data["companiesroles"];
    this.CompaniesNAccesses = this._Activatedroute.snapshot.data["companiesteams"];
    this.CompaniesNProperties = this._Activatedroute.snapshot.data["companiesprops"];
    this.Companies = this._Activatedroute.snapshot.data["companies"];
    
    // this.CompaniesNAccessesPermissions = [...this.CompaniesNAccesses, ...this.CompaniesNPermissions];
   
    this._Activatedroute.paramMap.subscribe(paramMap => { 
      this.identity = Number(paramMap.get('id'));      
    });
   // ;
   // if(this.identity > 0){//
    //  this.companiesservice.getCompanyById(this.identity);//.pipe(takeUntil(this.unsubscribe))
      // this._request.getBy<any>("GetCompanyById",  this.identity.toString()).subscribe(
      //   (next:userDto) => {//...next:T[]
      //     this.setform(next);
      //   },
      //   (error:any) => console.log(error)
      // );
      //this.btnText = "Update"
    // }
    // else{
    //   //userDto fullName:"Ali Ahmad", userName:null,
    //   let form = {
    //     id:0,
    //     email:"",
    //     firstName:"",
    //     lastName:"",
    //     password:"",
    //     confirmPassword:"",
    //     phone:"",
    //     roleId:[],
    //     teamId:[],
    //   //  teams:"",
    //   //  userId:[],//null0000void//null0000void
       
    //   }
    //   this.setform(form);
    // }

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    
    this.companiesForm = this.formbuilder.group({
      id: [this.identity],
      normalizedName: [this.Companies?.normalizedName],
      name: [this.Companies?.name,[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      description: [this.Companies?.desc,[Validators.required]],     
      acesses: this.formbuilder.array([], [Validators.required]),
      permissions: this.formbuilder.array([], [Validators.required]),
      properties: this.formbuilder.array([], [Validators.required]),
      // businesshours:['', [Validators.required]],
      // supportchannelhour:['', [Validators.required]],
      // supportchannelcompanies:['', [Validators.required]]
      
    })
  }

  onSubmit() : void {
    let _self = this;
    const acesses: FormArray = this.companiesForm.get('acesses') as FormArray;
    while (acesses.length !== 0)  acesses.removeAt(0);
    this.CompaniesNAccessesChecked.forEach(function (jsonval:any) {
      acesses.push(new FormControl(jsonval));
    });

    const permissions: FormArray = this.companiesForm.get('permissions') as FormArray;
    while (permissions.length !== 0)  permissions.removeAt(0);
    this.CompaniesNPermissionsChecked.forEach(function (jsonval:any) {
      permissions.push(new FormControl(jsonval));
    });

    const properties: FormArray = this.companiesForm.get('properties') as FormArray;
    while (properties.length !== 0)  permissions.removeAt(0);
    this.CompaniesNPropertiesChecked.forEach(function (jsonval:any) {
      acesses.push(new FormControl(jsonval)); //properties.push(new FormControl(jsonval));
    });
    
    // if (this.companiesForm.invalid) {
    //  // return;
    // }
    
    let controllerRoute = "TeamProperties";
    this.companiesservice.save(controllerRoute, this.companiesForm.value)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({ 
          next: (team:any) => {
            _self.companiesservice.save("RoleProperties", this.companiesForm.value)
              .pipe(takeUntil(this.onDestroy$))
              .subscribe({ 
                next: (role:any) => {
                },
                error: (err: HttpErrorResponse) => {
                  // this.errorMessage = err.message;
                  // this.showError = true;
                }
              });
          },
          error: (err: HttpErrorResponse) => {
            // this.errorMessage = err.message;
            // this.showError = true;
          }
        });
    // while (acesses.length !== 0)  acesses.removeAt(0);
    // this.CompaniesNPermissionsChecked.forEach(function (jsonval:any) {
    //   acesses.push(new FormControl(jsonval));
    // });
    // //let controllerRoute = "RoleProperties";
    // this.companiesservice.save("RoleProperties", this.companiesForm.value).pipe(takeUntil(this.onDestroy$)).subscribe({ 
    //   next: (res:any) => {
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     // this.errorMessage = err.message;
    //     // this.showError = true;
    //   }
    // });
  }
  setPropertiesList(PropertyData:any){
    let _self = this;
    this.CompaniesNPropertiesChecked = [];
    Object.values(PropertyData).forEach((innerArray:any) => {
      innerArray.forEach(function (jsonval:any) {
        _self.CompaniesNPropertiesChecked.push(jsonval.mainId);
      });      
    })
  }
  setAccessList(AccessData:any){
    let _self = this;
    this.CompaniesNAccessesChecked = [];
    Object.values(AccessData).forEach((innerArray:any) => {
      innerArray.forEach(function (jsonval:any) {
        _self.CompaniesNAccessesChecked.push(jsonval.mainId);
      });      
    })
  }
  setPermissionList(PermissionData:any){
    let _self = this;
    this.CompaniesNPermissionsChecked = [];
    Object.values(PermissionData).forEach((innerArray:any) => {
      innerArray.forEach(function (jsonval:any) {
        _self.CompaniesNPermissionsChecked.push(jsonval.mainId);
      });      
    })
  }
  AddCompaniesFormArry(e:any){
    const checkArray: FormArray = this.companiesForm.get('checkArray') as FormArray;
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
  
}
