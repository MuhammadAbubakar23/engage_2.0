import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMessageTemplatesComponent } from './components/templates/messages/create-message-templates/create-message-templates.component';
import { MessagesComponent } from './components/templates/messages/messages.component';
import { QuickResponseComponent } from './components/templates/quick-response/quick-response.component';
import { SignaturesComponent } from './components/templates/signatures/signatures.component';
import { TemplatesComponent } from './components/templates/templates.component';
//import { CreateUserResolver } from './components/users/create-user/create-user.resolver';
import { UsersResolver } from './components/users/users.resolver';
import { ConsoleRoutingGuard } from './console-routing.guard';
import { ConsoleComponent } from './console.component';
import { RolesPermissionsResolver } from './resolvers/roles/roles-permissions.resolver';
import { RolesResolver } from './resolvers/users/roles.resolver';
import { TeamResolver } from './resolvers/teams/team.resolver';
import { TeamsJsonResolver } from './resolvers/teams/teams-json.resolver';
import { TeamsPermissionsResolver } from './resolvers/teams/teams-permissions.resolver';
import { TeamsResolver } from './resolvers/users/teams.resolver';
import { UsersJsonResolver } from './resolvers/users/users-json.resolver';

const routes: Routes = [
  {
    path:'',
    component:ConsoleComponent,
    
    children: [{
        path:'users',
        loadComponent: () => import('./components/users/users.component').then(c => c.UsersComponent),
        data: { breadcrumb: 'Users' },
        canMatch: [ConsoleRoutingGuard],
        //canLoad: [ConsoleRoutingGuard],
        resolve: {
          userJ: UsersJsonResolver
        },
      },{
      //   path:'users/bulk-user-upload',
      //   loadComponent: () => import('./components/users/bulk-users-add/bulk-users-add.component').then(c => c.BulkUsersAddComponent),
      //   canMatch: [ConsoleRoutingGuard],
      //   // resolve: {
      //   //   submenus: UsersResolver,
      //   // },
      // },{
        path:'users/create/:id',
        loadComponent: () => import('./components/users/create-user/create-user.component').then(c => c.CreateUserComponent),
        data: { breadcrumb: 'Users > Create' },
        //canActivate: [ConsoleRoutingGuard],
        canMatch: [ConsoleRoutingGuard],
        // canLoad: [ConsoleRoutingGuard],
        resolve: {
          roles: RolesResolver,
          teams: TeamsResolver,
        },
        
      },{
        path:'teams',
        loadComponent: () => import('./components/teams/teams.component').then(c => c.TeamsComponent),
        data: { breadcrumb: 'Teams N` Accesses ' },
        canMatch: [ConsoleRoutingGuard],//teams: TeamsResolver,
        resolve: {
          teamJ: TeamsJsonResolver
        },
      },{
        path:'teams/create/:id',
        loadComponent: () => import('./components/teams/create-team/create-team.component').then(c => c.CreateTeamComponent),
        data: { breadcrumb: 'Teams N` Accesses > Create' },
        canMatch: [ConsoleRoutingGuard],
        resolve: {
          teamsnpermission: TeamsPermissionsResolver,
          teamin: TeamResolver,
        },
      },{
     
        path:'roles-permissions',
        loadComponent: () => import('./components/roles-and-permissions/roles-and-permissions.component').then(c => c.RolesAndPermissionsComponent),
        data: { breadcrumb: 'Roles N` Permissions' },
        canMatch: [ConsoleRoutingGuard],
        resolve: {
          roles: RolesResolver,
          // teams: TeamsResolver,
        },
      },{
        path:'roles-permissions/create/:id',
        loadComponent: () => import('./components/roles-and-permissions/create-roles/create-roles.component').then(c => c.CreateRolesComponent),
        data: { breadcrumb: 'Roles N` Permissions > Create' },
        canMatch: [ConsoleRoutingGuard],
        resolve: {
          rolesnpermission: RolesPermissionsResolver,
          // teams: TeamsResolver,
        },
     
      },{
        path:'channels',
        loadComponent: () => import('./components/support-channels/support-channels.component').then(c => c.SupportChannelsComponent),
        canMatch: [ConsoleRoutingGuard],
      },{
        path:'tags',
        loadComponent: () => import('./components/tags/tags.component').then(c => c.TagsComponent)
        
      },{
        path:'rules',
        loadComponent: () => import('./components/rules/rules.component').then(c => c.RulesComponent)
        
      },{
        path:'skills',
        loadComponent: () => import('./components/skills/skills.component').then(c => c.SkillsComponent),
        canMatch: [ConsoleRoutingGuard]
      },{
        path:'skills/create/:id',
        loadComponent: () => import('./components/skills/create-skills/create-skills.component').then(c => c.CreateSkillsComponent),
        canMatch: [ConsoleRoutingGuard],  
      },{
        path:'routes',
        loadComponent: () => import('./components/enteract-route/enteract-route.component').then(c => c.EnteractRouteComponent)
        
      },{
        path:'sla-policies',
        loadComponent: () => import('./components/sla-policies/sla-policies.component').then(c => c.SlaPoliciesComponent)
        
      },{
        path:'business-hours',
        loadComponent: () => import('./components/business-hours/business-hours.component').then(c => c.BusinessHoursComponent)
        
      },
      {
        path:'templates/message',
        component:MessagesComponent
      },
      {
        path:'templates/signature',
        component:SignaturesComponent
      },
      {
        path:'templates/quick-response',
        component:QuickResponseComponent
      },
      {
        path:'templates/message/create/:id',
        component:CreateMessageTemplatesComponent
        // loadComponent: () => import('./components/templates/messages/create-message-templates/create-message-templates.component').then(c => c.CreateMessageTemplatesComponent)
      },
      {
        path:'templates/signature/create/:id',
        loadComponent: () => import('./components/templates/signatures/create-signature-templates/create-signature-templates.component').then(c => c.CreateSignatureTemplatesComponent)
      },
      {
        path:'templates/quick-response/create/:id',
        loadComponent: () => import('./components/templates/quick-response/create-quick-response-template/create-quick-response-template.component').then(c => c.CreateQuickResponseTemplateComponent)
      }
    ]
// },
// {
//   path:':channel',
//   component:ConsoleComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
