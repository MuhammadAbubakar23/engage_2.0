import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';
import { userDto } from 'src/app/shared/Models/concersationDetailDto';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import Validation from 'src/app/shared/Util/validation';
import { TeamsService } from '../../../services/teams.service';
import { RolesAndPermissionsService } from '../../roles-and-permissions/roles-and-permissions.service';
import { UsersService } from '../users.service';
import { NavigationBackDirective } from 'src/app/shared/services/navigation/navigation-back.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'create-user',
  standalone:true,
  imports:[SharedModule, CommonModule, ReactiveFormsModule,  MatChipsModule, MatIconModule, MatSelectModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers:[NavigationBackDirective]
})
export class CreateUserComponent implements OnInit {
  //identity:string | null | undefined = "0";
  identity: number = 0;
  btnText: string = "Save";
  userForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(),
    firstname: new UntypedFormControl(),
    lastname: new UntypedFormControl(),
    //  flexSwitchCheckDefault : new UntypedFormControl(),
    phone: new UntypedFormControl(),
    email: new UntypedFormControl(),
    password: new UntypedFormControl(),
    confirmpassword: new UntypedFormControl(),
    roleId: new UntypedFormControl(),
    teamId: new UntypedFormControl(),
    //   teams : new UntypedFormControl(),    
    // timezone : new UntypedFormControl(),
    // supportchannel : new UntypedFormControl(),
    // language : new UntypedFormControl(),

  });
  submitted = false;
  RolesControl = new UntypedFormControl(null, Validators.required);
  TeamsControl = new UntypedFormControl(null, Validators.required);
  // RolesControlId = new UntypedFormControl(null, Validators.required);
  // SkillsControl = new UntypedFormControl(null, Validators.required);
  Roles: Array<any> = [];
  Teams: Array<any> = [];
  TeamIds: string[] = []
  RoleIds: string[] = [];
  // Skills: string[] = ['English', 'Urdu'];
  constructor(private formbuilder : UntypedFormBuilder
    , private _request:RequestService
    , private _Activatedroute:ActivatedRoute
    , private location: Location
    , private storsrv:StorageService
    , private uservc:UsersService
    , private roles:RolesAndPermissionsService
    , private teams:TeamsService) { }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  ngOnInit(): void {
    // console.log(this._Activatedroute.snapshot.data["teams"]);
    // console.log(this._Activatedroute.snapshot.data["roles"]);
    this.Roles = this._Activatedroute.snapshot.data["roles"];
    this.Teams = this._Activatedroute.snapshot.data["teams"];
    this._Activatedroute.paramMap.subscribe(paramMap => {
      this.identity = Number(paramMap.get('id'));
    });
    // ;
    if (this.identity > 0) {//.pipe(takeUntil(this.unsubscribe))
      this._request.getBy<userDto>("GetUserById", this.identity.toString()).subscribe(
        (next: userDto) => {//...next:T[]
          this.setform(next);
        },
        (error: any) => console.log(error)
      );
      this.btnText = "Update"
    } else {
      //userDto fullName:"Ali Ahmad", userName:null,
      let form = {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        phone: "",
        roleId: [],
        teamId: [],
        //  teams:"",
        //  userId:[],//null0000void//null0000void

      }
      this.setform(form);
    }
    console.log(this.identity);


    // let vr = this.storsrv.retrive("main","o").local;
    // console.log(vr);
    // this.Roles = vr.roles;
  }
  async setform(formVal: any): Promise<void> {
    console.log(formVal);
    this.userForm = this.formbuilder.group({
      id: [formVal.id],
      firstname: [formVal.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: [formVal.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      phone: [formVal.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      email: [formVal.email, [Validators.required, Validators.email]],
      password: [formVal.password, [Validators.required, Validators.minLength(7)]],
      confirmpassword: [formVal.confirmPassword, [Validators.required, Validators.minLength(7)]],
      roleId: ['', [Validators.required]],
      teamId: ['', [Validators.required]],
      // timezone: ['', [Validators.required]],      
      // supportchannel: ['', [Validators.required]],
    }
      ,
      {
        validators: [Validation.match('password', 'confirmPassword')]
      });
    // await this.getRoles();
    // await this.getTeams();
    // console.log("Roles --->>>",this.Roles);
    // console.log("Teams --->>>",this.Teams);
    let roleForm: any = [];
    let teamForm: any = [];
    if (formVal.roleId.length >= 1) {
      formVal.roleId.forEach((element: any) => {
        let mitem = this.Roles.filter((item: any) => item?.name == element);
        roleForm.push(mitem[0]);
      });
      this.RolesControl.setValue(roleForm);
    }
    if (formVal.teamId.length >= 1) {
      formVal.teamId.forEach((element: any) => {
        let mitem = this.Teams.filter((item: any) => item?.name == element);
        teamForm.push(mitem[0]);
      });
      this.TeamsControl.setValue(teamForm);
    }

  }
  // async getRoles():Promise<void>{
  //   await this.roles.getMyRoles().subscribe({ 
  //     next: (res:any) => { 
  //       this.Roles = res;
  //       console.log(res)
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       // this.errorMessage = err.message;
  //       // this.showError = true;
  //     }
  //   });
  // }
  // async getTeams():Promise<void>{
  //   await this.teams.getMyTeams().subscribe({ 
  //     next: (res:any) => { this.Teams = res;
  //       console.log(res)
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       // this.errorMessage = err.message;
  //       // this.showError = true;
  //     }
  //   });
  // }
  onReset(): void {
    this.submitted = false;
    this.location.back();
    this.userForm.reset();
    this.userForm.controls['roleId'].reset();
    this.userForm.controls['teamId'].reset();
  }
  onSubmit(): void {
    let _self = this;
    this.userForm.controls['roleId'].reset();
    this.userForm.controls['teamId'].reset();
    //this.userForm.controls['roleId'].setValue('');
    //this.userForm.controls['teamId'].setValue('');
    // console.log(this.userForm.value);
    // console.log(this.Roles);
    // console.log(this.RolesControl.value);
    this.submitted = true;
    // this.userForm.controls['roleId'].setValue(this.RolesControl.value);

    // let _self = this;
    // // this.RolesControl.value.forEach(function (item:any) {  
    // //     return _self.RoleIds.push(item.id);  
    // // });
    // for(let rol of this.RolesControl.value){
    //   this.RoleIds.push(rol.id);
    // }
    // for (let i in this.RolesControl.value) {
    //   this.RoleIds.push(this.RolesControl.value[i].id);
    // }
    for (let i in this.RolesControl.value) {
      this.RoleIds.push(this.RolesControl.value[i].name.replace(/\s/g, ''));
    }
    for (let i in this.TeamsControl.value) {
      this.TeamIds.push(this.TeamsControl.value[i].name.replace(/\s/g, ''));
    }
    this.userForm.controls['roleId'].setValue(this.RoleIds);
    this.userForm.controls['teamId'].setValue(this.TeamIds);

    console.log(this.userForm);
    console.log(this.userForm.invalid);



    // console.log("submitting");
    // return ;
    // console.log(this.userForm.value);
    // console.log();
    //breturn;
    let controllerRoute = "AddUser";
    if (this.userForm.value.id > 0) {
      controllerRoute = "UpdateUser";
    }
    if (controllerRoute != "UpdateUser" && this.userForm.invalid) {
      console.log("In invalid")
      return;
    }
    if (controllerRoute == "AddUser" && this.userForm?.controls["password"].value !== this.userForm?.controls["confirmpassword"].value) {
      console.log("In Add User");
      return;
    }

    this.uservc.save(controllerRoute, this.userForm.value).subscribe({
      next: (res: any) => {
        console.log(res)
        _self.onReset();
      },
      error: (err: HttpErrorResponse) => {
        // this.errorMessage = err.message;
        // this.showError = true;
      }
    });
    console.log(JSON.stringify(this.userForm.value, null, 2));
  }

  isShow = false;
  isActive = false;

  ManageSkills() {
    this.isShow = !this.isShow;
  }

  ManageSkillsSwitch() {
    this.isActive = !this.isActive;
  }


  onCatRemovedTeam(cat: string) {
    const Teams = this.TeamsControl.value as string[];
    this.removeFirst(Teams, cat);
    this.TeamsControl.setValue(Teams); // To trigger change detection
  }
  onCatRemovedRole(cat: string) {
    const Roles = this.RolesControl.value as string[];
    this.removeFirst(Roles, cat);
    this.RolesControl.setValue(Roles); // To trigger change detection
  }
  private removeFirst(array: any[], toRemove: any): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  // SupportChannelsControl = new UntypedFormControl(null, Validators.required);
  // SupportChannels: string[] = ['Corporate Teams','Sales Teams', 'Add channels'];

  // LanguagesControl = new UntypedFormControl(null, Validators.required);
  // Languages: string[] = ['English', 'Urdu'];
  //this.stor.store("main", res);



  /**
   * Write code on Method
   *
   * method logical code
   */
  // onCatRemovedSupportChannel(cat: string) {

  //   const SupportChannels = this.SupportChannelsControl.value as string[];
  //   this.removeFirst(SupportChannels, cat);
  //   this.SupportChannelsControl.setValue(SupportChannels); // To trigger change detection
  // }

  // onCatRemovedLanguage(cat: string) {
  //   const Languages = this.LanguagesControl.value as string[];
  //   this.removeFirst(Languages, cat);
  //   this.LanguagesControl.setValue(Languages); // To trigger change detection
  // }


}
