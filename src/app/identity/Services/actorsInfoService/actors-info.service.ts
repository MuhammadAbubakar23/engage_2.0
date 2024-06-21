import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActorsInfoService {
  actors = [];
  constructor() {}
  public sendActors(actors: any) {
    this.actors = actors;
  }
  public getActors() {
    return this.actors;
  }
}
