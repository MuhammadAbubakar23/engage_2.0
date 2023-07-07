import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CreateRolesComponent } from './create-roles/create-roles.component';

@Component({
  selector: 'app-roles-and-permissions',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LayoutsModule, CreateRolesComponent],
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss']
})
export class RolesAndPermissionsComponent implements OnInit {
  Roles: Array<any> = [];
  RolesCount: number = 0;  
  //Teams: Array<any> = [];
  
  constructor(private headerService: HeaderService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.Roles = this._Activatedroute.snapshot.data["roles"];
    this.RolesCount =  this.Roles.length;
    // console.log(this.Roles);
    // this.Teams =  this._Activatedroute.snapshot.data["teams"];
  }
   

  updatevalue(string:any){
    this.headerService.updateMessage(string);
  }


}
