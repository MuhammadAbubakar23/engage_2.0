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
import { menuReducer } from './engage2/state/menu.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MenusEffects } from './engage2/state/menu.effect';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeadersModule } from '../modules/console/console-headers/headers.module';
import { AvatarPhotoComponent } from './engage2/avatar-photo/avatar-photo.component';
import { BreadcrumbComponent } from './engage2/breadcrumb/breadcrumb.component';
import { ConsoleTableActionListComponent } from './engage2/console-table/console-table-action-list/console-table-action-list.component';
import { ConsoleTableActionComponent } from './engage2/console-table/console-table-action/console-table-action.component';
import { ConsoleTableToolbarComponent } from './engage2/console-table/console-table-toolbar/console-table-toolbar.component';
import { ConsoleTableWithImageComponent } from './engage2/console-table/console-table-with-image/console-table-with-image.component';
import { ConsoleTableWrapComponent } from './engage2/console-table/console-table-wrap/console-table-wrap.component';
import { ConsoleTableComponent } from './engage2/console-table/console-table.component';
import { SelectOptionComponent } from './engage2/select-option/select-option.component';
import { RightHeaderComponentsComponent } from './engage2/right-header-components/right-header-components.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
    RightHeaderComponentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('menus', menuReducer ),
    EffectsModule.forFeature([MenusEffects]),
    NgxSpinnerModule,
    HeadersModule
  ],
  exports:[
    ResponderContentComponent,
    InboxContentComponent,
    ConsoleContentComponent,
    InboxRightSidebarComponent,
    ResponderRightSidebarMenuComponent,
    ConsoleTableComponent,
    ConsoleTableToolbarComponent,
    AvatarPhotoComponent,
    ConsoleTableWithImageComponent
  ]
})
export class LayoutsModule { }
