import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

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
import { AvatarPhotoComponent } from './engage2/avatar-photo/avatar-photo.component';
import { SelectOptionComponent } from './engage2/select-option/select-option.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './engage2/breadcrumb/breadcrumb.component';
import { CardBoxListComponent } from './engage2/card-box-list/card-box-list.component';
import { CardBoxListCheckboxComponent } from './engage2/card-box-list/card-box-list-checkbox/card-box-list-checkbox.component';
import { permissionReducer } from './engage2/permission-state/permission.reducer';
import { AdminContentComponent } from './engage2/admin-content/admin-content.component';
import { AdminMenuComponent } from './engage2/admin-content/admin-menu/admin-menu.component';

import { ConsoleTableComponent } from './engage2/console-table/console-table.component';
import { ConsoleTableToolbarComponent } from './engage2/console-table/console-table-toolbar/console-table-toolbar.component';
import { ConsoleTableWrapComponent } from './engage2/console-table/console-table-wrap/console-table-wrap.component';
import { ConsoleTableActionComponent } from './engage2/console-table/console-table-action/console-table-action.component';
import { ConsoleTableActionListComponent } from './engage2/console-table/console-table-action-list/console-table-action-list.component';
import { ConsoleTableWithImageComponent } from './engage2/console-table/console-table-with-image/console-table-with-image.component';
import { ConsoleTableColumnsComponent } from './engage2/console-table/console-table-columns/console-table-columns.component';
import { ConsoleTableCheckboxComponent } from './engage2/console-table/console-table-checkbox/console-table-checkbox.component';
import { ConsoleTableVisibilityPipe } from './engage2/console-table/console-table-visibility.pipe';
import { ConsoleTableHeaderPipe } from './engage2/console-table/console-table-header.pipe';
import { ConsoleTableHeaderComponent } from './engage2/console-table/console-table-header/console-table-header.component';
import { ConsoleTableFooterComponent } from './engage2/console-table/console-table-footer/console-table-footer.component';
import { ConsoleTableBodyComponent } from './engage2/console-table/console-table-body/console-table-body.component';
import { ConsoleTableHeaderCheckboxComponent } from './engage2/console-table/console-table-header-checkbox/console-table-header-checkbox.component';
import { ConsoleTablePaginationComponent } from './engage2/console-table/console-table-pagination/console-table-pagination.component';
import { OverlayRightPanelComponent } from './engage2/overlay-right-panel/overlay-right-panel.component';
import { OverlayRightPanelSelectionComponent } from './engage2/overlay-right-panel/overlay-right-panel-selection/overlay-right-panel-selection.component';
import { OverlayRightPanelListComponent } from './engage2/overlay-right-panel/overlay-right-panel-list/overlay-right-panel-list.component';
import { RightHeaderComponentsComponent } from './engage2/right-header-components/right-header-components.component';
import { AnalyticsRightSidebarMenuComponent } from './engage2/analytics-content/analytics-right-sidebar-menu/analytics-right-sidebar-menu.component';
import { AnalyticsContentComponent } from './engage2/analytics-content/analytics-content.component';
import { AnalyticsHeaderComponent } from './engage2/analytics-content/analytics-header/analytics-header.component';
import { AnalyticsMenuComponent } from './engage2/analytics-content/analytics-menu/analytics-menu.component';
import { AvatarContentComponent } from './engage2/avatar-content/avatar-content.component';
import { MainContentComponent } from './engage2/main-content/main-content.component';
import { SubRoleMenuComponent } from './engage2/main-menu/sub-role-menu/sub-role-menu.component';
import { BotRightSidebarComponent } from './engage2/bot-content/bot-right-sidebar/bot-right-sidebar.component';
import { BotContentComponent } from './engage2/bot-content/bot-content.component';
import { BotMenuComponent } from './engage2/bot-content/bot-menu/bot-menu.component';
import { BotHeaderComponent } from './engage2/bot-content/bot-header/bot-header.component';
import { ToasterComponent } from './engage2/toaster/toaster.component';
import { tagsReducer } from './engage2/tags-state/tags.reducer';
import { TagsEffects } from './engage2/tags-state/tags.effect';
import { WebphoneDialerModule } from '../modules/webphone-dialer/webphone-dialer.module';
import { BotMonitoringContentComponent } from './engage2/bot-monitoring-content/bot-monitoring-content.component';
import { MonitoringHeaderComponent } from './engage2/bot-monitoring-content/monitoring-header/monitoring-header.component';
import { MonitoringMenuComponent } from './engage2/bot-monitoring-content/monitoring-menu/monitoring-menu.component';

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
    ConsoleTableColumnsComponent,
    ConsoleTableCheckboxComponent,
    ConsoleTableVisibilityPipe,
    ConsoleTableHeaderPipe,
    ConsoleTableHeaderComponent,
    ConsoleTableFooterComponent,
    ConsoleTableBodyComponent,
    ConsoleTableHeaderCheckboxComponent,
    ConsoleTablePaginationComponent,
    OverlayRightPanelComponent,
    OverlayRightPanelSelectionComponent,
    OverlayRightPanelListComponent,
    RightHeaderComponentsComponent,
    AnalyticsRightSidebarMenuComponent,
    AnalyticsContentComponent,
    AnalyticsHeaderComponent,
    AnalyticsMenuComponent,
    AvatarContentComponent,
    MainContentComponent,
    SubRoleMenuComponent,
    BotRightSidebarComponent,
    BotContentComponent,
    BotMenuComponent,
    BotHeaderComponent,
    ToasterComponent,
    BotMonitoringContentComponent,
    MonitoringHeaderComponent,
    MonitoringMenuComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    //StoreModule.forFeature('menuPermission', { menus: menuReducer, permissions: permissionReducer  })
    StoreModule.forFeature('menus', menuReducer),
    StoreModule.forFeature('tagss', tagsReducer),
    StoreModule.forFeature('permissions', permissionReducer),
    EffectsModule.forFeature([MenusEffects, PermissionsEffects, TagsEffects]),
    WebphoneDialerModule
  ],
  exports: [
    MainContentComponent,
    ResponderContentComponent,
    InboxContentComponent,
    ConsoleContentComponent,
    AdminContentComponent,
    InboxRightSidebarComponent,
    ResponderRightSidebarMenuComponent,
    ConsoleTableComponent,
    ConsoleTableToolbarComponent,
    AvatarPhotoComponent,
    BreadcrumbComponent,
    CardBoxListComponent,
    OverlayRightPanelComponent,
    AnalyticsRightSidebarMenuComponent,
    AnalyticsContentComponent,
    BotRightSidebarComponent,
    BotContentComponent,
    ToasterComponent,
    AvatarContentComponent,
    MonitoringHeaderComponent,
    BotMonitoringContentComponent
  ]
})
export class LayoutsModule { }
