import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// const baseUrl = environment.baseUrl;
const baseUrl = ""
@Injectable({
  providedIn: 'root'
})
export class BotMonitoringService {

  constructor(private http:HttpClient) { }

  getChats(): Observable<any> {
    debugger
    return this.http.get(baseUrl + "Leave/GetAllLeaves")
  }
  getChatId(id: any): Observable<any> {
    return this.http.get(baseUrl + `Leave/GetLeavebyId/${id}`)
  }

}
