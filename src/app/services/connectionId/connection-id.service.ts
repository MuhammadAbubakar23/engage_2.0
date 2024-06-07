import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConnectionIdService {
  connectionId: string="";
  constructor() {}
  public sendConnectionId(connectionId: string) {
    this.connectionId = connectionId;
  }
  public getConnectionId() {
    return this.connectionId;
  }
}
