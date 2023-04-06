import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { RolesAndPermissionsService } from '../roles-and-permissions/roles-and-permissions.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { LayoutsModule } from "../../../../layouts/layouts.module";
import { Users } from './users';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    imports: [CommonModule, RouterModule, CreateUserComponent, LayoutsModule]
})
export class UsersComponent implements OnInit {
  model:Users[] = [];
  header: string[] =  ["Users","Roles", "Teams", ""];
  url:string = "GetAllUsers";
  actions: any[] = [
      {name:"Edit", type:"rute", actionUrl:"console/users/create", icon:"fal fa-edit me-2"}
    , {name:"delete", type:"service" , actionUrl:"DeleteUser", icon:"fal fa-trash me-2"}
  ];
  filter: {} ={ pageno:1
              , pagesize:50
              , headers: [ {name:"users", order:"ASC"}
                         , {name:"roles", order:"ASC"}
                         , {name:"teams", order:"ASC"}]
              };


  filters: string ="";
  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
    //loadUsers();
  }
  // pageddata(event) {
  //   this._fetchData(event, this.pagesize)

  // }
  // filterdata() {
  //   this._fetchData(this.page, this.pagesize);
  // }
  // private _fetchData(page: number, pagesize: number) {
  //   this._userService.GetAll(page, pagesize, this.filter).subscribe((next: any) => {
    
  //     this.Data = next.data.item1;
  //     this.total = next.data.item2 * this.pagesize

  //   }, error => {
  //     console.log(error);
  //   });
  // }
  
  form = new UntypedFormGroup({  
    filters: new UntypedFormControl('', Validators.required)  
  });  

  changeFilters(e:any){
    this.filters = e.target.value;
  }

  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }
}
