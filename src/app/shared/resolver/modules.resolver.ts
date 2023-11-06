import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loadMenusList, updateMenusList } from 'src/app/layouts/engage2/menu-state/menu.actions';
import { MenuState } from 'src/app/layouts/engage2/menu-state/menu.state';
import { loadPermissionsLetters, updatePermissionsLetters } from 'src/app/layouts/engage2/permission-state/permission.actions';
import { PermissionState } from 'src/app/layouts/engage2/permission-state/permission.state';
import { loadTagsList, updateTagsList } from 'src/app/layouts/engage2/tags-state/tags.actions';
import { TagsState } from 'src/app/layouts/engage2/tags-state/tags.state';

@Injectable({
  providedIn: 'root'
})
export class ModulesResolver implements Resolve<boolean> {
  constructor(private MenuStore: Store<MenuState>,
    private TagsStore: Store<TagsState>,
    private PermissionStore: Store<PermissionState>){

    }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.MenuStore.dispatch(loadMenusList());
    this.MenuStore.dispatch(updateMenusList());
    this.TagsStore.dispatch(loadTagsList());
    this.TagsStore.dispatch(updateTagsList());
    this.PermissionStore.dispatch(loadPermissionsLetters());
    this.PermissionStore.dispatch(updatePermissionsLetters());
    return of(true);
  }
}
