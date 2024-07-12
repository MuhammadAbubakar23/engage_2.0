import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


fetch('/assets/JSON/envURLs.json')
  .then(response => response.json())
  .then(config => {
    let baseUrl = window.location.origin;
    sessionStorage.setItem('baseUrl', baseUrl);
    if (baseUrl == 'https://keportal.enteract.live') {
      environment.IdentityBaseUrl = config.ke.IdentityBaseUrl;
      environment.CommonBaseUrl = config.ke.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.ke.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.ke.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.ke.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.ke.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.ke.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.ke.LinkedInBaseUrl;
      environment.BotBaseUrl = config.ke.BotBaseUrl;
    } else if (baseUrl == 'https://engage.jazz.com.pk') {
      environment.IdentityBaseUrl = config.jazz.IdentityBaseUrl;
      environment.CommonBaseUrl = config.jazz.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.jazz.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.jazz.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.jazz.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.jazz.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.jazz.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.jazz.LinkedInBaseUrl;
      environment.BotBaseUrl = config.jazz.BotBaseUrl;
    } else if (baseUrl == 'https://uiengage.enteract.app') {
      environment.IdentityBaseUrl = config.stagging.IdentityBaseUrl;
      environment.CommonBaseUrl = config.stagging.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.stagging.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.stagging.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.stagging.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.stagging.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.stagging.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.stagging.LinkedInBaseUrl;
      environment.BotBaseUrl = config.stagging.BotBaseUrl;
    } else if (baseUrl == 'https://tpplui.enteract.live') {
      environment.IdentityBaseUrl = config.tppl.IdentityBaseUrl;
      environment.CommonBaseUrl = config.tppl.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.tppl.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.tppl.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.tppl.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.tppl.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.tppl.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.tppl.LinkedInBaseUrl;
      environment.BotBaseUrl = config.tppl.BotBaseUrl;
    } else if (baseUrl == 'https://waengage.enteract.live') {
      environment.IdentityBaseUrl = config.morinaga.IdentityBaseUrl;
      environment.CommonBaseUrl = config.morinaga.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.morinaga.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.morinaga.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.morinaga.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.morinaga.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.morinaga.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.morinaga.LinkedInBaseUrl;
      environment.BotBaseUrl = config.morinaga.BotBaseUrl;
    } else if (baseUrl == 'https://bzengage.enteract.live') {
      environment.IdentityBaseUrl = config.bazaar.IdentityBaseUrl;
      environment.CommonBaseUrl = config.bazaar.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.bazaar.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.bazaar.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.bazaar.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.bazaar.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.bazaar.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.bazaar.LinkedInBaseUrl;
      environment.BotBaseUrl = config.bazaar.BotBaseUrl;
    } else if (baseUrl == 'https://uiengagerox.enteract.app') {
      environment.IdentityBaseUrl = config.testUrlsRox.IdentityBaseUrl;
      environment.CommonBaseUrl = config.testUrlsRox.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.testUrlsRox.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.testUrlsRox.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.testUrlsRox.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.testUrlsRox.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.testUrlsRox.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.testUrlsRox.LinkedInBaseUrl;
      environment.BotBaseUrl = config.testUrlsRox.BotBaseUrl;
    } else if (baseUrl == 'https://engageui.enteract.live') {
      environment.IdentityBaseUrl = config.demo.IdentityBaseUrl;
      environment.CommonBaseUrl = config.demo.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.demo.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.demo.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.demo.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.demo.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.demo.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.demo.LinkedInBaseUrl;
      environment.BotBaseUrl = config.demo.BotBaseUrl;
    } else if (baseUrl == 'https://engagerox.jazz.com.pk:8083') {
      environment.IdentityBaseUrl = config.rox.IdentityBaseUrl;
      environment.CommonBaseUrl = config.rox.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.rox.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.rox.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.rox.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.rox.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.rox.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.rox.LinkedInBaseUrl;
      environment.BotBaseUrl = config.rox.BotBaseUrl;
    } else if (baseUrl == 'http://localhost:4200' || baseUrl == 'https://localhost:4200') {
      environment.IdentityBaseUrl = config.demo.IdentityBaseUrl;
      environment.CommonBaseUrl = config.demo.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.demo.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.demo.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.demo.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.demo.ConsoleBaseUrl;
      environment.ReportsBaseUrl = config.demo.ReportsBaseUrl;
      environment.LinkedInBaseUrl = config.demo.LinkedInBaseUrl;
      environment.BotBaseUrl = config.demo.BotBaseUrl;
    }

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
