import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SkillslugService {
  skillSlug: any;
  constructor() {}
  public sendSkillSlug(skillSlug: any) {
    this.skillSlug = skillSlug;
  }
  public getSkillSlug() {
    return this.skillSlug;
  }
}
