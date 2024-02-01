import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBusinessHoursComponent } from './components/business-hours/create-business-hours/create-business-hours.component';
import { ChatBotBuilderComponent } from './components/chat-bot-builder/chat-bot-builder.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { UpdateIntentsComponent } from './components/chat-bot/update-intents/update-intents.component';
import { SentimentAnalysisComponent } from './components/sentiment-analysis/sentiment-analysis.component';
import { AddPolicyComponent } from './components/sla-policies/add-policy/add-policy.component';
import { CreateMessageTemplatesComponent } from './components/templates/messages/create-message-templates/create-message-templates.component';
import { MessagesComponent } from './components/templates/messages/messages.component';
import { CreateQuickResponseTemplatesComponent } from './components/templates/quick-response/create-quick-response-templates/create-quick-response-templates.component';
import { QuickResponseComponent } from './components/templates/quick-response/quick-response.component';
import { CreateSignatureTemplatesComponent } from './components/templates/signatures/create-signature-templates/create-signature-templates.component';
import { SignaturesComponent } from './components/templates/signatures/signatures.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { ConsoleRoutingGuard } from './console-routing.guard';
import { ConsoleComponent } from './console.component';
import { ConsoleResolver } from './resolvers/properties/console.resolver';
import { RolesPermissionsResolver } from './resolvers/roles/roles-permissions.resolver';
import { TeamResolver } from './resolvers/teams/team.resolver';
import { TeamsJsonResolver } from './resolvers/teams/teams-json.resolver';
import { TeamsPermissionsResolver } from './resolvers/teams/teams-permissions.resolver';
import { RolesResolver } from './resolvers/users/roles.resolver';
import { TeamsResolver } from './resolvers/users/teams.resolver';
import { UsersJsonResolver } from './resolvers/users/users-json.resolver';
import { BulkUploadComponent } from './components/sentiment-analysis/bulk-upload/bulk-upload.component';
import { CreateSentimentComponent } from './components/sentiment-analysis/create-sentiment/create-sentiment.component';

const routes: Routes = [
  {
    path:'',
    component:ConsoleComponent,

    children: [
      {
        path:'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
        data: { breadcrumb: 'Home' },
        canMatch: [ConsoleRoutingGuard],
      },
      {
        path:'users',
        loadComponent: () => import('./components/users/users.component').then(c => c.UsersComponent),
        data: { breadcrumb: 'Users' },
        canMatch: [ConsoleRoutingGuard],
        //canLoad: [ConsoleRoutingGuard],
        resolve: {
          userJ: UsersJsonResolver
        },
      },{
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
      //   path:'users/bulk-user-upload',
      //   loadComponent: () => import('./components/users/bulk-users-add/bulk-users-add.component').then(c => c.BulkUsersAddComponent),
      //   canMatch: [ConsoleRoutingGuard],
      //   // resolve: {
      //   //   submenus: UsersResolver,
      //   // },
      // },{
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
        path:'channels',
        loadComponent: () => import('./components/support-channels/support-channels.component').then(c => c.SupportChannelsComponent),
        canMatch: [ConsoleRoutingGuard],
        resolve: {
          channelsnpermission: ConsoleResolver,
        },
      },{
        path:'tags',
        loadComponent: () => import('./components/tags/tags.component').then(c => c.TagsComponent)

      },{
        path:'rules',
        loadComponent: () => import('./components/rules/rules.component').then(c => c.RulesComponent)

      },
      {
        path:'add-rules',
        loadComponent: () => import('./components/rules/add-rules/add-rules.component').then(c => c.AddRulesComponent)

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

      },
      {
        path:'sla-policies',
        loadComponent: () => import('./components/sla-policies/sla-policies.component').then(c => c.SlaPoliciesComponent)

      },
      {
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
        path:'templates/messages/create',
        // loadComponent: () => import('../console/components/templates/messages/create-message-templates/create-message-templates.component').then(c => c.CreateMessageTemplatesComponent)
        component:CreateMessageTemplatesComponent

      } ,
      {
        path:'templates/createSignatures',
        component: CreateSignatureTemplatesComponent

        // loadComponent: () => import('./components/templates/signatures/create-signature-templates/create-signature-templates.component').then(c => c.CreateSignatureTemplatesComponent)
      },
      {
        path:'createresponse',
        component: CreateQuickResponseTemplatesComponent

        // loadComponent: () => import('./components/templates/signatures/create-signature-templates/create-signature-templates.component').then(c => c.CreateSignatureTemplatesComponent)
      },
      {
        path:'sla-policies',
        loadComponent: () => import('./components/sla-policies/sla-policies.component').then(c => c.SlaPoliciesComponent)

      },
      
      {
        path:'sla-policy/create/:id',
        component: AddPolicyComponent
      },
      {
        path:'sla-policy/create',
        component: AddPolicyComponent
      }
      ,{
        path:'business-hours',
        loadComponent: () => import('./components/business-hours/business-hours.component').then(c => c.BusinessHoursComponent)
      },
      { path: 'console/templates/messages/edit/:id', component: CreateMessageTemplatesComponent },
     {
       path:'business-hours/create',
      component : CreateBusinessHoursComponent
     },
     {
      path:'business-hours/create/:id',
     component : CreateBusinessHoursComponent
    },
     {
      path:'automation/sentiment-analysis/bulk-upload',
      component: BulkUploadComponent
     },
     {
      path:'automation/sentiment-analysis',
      component: CreateSentimentComponent
     },
     {
      path:'automation/chat-bot-intent',
      component: ChatBotComponent
     },
     {
      path:'automation/chat-bot-intent/bot-builder',
      component: ChatBotBuilderComponent,
     },
     {
      path:'automation/chat-bot-intent/update',
      component:UpdateIntentsComponent
     },
     {
      path: 'tags',
      loadComponent: () => import('./components/tags/tags.component').then(c => c.TagsComponent),
      canMatch: [ConsoleRoutingGuard]
    }, {
      path: 'tag/create/:id',
      loadComponent: () => import('./components/tags/create-tags/create-tags.component').then(c => c.CreateTagsComponent),
      canMatch: [ConsoleRoutingGuard]
    },
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
