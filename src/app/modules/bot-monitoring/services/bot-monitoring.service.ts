import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.botBaseUrl;
@Injectable({
  providedIn: 'root'
})
export class BotMonitoringService {

  botMoniteringBaseUrl = environment.botMoniteringBaseUrl
  getAllChatBot = environment.links.bot.getAllChatBot
  addBot = environment.links.bot.addBot
  getbyid = environment.links.bot.getbyid
  generateAugment = environment.links.bot.generateAugment

  constructor(private http: HttpClient) { }

  getChats(data: any): Observable<any> {
    return this.http.post(baseUrl + "WhatsAppBot/GetWhatsAppBotlisting", data)
  }
  getChatDetails(data: any): Observable<any> {
    return this.http.post(baseUrl + `WhatsAppBot/GetBotConversationDetails`, data)
  }
  GetAllChatBot() {
    return this.http.get(this.botMoniteringBaseUrl + this.getAllChatBot);
  }

  Addbot(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.addBot, form);
  }
  GetBotDetailsById(botId: number): Observable<any> {
    return this.http.get(`${this.botMoniteringBaseUrl}${this.getbyid}?bot_id=${botId}`);
  }
  GenerateAugment(body: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.generateAugment, body);
  }
}
