
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: any = "";
  constructor() {
    
  }
  hasPermission(name: string): boolean {
    this.permissions = JSON.parse(sessionStorage.getItem('Permissions')|| "");
    return this.permissions.includes(name);
  }
}