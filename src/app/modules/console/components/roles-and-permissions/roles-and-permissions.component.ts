import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-roles-and-permissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LayoutsModule, CreateRolesComponent],
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss']
})
export class RolesAndPermissionsComponent implements OnInit {
  Roles: Array<any> = [];
  RolesCount: number = 0;

  messages: any[] = [];
  //Teams: Array<any> = [];
  constructor(private headerService: HeaderService, private _Activatedroute: ActivatedRoute, private router: Router, private commonService: CommonDataService) { }
  ngOnInit(): void {
    this.Roles = this._Activatedroute.snapshot.data["roles"];
    this.RolesCount = this.Roles.length;
    console.log(this.Roles);
    // this.Teams =  this._Activatedroute.snapshot.data["teams"];
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  deleteTemplate(message: any) {

    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      var obj = {
        "id": message.mainId,
        "name": "string",
        "norm": "string",
        "slug": "string",
        "link": "string",
        "desc": "string",
        "type": "string"
      }
      this.commonService.DeleteRoles(obj).subscribe(
        () => {
          // Success callback
          console.log('message deleted:', message);
          // Remove the deleted message from the messages array
          this.messages = this.messages.filter((msg: { id: any; }) => msg.id !== message.id);
        },
        (error: any) => {
          // Error callback
          console.error('Error deleting template:', error);
        }
      );
    }
  }
}

