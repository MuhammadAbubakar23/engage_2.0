import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxContentComponent } from './engage2/inbox-content/inbox-content.component';
import { ResponderContentComponent } from './engage2/responder-content/responder-content.component';
import { ConsoleContentComponent } from './engage2/console-content/console-content.component';
import { InboxHeaderComponent } from './engage2/inbox-content/inbox-header/inbox-header.component';
import { ResponderHeaderComponent } from './engage2/responder-content/responder-header/responder-header.component';
import { InboxMenuComponent } from './engage2/inbox-content/inbox-menu/inbox-menu.component';
import { ResponderMenuComponent } from './engage2/responder-content/responder-menu/responder-menu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ConsoleHeaderComponent } from './engage2/console-content/console-header/console-header.component';
import { ConsoleMenuComponent } from './engage2/console-content/console-menu/console-menu.component';
import { MainMenuComponent } from './engage2/main-menu/main-menu.component';
import { InboxRightSidebarComponent } from './engage2/inbox-content/inbox-right-sidebar-menu/inbox-right-sidebar.component';
import { ResponderRightSidebarMenuComponent } from './engage2/responder-content/responder-right-sidebar-menu/responder-right-sidebar-menu.component';
import { TeamMenuComponent } from './engage2/main-menu/team-menu/team-menu.component';
import { RoleMenuComponent } from './engage2/main-menu/role-menu/role-menu.component';
import { StoreModule } from '@ngrx/store';
import { menuReducer } from './engage2/menu-state/menu.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MenusEffects } from './engage2/menu-state/menu.effect';
import { PermissionsEffects } from './engage2/permission-state/permission.effect';
import { ConsoleTableComponent } from './engage2/console-table/console-table.component';
import { ConsoleTableToolbarComponent } from './engage2/console-table/console-table-toolbar/console-table-toolbar.component';
import { ConsoleTableWrapComponent } from './engage2/console-table/console-table-wrap/console-table-wrap.component';
import { ConsoleTableActionComponent } from './engage2/console-table/console-table-action/console-table-action.component';
import { ConsoleTableActionListComponent } from './engage2/console-table/console-table-action-list/console-table-action-list.component';
import { ConsoleTableWithImageComponent } from './engage2/console-table/console-table-with-image/console-table-with-image.component';
import { AvatarPhotoComponent } from './engage2/avatar-photo/avatar-photo.component';
import { SelectOptionComponent } from './engage2/select-option/select-option.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './engage2/breadcrumb/breadcrumb.component';
import { CardBoxListComponent } from './engage2/card-box-list/card-box-list.component';
import { CardBoxListCheckboxComponent } from './engage2/card-box-list/card-box-list-checkbox/card-box-list-checkbox.component';
import { permissionReducer } from './engage2/permission-state/permission.reducer';
import { AdminContentComponent } from './engage2/admin-content/admin-content.component';
import { AdminMenuComponent } from './engage2/admin-content/admin-menu/admin-menu.component';
import { RightHeaderComponentsComponent } from './engage2/right-header-components/right-header-components.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AnalyticsContentComponent } from './engage2/analytics-content/analytics-content.component';
import { AnalyticsHeaderComponent } from './engage2/analytics-content/analytics-header/analytics-header.component';
import { AnalyticsMenuComponent } from './engage2/analytics-content/analytics-menu/analytics-menu.component';
import { AnalyticsRightSidebarMenuComponent } from './engage2/analytics-content/analytics-right-sidebar-menu/analytics-right-sidebar-menu.component';
// import { NgSelectModule } from '@ng-select/ng-select/lib/ng-select.module';



@NgModule({
  declarations: [
    InboxContentComponent,
    ResponderContentComponent,
    ConsoleContentComponent,
    InboxHeaderComponent,
    ResponderHeaderComponent,
    InboxMenuComponent,
    ResponderMenuComponent,
    ConsoleHeaderComponent,
    ConsoleMenuComponent,
    MainMenuComponent,
    InboxRightSidebarComponent,
    ResponderRightSidebarMenuComponent,
    TeamMenuComponent,
    RoleMenuComponent,
    ConsoleTableComponent,
    ConsoleTableToolbarComponent,
    ConsoleTableWrapComponent,
    ConsoleTableActionComponent,
    ConsoleTableActionListComponent,
    ConsoleTableWithImageComponent,
    AvatarPhotoComponent,
    SelectOptionComponent,
    BreadcrumbComponent,
    CardBoxListComponent,
    CardBoxListCheckboxComponent,
    AdminContentComponent,
    AdminMenuComponent,
    RightHeaderComponentsComponent,
    AnalyticsContentComponent,
    AnalyticsHeaderComponent,
    AnalyticsMenuComponent,
    AnalyticsRightSidebarMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    //StoreModule.forFeature('menuPermission', { menus: menuReducer, permissions: permissionReducer  })
    StoreModule.forFeature('menus', menuReducer),
    StoreModule.forFeature('permissions', permissionReducer),
    EffectsModule.forFeature([MenusEffects, PermissionsEffects]),
    NgSelectModule
  ],
  exports:[
    ResponderContentComponent,
    InboxContentComponent,
    ConsoleContentComponent,
    AdminContentComponent,
    InboxRightSidebarComponent,
    ResponderRightSidebarMenuComponent,
    ConsoleTableComponent,
    ConsoleTableToolbarComponent,
    AvatarPhotoComponent,
    ConsoleTableWithImageComponent,
    BreadcrumbComponent,
    CardBoxListComponent,
    AnalyticsContentComponent,
    AnalyticsRightSidebarMenuComponent
  ]
})
export class LayoutsModule { }
