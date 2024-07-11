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
      environment.KeReportsBaseUrl = config.ke.KeReportsBaseUrl;
      environment.LinkedInBaseUrl = config.ke.LinkedInBaseUrl;
      environment.BotBaseUrl = config.ke.BotBaseUrl;
    } else if (baseUrl == 'https://engage.jazz.com.pk') {
      environment.IdentityBaseUrl = config.jazz.IdentityBaseUrl;
      environment.CommonBaseUrl = config.jazz.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.jazz.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.jazz.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.jazz.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.jazz.ConsoleBaseUrl;
      environment.KeReportsBaseUrl = config.jazz.KeReportsBaseUrl;
      environment.LinkedInBaseUrl = config.jazz.LinkedInBaseUrl;
      environment.BotBaseUrl = config.jazz.BotBaseUrl;
    } else if (baseUrl == 'https://uiengage.enteract.app') {
      environment.IdentityBaseUrl = config.jazz.IdentityBaseUrl;
      environment.CommonBaseUrl = config.jazz.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.jazz.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.jazz.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.jazz.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.jazz.ConsoleBaseUrl;
      environment.KeReportsBaseUrl = config.jazz.KeReportsBaseUrl;
      environment.LinkedInBaseUrl = config.jazz.LinkedInBaseUrl;
      environment.BotBaseUrl = config.jazz.BotBaseUrl;
    } else if (baseUrl == 'https://tpplui.enteract.live') {
      environment.IdentityBaseUrl = config.tppl.IdentityBaseUrl;
      environment.CommonBaseUrl = config.tppl.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.tppl.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.tppl.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.tppl.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.tppl.ConsoleBaseUrl;
      environment.KeReportsBaseUrl = config.tppl.KeReportsBaseUrl;
      environment.LinkedInBaseUrl = config.tppl.LinkedInBaseUrl;
      environment.BotBaseUrl = config.tppl.BotBaseUrl;
    } else if (baseUrl == 'https://waengage.enteract.live') {
      environment.IdentityBaseUrl = config.morinaga.IdentityBaseUrl;
      environment.CommonBaseUrl = config.morinaga.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.morinaga.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.morinaga.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.morinaga.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.morinaga.ConsoleBaseUrl;
      environment.KeReportsBaseUrl = config.morinaga.KeReportsBaseUrl;
      environment.LinkedInBaseUrl = config.morinaga.LinkedInBaseUrl;
      environment.BotBaseUrl = config.morinaga.BotBaseUrl;
    } else if (baseUrl == 'https://bzengage.enteract.live') {
      environment.IdentityBaseUrl = config.bazaar.IdentityBaseUrl;
      environment.CommonBaseUrl = config.bazaar.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.bazaar.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.bazaar.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.bazaar.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.bazaar.ConsoleBaseUrl;
      environment.KeReportsBaseUrl = config.bazaar.KeReportsBaseUrl;
      environment.LinkedInBaseUrl = config.bazaar.LinkedInBaseUrl;
      environment.BotBaseUrl = config.bazaar.BotBaseUrl;
    } else if (baseUrl == 'https://uiengagerox.enteract.app') {
      environment.IdentityBaseUrl = config.uirox.IdentityBaseUrl;
      environment.CommonBaseUrl = config.uirox.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.uirox.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.uirox.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.uirox.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.uirox.ConsoleBaseUrl;
      environment.KeReportsBaseUrl = config.uirox.KeReportsBaseUrl;
      environment.LinkedInBaseUrl = config.uirox.LinkedInBaseUrl;
      environment.BotBaseUrl = config.uirox.BotBaseUrl;
    } else if (baseUrl == 'http://localhost:4200' || baseUrl == 'https://localhost:4200') {
      environment.IdentityBaseUrl = config.localhost.IdentityBaseUrl;
      environment.CommonBaseUrl = config.localhost.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.localhost.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.localhost.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.localhost.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.localhost.ConsoleBaseUrl;
      environment.KeReportsBaseUrl = config.localhost.KeReportsBaseUrl;
      environment.LinkedInBaseUrl = config.localhost.LinkedInBaseUrl;
      environment.BotBaseUrl = config.localhost.BotBaseUrl;
    } else if (baseUrl == 'https://engageui.enteract.live') {
      environment.IdentityBaseUrl = config.demo.IdentityBaseUrl;
      environment.CommonBaseUrl = config.demo.CommonBaseUrl;
      environment.SignalRCommonBaseUrl = config.demo.SignalRCommonBaseUrl;
      environment.ProfileBaseUrl = config.demo.ProfileBaseUrl;
      environment.ServiceBaseUrl = config.demo.ServiceBaseUrl;
      environment.ConsoleBaseUrl = config.demo.ConsoleBaseUrl;
      environment.KeReportsBaseUrl = config.demo.KeReportsBaseUrl;
      environment.LinkedInBaseUrl = config.demo.LinkedInBaseUrl;
      environment.BotBaseUrl = config.demo.BotBaseUrl;
    }

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
