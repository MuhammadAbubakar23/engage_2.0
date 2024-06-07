import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  standalone: true,
  imports: [SharedModule, CommonModule, ReactiveFormsModule, MatChipsModule, MatIconModule, MatSelectModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [NavigationBackDirective]
})
export class CreateUserComponent implements OnInit {
  //identity:string | null | undefined = "0";
  toastermessage:boolean=false
  AlterMsg:any
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
    skillId: new UntypedFormControl(),
    //   teams : new UntypedFormControl(),
    // timezone : new UntypedFormControl(),
    // supportchannel : new UntypedFormControl(),
    // language : new UntypedFormControl(),

  });
  submitted = false;
  RolesControl = new UntypedFormControl(null);
  TeamsControl = new UntypedFormControl(null);
  SkillsControl = new UntypedFormControl(null);
  // RolesControlId = new UntypedFormControl(null, Validators.required);
  // SkillsControl = new UntypedFormControl(null, Validators.required);
  Roles: Array<any> = [];
  Teams: Array<any> = [];
  Skills: Array<any> = [];
  TeamIds: string[] = []
  RoleIds: string[] = [];
  SkillIds: string[] = [];
  // Skills: string[] = ['English', 'Urdu'];
  constructor(private formbuilder: UntypedFormBuilder
    , private _request: RequestService
    , private _Activatedroute: ActivatedRoute
    , private location: Location
    , private storsrv: StorageService
    , private uservc: UsersService
    , private roles: RolesAndPermissionsService
    , private router: Router
    , private teams: TeamsService) { }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  ngOnInit(): void {
    this.Roles = this._Activatedroute.snapshot.data["roles"];
    this.Teams = this._Activatedroute.snapshot.data["teams"].Teams;
    this.Skills = this._Activatedroute.snapshot.data["skills"];
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
        skillId: [],
        //  teams:"",
        //  userId:[],//null0000void//null0000void

      }
      this.setform(form);
    }


    // let vr = this.storsrv.retrive("main","o").local;
    // this.Roles = vr.roles;
  }
  async setform(formVal: any): Promise<void> {

    this.userForm = this.formbuilder.group({
      id: [formVal.id],
      firstname: [formVal.firstName, Validators.required],
      lastname: [formVal.lastName, Validators.required],
      phone: [formVal.phone, Validators.required],
      email: [formVal.email, Validators.required],
      password: [formVal.password, [Validators.required,Validators.minLength(8)]],
      confirmpassword: [formVal.confirmPassword, [Validators.required,Validators.minLength(8)]],
      roleId: ['', Validators.required],
      teamId: [],
      skillId: [0, Validators.required],
      // timezone: ['', [Validators.required]],
      // supportchannel: ['', [Validators.required]],
    }
      ,
      {
        validators: [Validation.match('password', 'confirmPassword')]
      });
    // await this.getRoles();
    // await this.getTeams();
    let roleForm: any = [];
    let teamForm: any = [];
    let skillForm: any = [];
    if (formVal.roleId.length >= 1 && this.Roles.length != 0) {
      formVal.roleId.forEach((element: any) => {
        let mitem = this.Roles.filter((item: any) => item?.name == element);
        roleForm.push(mitem[0]);
      });
      this.RolesControl.setValue(roleForm);
    }
    if (formVal.teamId.length >= 1 && this.Teams.length != 0) {
      formVal.teamId.forEach((element: any) => {
        let mitem = this.Teams.filter((item: any) => item?.id == element);
        teamForm.push(mitem[0]);
      });
      this.TeamsControl.setValue(teamForm);
    }

    if (formVal.skillId.length >= 1 && this.Skills.length != 0) {
      formVal.skillId.forEach((element: any) => {
        let mitem = this.Skills.filter((item: any) => item?.skillID == element);
        skillForm.push(mitem[0]);
      });
      this.SkillsControl.setValue(skillForm);
    }

  }
  // async getRoles():Promise<void>{
  //   await this.roles.getMyRoles().subscribe({
  //     next: (res:any) => {
  //       this.Roles = res;
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
    this.userForm.reset({
      teamId:[]
    })
    this.userForm.controls['skillId'].reset();
  }
  onSubmit(): void {
    
    let _self = this;
    this.userForm.controls['roleId'].reset();
    this.userForm.controls['teamId'].reset();
    this.userForm.controls['skillId'].reset();
    //this.userForm.controls['roleId'].setValue('');
    //this.userForm.controls['teamId'].setValue('');
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
    this.RoleIds=[]
    for (let i in this.RolesControl.value) {
      if(!this.RoleIds.includes(this.RolesControl.value[i]?.id.toString())){
        this.RoleIds.push(this.RolesControl?.value[i]?.id.toString());
      }
   
    }
  this.TeamIds=[]
    for (let i in this.TeamsControl.value) {
      if(!this.TeamIds.includes(this.TeamsControl?.value[i]?.id.toString())){
        this.TeamIds.push(this.TeamsControl?.value[i]?.id?.toString());
      }
     
    }
    this.SkillIds=[]
    for (let i in this.SkillsControl.value) {
      if(!this.SkillIds.includes(this.SkillsControl.value[i]?.skillID)){
        this.SkillIds.push(this.SkillsControl.value[i]?.skillID);
      }
    
    }
    
    this.userForm.controls['roleId'].setValue(this.RoleIds);
    this.userForm.controls['teamId'].setValue(this.TeamIds);
    this.userForm.controls['skillId'].setValue(this.SkillIds);

    // return ;
    //breturn;
    let controllerRoute = "AddUser";
    if (this.userForm.value.id > 0) {
      controllerRoute = "UpdateUser";
    }
    if (controllerRoute != "UpdateUser" && this.userForm.invalid) {
      return;
    }
    if (controllerRoute == "AddUser" && this.userForm?.controls["password"].value !== this.userForm?.controls["confirmpassword"].value) {
      return;
    }

    this.uservc.save(controllerRoute, this.userForm.value).subscribe({
      next: (res: any) => {
        
        _self.onReset();
        this.router.navigate(['/console/users']);


      },
      error: (err: HttpErrorResponse) => {
        // this.errorMessage = err.message;
        // this.showError = true;
      }
    });
  }

  isShow = false;
  isActive = false;

  ManageSkills() {
    this.isShow = !this.isShow;
  }

  ManageSkillsSwitch() {
    this.isActive = !this.isActive;
  }

  cancelForm() {
    this.router.navigate(['/console/users']);


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
  onCatRemovedSkill(cat: string) {
    const Skills = this.SkillsControl.value as string[];
    this.removeFirst(Skills, cat);
    this.SkillsControl.setValue(Skills); // To trigger change detection
  }
  private removeFirst(array: any[], toRemove: any): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  reloadComponent(){

  }
  closeToaster(){
    this.toastermessage=false
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
