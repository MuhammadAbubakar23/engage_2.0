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
  addIntend = environment.links.bot.addIntend
  getIntents = environment.links.bot.getIntents
  getReponse = environment.links.bot.getReponse
  addResponse = environment.links.bot.addResponse
  responseDelete = environment.links.bot.responseDelete
  intentDelete = environment.links.bot.intentDelete
  deleteChatBot = environment.links.bot.deleteChatBot

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
  IntentDelete(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.intentDelete, form);
  }
  DeleteChatBot(form: any) {

    return this.http.post(this.botMoniteringBaseUrl + this.deleteChatBot, form);
  }
  ResponseDelete(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.responseDelete, form);
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
  AddIntend(body: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.addIntend, body);
  }
  AddResponse(body: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.addResponse, body);
  }
  GetIntents(botId: number): Observable<any> {
    return this.http.get(`${this.botMoniteringBaseUrl}${this.getIntents}?bot_id=${botId}`);
  }
  GetReponse(botId: number): Observable<any> {
    return this.http.get(`${this.botMoniteringBaseUrl}${this.getReponse}?bot_id=${botId}`);
  }
}
