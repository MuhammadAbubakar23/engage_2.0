import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { ReportDbSettingsComponent } from './components/report-db-settings/report-db-settings.component';
import { ReportBuilderComponent } from './components/report-builder/report-builder.component';


const routes: Routes = [
  // {
  //   path: ':channel',
  //   component: AnalyticsComponent,
  // },
  // {
  //   path: 'db-settings/create',
  //   component:ReportDbSettingsComponent
  // },

  {
    path: '',
    component: AnalyticsComponent,
    children: [{
      path:'report-builder',
      loadComponent: () => import('./components/report-builder/report-builder.component').then(c => c.ReportBuilderComponent),

    },
    {
      path:'reports',
      loadComponent: () => import('./components/reportlisting/reportlisting.component').then(c => c.ReportlistingComponent),

    },
    {
      path:'db-settings',
      loadComponent: () => import('./components/dblisting/dblisting.component').then(c => c.DblistingComponent),

    },
    {
      path:'db-settings/create',
      loadComponent: () => import('./components/report-db-settings/report-db-settings.component').then(c => c.ReportDbSettingsComponent),

    }
  ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule { }
