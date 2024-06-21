import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AgentDetailsService {
  agentDetails:any
  constructor() {}
  public sendAgentDetails(status: any): void {
    this.agentDetails = status
  }
  public receiveAgentDetails(): Observable<any> {
    return this.agentDetails
  }
}
