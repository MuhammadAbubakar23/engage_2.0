import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RulesGroupIdsService {
  rulesGroupIds:any[] = [];
  constructor() { }
  public sendRulesGroupIds(groupId: any[]){
    this.rulesGroupIds = groupId;
  }
  public getRulesGroupIds(){
    return this.rulesGroupIds;
  }
}
