import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
@Component({
  selector: 'app-roles-and-permissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LayoutsModule, CreateRolesComponent, FormsModule],
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss']
})
export class RolesAndPermissionsComponent implements OnInit {
  Roles: Array<any> = [];
  RolesCount: number = 0;
  searchText: string = '';
  selectedSortOption: string = 'All';
  hasCreatePermission: boolean=false;
  hasupdatePermission: boolean=false;
  hasDeletePermission: boolean=false;
  applySearchFilter() {
    const searchTextLower = this.searchText.toLowerCase();
    this.Roles = this._Activatedroute.snapshot.data["roles"].filter((role: { name: any }) => {
      const roleNameLower = (role.name || '').toLowerCase();
      return roleNameLower.includes(searchTextLower);
    });
    this.sortRoles(); // Reapply sorting after filtering the roles
  }
  messages: any[] = [];
  //Teams: Array<any> = [];
  hasPermission(permissionName: string) {
    const isAccessible = this._perS.hasPermission(permissionName)
    return isAccessible
  }
  constructor(private headerService: HeaderService, private _Activatedroute: ActivatedRoute, private router: Router, private commonService: CommonDataService,private _perS:PermissionService) { }
  ngOnInit(): void {
    this.hasCreatePermission = this.hasPermission('_nwro_');
  this.hasupdatePermission = this.hasPermission('_upro_');
  this.hasDeletePermission = this.hasPermission('_rmvro_');
    this.Roles = this._Activatedroute.snapshot.data["roles"];
    this.RolesCount = this.Roles.length;
    this.selectedSortOption = 'All'; // Set the default sort option
    this.applySearchFilter(); // Apply search filter and sort roles on component initialization
  }
  setStatus(status: string): void {
    this.selectedSortOption = status;
    this.sortRoles(); // Reapply sorting when changing the selected status
  }
  sortRoles() {
    switch (this.selectedSortOption) {
      case 'Ascending':
        this.Roles.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Descending':
        this.Roles.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // For 'All', no sorting is required
        break;
    }
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
