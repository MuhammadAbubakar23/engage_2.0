import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { RolesAndPermissionsService } from '../roles-and-permissions/roles-and-permissions.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { LayoutsModule } from "../../../../layouts/layouts.module";
import { Users } from './users';
import { ConsoleTableParams } from 'src/app/layouts/engage2/console-table/console-table-params';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    imports: [CommonModule, RouterModule, CreateUserComponent, LayoutsModule]
})
export class UsersComponent implements OnInit {
  model:Users[] = [];
  filter?: Observable<ConsoleTableParams>;
  showConsoleTable:boolean= false;
  // header: string[] =  ["Users","Roles", "Teams", ""];
  // url:string = "GetAllUsers";
  // actions: any[] = [
  //     {name:"Edit", type:"rute", actionUrl:"console/users/create", icon:"fal fa-edit me-2"}
  //   , {name:"delete", type:"service" , actionUrl:"DeleteUser", icon:"fal fa-trash me-2"}
  // ];
  // filter: {} ={ search:""
  //             , url : "GetAllUsers" 
  //             , pageno:1
  //             , pagesize:50
  //             //, 
  //             , template: {toolbar: "top", refresh:true }
  //             , headers: [ { visible:true, index:'', name:"", type:"empty" }
  //                       // , { visible:true, index:["id"], name:"id", type:"check", order:"ASC", search:true, group:-1, actions:false }
  //                        , { visible:true, index:["fullName", "email", "image"], name:"users", type:"with-image", order:"ASC", search:true, group:-1, actions:false }
  //                        , { visible:true, index:["roleId"], name:"roles", type:"wrap", order:null, search:false, group:2, actions:false }
  //                        , { visible:true, index:["teamId"], name:"teams", type:"wrap", order:null, search:false, group:2, actions:false }
  //                        , { visible:true, index:this.actions, name:"...", type:"action-list", order:null, search:false, group:0, actions:true }
  //                       ]
  //             };


  filters!:ConsoleTableParams ;
  constructor(private headerService: HeaderService
    , private _Activatedroute:ActivatedRoute) { }

  
  async ngOnInit() {
    let _self = this;
   // this.filter = async () => await this._Activatedroute.snapshot.data["userJ"]
    console.log(this.filter);
    this.filter = await this._Activatedroute.snapshot.data["userJ"];
    console.log(this.filter);
    if(typeof this.filter !== 'undefined'){
      this.showConsoleTable = true;
    }
    // console.log(this.filter);
    // this.filter.then((a) =>_self.filters = a);

    // console.log(Promise.resolve(this.filter));
    // console.log(this.filters);
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
