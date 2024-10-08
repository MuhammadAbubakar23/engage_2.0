import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'any',
})
export class EnvService {
  public store: any = environment.store;
  public IdentityBaseUrl: string = environment.IdentityBaseUrl;
  public ConsoleBaseUrl: string = environment.ConsoleBaseUrl;
  // public modules : any = environment.modules;
  public console: any = environment.links.console;
  public paths: any = environment.links.identity;
  public title: string = environment.title;
  public appKey: string = environment.appKey;
  // public token : string = environment.tokenName;
  constructor() {}
  public createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };
}
