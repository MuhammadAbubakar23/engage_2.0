
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: any = "";
  constructor() {
    this.permissions = JSON.parse(sessionStorage.getItem('Permissions')|| "");
  }
  hasPermission(name: string): boolean {
    return this.permissions.includes(name);
  }
}