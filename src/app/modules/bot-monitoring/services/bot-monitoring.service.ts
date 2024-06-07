import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.botBaseUrl;
@Injectable({
  providedIn: 'root'
})
export class BotMonitoringService {
  constructor(private http: HttpClient) { }
  getChats(data: any): Observable<any> {
    return this.http.post(baseUrl + "WhatsAppBot/GetWhatsAppBotlisting", data)
  }
  getChatDetails(data: any): Observable<any> {
    return this.http.post(baseUrl + `WhatsAppBot/GetBotConversationDetails`, data)
  }
}
