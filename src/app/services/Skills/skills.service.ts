import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  skills: any;

  constructor() {}

  public sendSkills(menu: any) {
    this.skills = menu;
  }

  public getSkills() {
    return this.skills;
  }
}
