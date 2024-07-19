import { Component, OnInit } from '@angular/core';
import { DataExchangeServicesService } from 'src/app/services/dataExchangeServices/data-exchange-services.service';
@Component({
  selector: 'app-admin-panel-menu',
  templateUrl: './admin-panel-menu.component.html',
  styleUrls: ['./admin-panel-menu.component.scss']
})
export class AdminPanelMenuComponent implements OnInit {
menu={
  "menu":[
     {
        "id":432,
        "title":"Dashboard",
        "display_name":"Dashboard",
        "icon":"tachometer",
        "description":"Dashboard",
        "route_name":"#",
        "permission":"dashboard",
        "super_admin":0,
        "active":1,
        "parent_id":0,
        "order":1,
        "created_at":"2018-01-19T12:22:36.000000Z",
        "updated_at":"2018-01-22T02:12:36.000000Z",
        "children":[
           {
              "id":472,
              "title":"Dashboard 2",
              "display_name":"Consolidated View",
              "icon":"tachometer",
              "description":null,
              "route_name":"dashboard.realtime",
              "permission":"dashboard",
              "super_admin":0,
              "active":1,
              "parent_id":432,
              "order":2,
              "created_at":"2018-01-22T05:02:37.000000Z",
              "updated_at":"2020-07-10T07:06:45.000000Z",
              "children":[
                 
              ],
              "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/dashboard/realtime"
           },
           {
              "id":771,
              "title":"CSAT Dashboard",
              "display_name":"CSAT Dashboard",
              "icon":"tachometer",
              "description":"CSAT Dashboard",
              "route_name":"csat_dashboard",
              "permission":"csat_dashboard",
              "super_admin":0,
              "active":1,
              "parent_id":432,
              "order":3,
              "created_at":"2020-07-24T08:17:56.000000Z",
              "updated_at":"2020-07-24T08:18:02.000000Z",
              "children":[
                 
              ],
              "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/csat_dashboard"
           }
        ],
        "url":"#"
     },
     {
        "id":92,
        "title":"Skills",
        "display_name":"Skills",
        "icon":"cubes",
        "description":"Skills main menu",
        "route_name":"#",
        "permission":"skills",
        "super_admin":0,
        "active":1,
        "parent_id":0,
        "order":17,
        "created_at":"2018-01-17T08:18:13.000000Z",
        "updated_at":"2024-07-10T13:42:37.000000Z",
        "children":[
           {
              "id":102,
              "title":"Add Skill",
              "display_name":"Add Skill",
              "icon":"plus",
              "description":"Add new skills",
              "route_name":"skills.create",
              "permission":"add_new_skill",
              "super_admin":0,
              "active":1,
              "parent_id":92,
              "order":19,
              "created_at":"2018-01-17T08:21:31.000000Z",
              "updated_at":"2024-07-10T13:42:37.000000Z",
              "children":[
                 
              ],
              "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/skills/create"
           },
           {
              "id":142,
              "title":"Skill Listing",
              "display_name":"Skill Listing",
              "icon":"list",
              "description":"Skill Listing",
              "route_name":"skills.index",
              "permission":"skills",
              "super_admin":0,
              "active":1,
              "parent_id":92,
              "order":20,
              "created_at":"2018-01-17T08:32:25.000000Z",
              "updated_at":"2024-07-10T13:42:37.000000Z",
              "children":[
                 
              ],
              "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/skills"
           }
        ],
        "url":"#"
     },
     {
        "id":292,
        "title":"Agents",
        "display_name":"Agents",
        "icon":"user",
        "description":null,
        "route_name":"agents.index",
        "permission":"agentss",
        "super_admin":0,
        "active":1,
        "parent_id":0,
        "order":21,
        "created_at":null,
        "updated_at":"2024-07-10T13:42:37.000000Z",
        "children":[
           {
              "id":302,
              "title":"Add Agent",
              "display_name":"Add Agent",
              "icon":null,
              "description":null,
              "route_name":"agents.create",
              "permission":null,
              "super_admin":0,
              "active":1,
              "parent_id":292,
              "order":22,
              "created_at":null,
              "updated_at":"2024-07-10T13:42:37.000000Z",
              "children":[
                 
              ],
              "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/agents/create"
           },
           {
              "id":372,
              "title":"List Agents",
              "display_name":"List Agents",
              "icon":null,
              "description":null,
              "route_name":"agents.index",
              "permission":null,
              "super_admin":0,
              "active":1,
              "parent_id":292,
              "order":23,
              "created_at":null,
              "updated_at":"2024-07-10T13:42:37.000000Z",
              "children":[
                 
              ],
              "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/agents"
           }
        ],
        "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/agents"
     },
     {
        "id":582,
        "title":"Reports",
        "display_name":"Reports",
        "icon":null,
        "description":null,
        "route_name":"callcenter_reports.index",
        "permission":"manage_reports",
        "super_admin":0,
        "active":1,
        "parent_id":0,
        "order":80,
        "created_at":"2018-02-26T06:31:37.000000Z",
        "updated_at":"2024-07-10T13:42:37.000000Z",
        "children":[
           
        ],
        "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/callcenter_reports"
     },
     {
        "id":462,
        "title":"Call Center Recordings",
        "display_name":"Call Center Recordings",
        "icon":"simplybuilt",
        "description":"",
        "route_name":"callcenter_recordings",
        "permission":"call_center_recording",
        "super_admin":0,
        "active":1,
        "parent_id":0,
        "order":81,
        "created_at":"2018-01-22T03:18:43.000000Z",
        "updated_at":"2024-07-10T13:42:37.000000Z",
        "children":[
           
        ],
        "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/callcenter_recordings"
     },
     {
        "id":885,
        "title":"Lead Uploader",
        "display_name":"Lead Uploader",
        "icon":"upload",
        "description":"Leads Uploader",
        "route_name":"leads_uploader.index",
        "permission":"leads_uploader",
        "super_admin":0,
        "active":1,
        "parent_id":0,
        "order":83,
        "created_at":"2023-10-27T12:51:25.000000Z",
        "updated_at":"2024-07-18T07:32:42.000000Z",
        "children":[
           
        ],
        "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/leads_uploader"
     },
     {
        "id":888,
        "title":"Lead Batches",
        "display_name":"Lead Batches",
        "icon":"archive",
        "description":"Lead Archive Batches",
        "route_name":"leads-archieve-batches.index",
        "permission":"leads_uploader",
        "super_admin":0,
        "active":1,
        "parent_id":0,
        "order":84,
        "created_at":"2024-07-10T13:42:10.000000Z",
        "updated_at":"2024-07-18T07:32:42.000000Z",
        "children":[
           
        ],
        "url":"https://lhr-ivr1.enteract.live/console_sandbox/public/leads-archieve-batches"
     }
  ]
}
adminPenalMenus:any
  constructor(
    private  endPointS:DataExchangeServicesService
  ) { }

  ngOnInit(): void {
    this.getAdminpenalMenus()
  }
  getAdminpenalMenus(){
    debugger
this.adminPenalMenus=this.menu.menu
  }
  sendEndPoint(url:any){
this.endPointS.sendAdminPenalEndPoint(url)
  }
}
