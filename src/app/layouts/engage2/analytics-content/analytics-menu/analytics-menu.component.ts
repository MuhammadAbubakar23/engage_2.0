import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'analytics-menu',
  templateUrl: './analytics-menu.component.html',
  styleUrls: ['./analytics-menu.component.scss'],
})
export class AnalyticsMenuComponent implements OnInit {
  activeMenu = '';
  activeChannel: any = '';
  analyticeReport: any[] = [];
  channelname: any;
  // analyticeReport=[
  //     // {name:'Report Designer',link:'/analytics/executive-dashboard'},
  //     {name:'Report Listing',link:'/analytics/reports'},
  //     {name:'Dashboard Designer',link:'/analytics/dashbaord-designer'},
  //     {name:'DB Settings',link:' /analytics/db-settings'},
  //     {name:'Dashboard',link:'/analytics/dashboard'},
  //     {name:'Live Monitoring',link:'/analytics/live-monitoring '},
  //     {name:'WhatsApp Raw Data',link:'/analytics/whatsapp-report '},
  //     {name:'BOT Interactions',link:'/analytics/handled-bot'},
  //     {name:'Live Agent Interactions',link:'/analytics/route-to-agent'},
  //     {name:'Unique Interactions',link:'/analytics/unique-customers'},
  //     {name:'Social Raw Data',link:'/analytics/social-raw-data'},
  //     {name:'Inbound/Outbound Report',link:'/analytics/inbound-outbound-report'},
  //     {name:'Agent Performance Report',link:'/analytics/performance-report'},
  //     {name:'Shift Report',link:'/analytics/shift-report'},
  //     {name:'Query Tag Report',link:'/analytics/querytag-report'},
  //     {name:'Tag Report',link:'/analytics/tag-report'},
  //     {name:'Executive Dashboard',link:'/analytics/executive-dashboard'},
  //     {name:'Facebook Report',link:'/analytics/facebook-report'},
  //     {name:'Twitter Report',link:'/analytics/twitter-report'},
  //     {name:'LinkedIn Report',link:'/analytics/linkedin-report'},
  //     {name:'Instagram Report',link:'/analytics/instagram-report'}
  //       ]
  constructor(private _hS: HeaderService) { }

  ngOnInit(): void {
    this._hS.getHeader().subscribe((res: any) => {
      this.activeMenu = res?.title;
    });
    this.activeChannel = window.location.origin;

    if (this.activeChannel == 'http://localhost:4200') {
       this.channelname = 'local';
    } else if (this.activeChannel == 'https://engage.jazz.com.pk') {
      this.channelname = 'Jazz';
    } else if (this.activeChannel == 'https://keportal.enteract.live') {
      this.channelname = 'KE';
    } else if (this.activeChannel == 'https://tppl.enteract.live') {
      this.channelname = 'ttpl';
    } else if (this.activeChannel == 'https://waengage.enteract.live') {
      this.channelname = 'Morinaga';
    } else if (this.activeChannel == 'https://uiengage.enteract.app') {
      this.channelname = 'stagging';
    } else if (this.activeChannel == 'https://bzengage.enteract.live') {
      this.channelname = 'Bazaar';
    }
    else if(this.activeChannel='https://uiengagerox.enteract.app/'){
      this.channelname='stagging'
    }

    this.getmenu();
  }
  getmenu() {
    if (this.channelname == 'local') {
      this.analyticeReport = [
        { name: 'Report Listing', link: '/analytics/reports' },
        { name: 'Dashboard Designer', link: '/analytics/dashbaord-designer' },
        { name: 'DB Settings', link: ' /analytics/db-settings' },
        { name: 'Dashboard', link: '/analytics/dashboard' },
        { name: 'Live Monitoring', link: '/analytics/live-monitoring' },
        { name: 'WhatsApp Raw Data', link: '/analytics/whatsapp-report' },
        { name: 'BOT Interactions', link: '/analytics/handled-bot' },
        { name: 'Live Agent Interactions', link: '/analytics/route-to-agent' },
        { name: 'Unique Interactions', link: '/analytics/unique-customers' },
        { name: 'Social Raw Data', link: '/analytics/social-raw-data' },
        {
          name: 'Inbound/Outbound Report',
          link: '/analytics/inbound-outbound-report',
        },
        {
          name: 'Agent Performance Report',
          link: '/analytics/performance-report',
        },
        { name: 'Shift Report', link: '/analytics/shift-report' },
        { name: 'Query Tag Report', link: '/analytics/querytag-report' },
        { name: 'Tag Report', link: '/analytics/tag-report' },

        { name: 'Facebook Report', link: '/analytics/facebook-report' },
        { name: 'Twitter Report', link: '/analytics/twitter-report' },
        { name: 'LinkedIn Report', link: '/analytics/linkedin-report' },
        { name: 'Instagram Report', link: '/analytics/instagram-report' },
        { name: 'interaction Report', link: '/analytics/interaction-report' }
      ];
    } else if (this.channelname == 'stagging') {
      this.analyticeReport = [
        { name: 'WhatsApp Raw Data', link: '/analytics/whatsapp-report' },
        { name: 'BOT Interactions', link: '/analytics/handled-bot' },
        { name: 'Live Agent Interactions', link: '/analytics/route-to-agent' },
        { name: 'Unique Interactions', link: '/analytics/unique-customers' },
        { name: 'Social Raw Data', link: '/analytics/social-raw-data' },
        {
          name: 'Inbound/Outbound Report',
          link: '/analytics/inbound-outbound-report',
        },
        {
          name: 'Agent Performance Report',
          link: '/analytics/performance-report',
        },
        { name: 'Shift Report', link: '/analytics/shift-report' },
        { name: 'Query Tag Report', link: '/analytics/querytag-report' },
        { name: 'Tag Report', link: '/analytics/tag-report' },

        { name: 'Facebook Report', link: '/analytics/facebook-report' },
        { name: 'Twitter Report', link: '/analytics/twitter-report' },
        { name: 'LinkedIn Report', link: '/analytics/linkedin-report' },
        { name: 'Instagram Report', link: '/analytics/instagram-report' },
        { name: 'interaction Report', link: '/analytics/interaction-report' }
      ];
    } else if (this.channelname == 'Jazz') {
      this.analyticeReport = [
        { name: 'WhatsApp Raw Data', link: '/analytics/whatsapp-report' },
        { name: 'BOT Interactions', link: '/analytics/handled-bot' },
        { name: 'Live Agent Interactions', link: '/analytics/route-to-agent' },
        { name: 'Unique Interactions', link: '/analytics/unique-customers' },
        { name: 'Social Raw Data', link: '/analytics/social-raw-data' },
        {
          name: 'Inbound/Outbound Report',
          link: '/analytics/inbound-outbound-report',
        },
        {
          name: 'Agent Performance Report',
          link: '/analytics/performance-report',
        },
        { name: 'Shift Report', link: '/analytics/shift-report' },
     
      ];
    } else if (this.channelname == 'KE') {
      this.analyticeReport = [
        {
          name: 'Inbound/Outbound Report',
          link: '/analytics/inbound-outbound-report',
        },
        {
          name: 'Agent Performance Report',
          link: '/analytics/performance-report',
        },
        { name: 'Shift Report', link: '/analytics/shift-report' },
        { name: 'Tag Report', link: '/analytics/tag-report' },

        { name: 'Facebook Report', link: '/analytics/facebook-report' },
        { name: 'Twitter Report', link: '/analytics/twitter-report' },
        { name: 'LinkedIn Report', link: '/analytics/linkedin-report' },
        { name: 'Instagram Report', link: '/analytics/instagram-report' },
      ];
    } else if (this.channelname == 'ttpl') {
      this.analyticeReport = [
        { name: 'WhatsApp Raw Data', link: '/analytics/whatsapp-report' },
        { name: 'BOT Interactions', link: '/analytics/handled-bot' },
        { name: 'Live Agent Interactions', link: '/analytics/route-to-agent' },
        { name: 'Unique Interactions', link: '/analytics/unique-customers' },
        { name: 'Social Raw Data', link: '/analytics/social-raw-data' },
        {
          name: 'Inbound/Outbound Report',
          link: '/analytics/inbound-outbound-report',
        },
        {
          name: 'Agent Performance Report',
          link: '/analytics/performance-report',
        },
        { name: 'Shift Report', link: '/analytics/shift-report' },
      ];
    } else if (this.channelname == 'Morinaga') {
      this.analyticeReport = [
        { name: 'WhatsApp Raw Data', link: '/analytics/whatsapp-report' },
        { name: 'BOT Interactions', link: '/analytics/handled-bot' },
        { name: 'Live Agent Interactions', link: '/analytics/route-to-agent' },
        { name: 'Unique Interactions', link: '/analytics/unique-customers' },
        { name: 'Social Raw Data', link: '/analytics/social-raw-data' },
        {
          name: 'Inbound/Outbound Report',
          link: '/analytics/inbound-outbound-report',
        },
        {
          name: 'Agent Performance Report',
          link: '/analytics/performance-report',
        },
        { name: 'Shift Report', link: '/analytics/shift-report' },
        { name: 'Tag Report', link: '/analytics/tag-report' },
      ];
    }
    else if (this.channelname == 'Bazaar') {
      this.analyticeReport = [
        { name: 'WhatsApp Raw Data', link: '/analytics/whatsapp-report' },
        { name: 'BOT Interactions', link: '/analytics/handled-bot' },
        { name: 'Live Agent Interactions', link: '/analytics/route-to-agent' },
        { name: 'Unique Interactions', link: '/analytics/unique-customers' },
        { name: 'Social Raw Data', link: '/analytics/social-raw-data' },
        {
          name: 'Inbound/Outbound Report',
          link: '/analytics/inbound-outbound-report',
        },
        {
          name: 'Agent Performance Report',
          link: '/analytics/performance-report',
        },
        { name: 'Shift Report', link: '/analytics/shift-report' },
        { name: 'interaction Report', link: '/analytics/interaction-report' }
      ];
    }
  }
}
