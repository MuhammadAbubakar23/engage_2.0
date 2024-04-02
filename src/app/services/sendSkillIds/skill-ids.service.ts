import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillIdsService {

  skillIds: any;

  constructor() {}

  public sendSkillIds(skillIds: any) {
    this.skillIds = skillIds;
  }

  public getSkillIds() {
    return this.skillIds;
  }
}
