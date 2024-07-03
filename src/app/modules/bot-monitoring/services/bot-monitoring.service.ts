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
  createRule = environment.links.bot.createRule
  createStory = environment.links.bot.createStory
  viewIntent = environment.links.bot.viewIntent
  viewResponse = environment.links.bot.viewResponse
  getRuleChatBot = environment.links.bot.getRuleChatBot
  getStoriesChatBot = environment.links.bot.getStoriesChatBot
  ruleDelete = environment.links.bot.ruleDelete
  storyDelete = environment.links.bot.storyDelete
  trainBot = environment.links.bot.trainBot
  runChatBot = environment.links.bot.runChatBot
  createBotTrain = environment.links.bot.createBotTrain
  chatBotWdidget = environment.links.bot.chatBotWdidget
  stopChatBot = environment.links.bot.stopChatBot

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
  CreateRule(body: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.createRule, body);
  }
  CreateStory(body: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.createStory, body);
  }
  GetIntents(botId: number): Observable<any> {
    return this.http.get(`${this.botMoniteringBaseUrl}${this.getIntents}?bot_id=${botId}`);
  }
  GetReponse(botId: number): Observable<any> {
    return this.http.get(`${this.botMoniteringBaseUrl}${this.getReponse}?bot_id=${botId}`);
  }
  ViewIntent(botId: number): Observable<any> {
    return this.http.get(`${this.botMoniteringBaseUrl}${this.viewIntent}?bot_id=${botId}`);
  }
  ViewResponse(botId: number): Observable<any> {
    return this.http.get(`${this.botMoniteringBaseUrl}${this.viewResponse}?bot_id=${botId}`);
  }
  GetRuleChatBot(botId: number): Observable<any> {
    return this.http.get(`${this.botMoniteringBaseUrl}${this.getRuleChatBot}?bot_id=${botId}`);
  }
  GetStoriesChatBot(botId: any): Observable<any> {
    return this.http.get(`${this.botMoniteringBaseUrl}${this.getStoriesChatBot}?bot_id=${botId}`);
  }
  RuleDelete(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.ruleDelete, form);

  }
  StoryDelete(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.storyDelete, form);
  }
  BotTrain(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.trainBot, form);
  }
  RunChatBot(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.runChatBot, form);
  }
  StopChatBot(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.stopChatBot, form);
  }
  CreateBotTrain(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.createBotTrain, form);
  }
  ChatBotWdidget(form: any) {
    return this.http.post(this.botMoniteringBaseUrl + this.chatBotWdidget, form);
  }
}
