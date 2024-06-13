import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetWingsService {

  wings:string = "";

  constructor() { }

  public sendWings(wing: string){

    this.wings = wing;
  }

  public getWings(){
    return this.wings;
  }
}
