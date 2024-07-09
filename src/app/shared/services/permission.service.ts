import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: any = [];
  constructor() {

  }
  hasPermission(name: string): boolean {
    const storedPermissions = sessionStorage.getItem('Permissions');
    this.permissions = storedPermissions ? JSON.parse(storedPermissions) : [];
    if (Array.isArray(this.permissions)) {
      return this.permissions.includes(name);
    }
    return false;
  }

  // checkPermission(permissionName: string) {

  //   const isAccessible = this._per.hasPermission(permissionName)
  //   return isAccessible
  // }
}
