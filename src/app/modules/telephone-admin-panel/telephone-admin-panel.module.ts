import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelephoneAdminPanelRoutingModule } from './telephone-admin-panel-routing.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { TelephoneAdminPanelComponent } from './telephone-admin-panel/telephone-admin-panel.component';
import { RouterModule } from '@angular/router';
// import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
   TelephoneAdminPanelComponent,
  //  AdminPanelComponent
  ],
  imports: [
    CommonModule,
    TelephoneAdminPanelRoutingModule,
    LayoutsModule,
    RouterModule
  ]
})
export class TelephoneAdminPanelModule { }
