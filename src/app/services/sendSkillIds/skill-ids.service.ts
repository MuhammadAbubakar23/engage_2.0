import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SkillIdsService {
  skillIds: number=0;
  constructor() {}
  public sendSkillIds(skillIds: number) {
    this.skillIds = skillIds;
  }
  public getSkillIds() {
    return this.skillIds;
  }
}
