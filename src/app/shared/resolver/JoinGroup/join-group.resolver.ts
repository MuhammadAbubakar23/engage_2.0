import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { RulesGroupIdsService } from 'src/app/services/RulesGroupIds/rules-group-ids.service';
import { SkillIdsService } from 'src/app/services/sendSkillIds/skill-ids.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { SkillsService } from 'src/app/services/Skills/skills.service';
import { CommonDataService } from '../../services/common/common-data.service';

@Injectable({
  providedIn: 'root'
})
export class JoinGroupResolver implements Resolve<any> {
  uniqueWings:any[]=[];
  groupArray:any[]=[];
  rulesGroupIds:any[]=[];
  constructor(private commonService: CommonDataService, private sendSkills: SkillsService, private sendWings: GetWingsService,
    private signalRService: SignalRService,
    private sendRulesGroupIdsService: RulesGroupIdsService,
    private getSkillIdsService: SkillIdsService){}
  resolve(): Promise<any> {
    
    return new Promise((resolve, reject)=>{

      this.commonService.GetSkills(this.getSkillIdsService.skillIds).subscribe((skillNames:any)=>{
        this.sendSkills.sendSkills(skillNames);
        // res?.loginResponse?.loginResponse?.roles.forEach((role:any) => {
          // var companyId = role.id;
          var companyId = 658;
          skillNames.forEach((skill:any) => {
            var groupName = skill.skillName+'_'+companyId;
            // this.signalRService.joinGroup(groupName);
            if(!this.groupArray.includes(groupName)) {
              this.groupArray.push(groupName)
            }
            var wingName = skill.wing
            if(!this.uniqueWings.includes(wingName)) {
              this.uniqueWings.push(wingName)
            }
            debugger
            skill.rules.forEach((rule:any) => {
              if(!this.rulesGroupIds.includes(rule.groupId)) {
                this.rulesGroupIds.push(rule.groupId)
              }
            });
            
          });
          this.sendRulesGroupIdsService.sendRulesGroupIds(this.rulesGroupIds)
          this.sendWings.sendWings(this.uniqueWings.toString())
          localStorage.setItem('defaultSkills', this.uniqueWings.toString())
        // });
        debugger
        resolve(this.groupArray);
        this.signalRService.joinGroup(this.groupArray)
      },
      (error)=>{
        reject(error);
      })
    })
  }
  saveData(data: Observable<any>) {
    throw new Error('Method not implemented.');
  }
}
