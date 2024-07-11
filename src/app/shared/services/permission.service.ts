import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: any = "";
  constructor() {
    this.permissions = JSON.parse(sessionStorage.getItem('Permissions')|| "");
    console.log('Permissions',this.permissions);
  }
  hasPermission(name: string): boolean {
    debugger
    return this.permissions.includes(name);
  }
}