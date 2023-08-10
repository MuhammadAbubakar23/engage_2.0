import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepComponentAlwaysAliveService {

  private componentState = false;

  constructor() { }

  isLoaded(): boolean {
    return this.componentState
  }

  setLoaded(isLoaded:boolean): void {
    this.componentState = isLoaded;
  }
}
