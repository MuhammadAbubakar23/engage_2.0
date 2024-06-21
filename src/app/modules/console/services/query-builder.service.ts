import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {
  deleteRules = environment.links.console.deleteRules
  getAllRules = environment.links.console.getAllRules;
  getRuleById = environment.links.console.getRuleById
  addRules = environment.links.console.addRules
  updateRules = environment.links.console.updateRules
  getEntitiesRule = environment.links.console.getEntitiesRule
  getRuleEntityProperties = environment.links.console.getRuleEntityProperties
  consoleBaseUrl = environment.consoleBaseUrl;
  constructor(private http:HttpClient) { }
  GetAllRules() {
    return this.http.get(this.consoleBaseUrl + this.getAllRules)
  }
  GetRuleById() {
    return this.http.get(this.consoleBaseUrl + this.getRuleById)
  }
  AddRules(addrule: any) {
    return this.http.post(this.consoleBaseUrl + this.addRules, addrule)
  }
  UpdateRules(ruleId: string, rule: any) {
    const url = `${this.consoleBaseUrl}${this.updateRules}?Id=${ruleId}`;
    return this.http.post(url, rule);
  }
  DeleteRules(delRules: any) {
    const url = `${this.consoleBaseUrl}${this.deleteRules}?Id=${delRules}`;
    return this.http.get(url);
  }
  GetEntitiesRule() {
    return this.http.get(this.consoleBaseUrl + this.getEntitiesRule);
  }
  GetRuleEntityProperties() {
    return this.http.get(this.consoleBaseUrl + this.getRuleEntityProperties);
  }
}
