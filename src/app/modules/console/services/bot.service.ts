import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const baseUrl = 'https://enbot.360scrm.com/';
export class Message {
  constructor(public author: string, public content: string) { }
}
@Injectable({
  providedIn: 'root'
})
export class BotService {
  conversation = new Subject<Message[]>();
  private intentsSubject = new BehaviorSubject<any>([]);
  public intents$ = this.intentsSubject.asObservable();
  constructor(private http: HttpClient) { }
  updateintents(newintents: any) {
    this.intentsSubject.next(newintents)
  }
  login() {
    const body = { username: 'usman', password: 'usman' };
    return this.http.post(baseUrl + "api/jwt_token", body);
  }
  gethttpOptions() {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + sessionStorage.getItem('token')
    });
    let httpOptions = {
      headers: headers_object
    };
    return httpOptions
  }
  gethttpOptionsforFile() {
    let headers_object = new HttpHeaders({
      'Authorization': "Bearer " + sessionStorage.getItem('token')
    });
    let httpOptions = {
      headers: headers_object
    };
    return httpOptions;
  }
  //   login(username: string, password: string) {
  //     const body = { username, password };
  //     return this.http.post(baseUrl + "api/jwt_token", body);
  // }
  listofIntents() {
    let httpOptions = this.gethttpOptions()
    return this.http.get(baseUrl + "api/getintents_name", httpOptions);
  }
  intentDetails(intentName: any) {
    let httpOptions = this.gethttpOptions()
    return this.http.get(baseUrl + `api/getintent_data?intent=${intentName}`, httpOptions);
  }
  createIntentApi(data: any) {
    let httpOptions = this.gethttpOptions()
    //const url = 'https://enbot.360scrm.com/api/create_intent';
    return this.http.post(baseUrl + "api/create_intent", data, httpOptions);
  }
  updateIntentApi(data: any) {
    let httpOptions = this.gethttpOptions()
    return this.http.post(baseUrl + "api/updateintent_data", data, httpOptions);
  }
  deleteQA(data:any){
    let httpOptions = this.gethttpOptions()
    return this.http.post(baseUrl + "api/del_intent_data",data,httpOptions);
  }
  deleteIntent(data:any){
    let httpOptions = this.gethttpOptions()
    return this.http.post(baseUrl + "api/delete_intent",data,httpOptions);
  }
  chat(value: string): Observable<string> {
    const userMessage = new Message('user', value);
    this.conversation.next([userMessage]);
    let data = { 'message': value }
    let httpOptions = this.gethttpOptions()
    return this.http.post<string>(baseUrl + "api/chatbot", data, httpOptions);
  }
  trainApi(): Observable<string> {
    let httpOptions = this.gethttpOptions()
    return this.http.get<string>(baseUrl + "api/train", httpOptions);
  }
  getsettingApi(): Observable<string> {
    let httpOptions = this.gethttpOptions()
    return this.http.get<string>(baseUrl + "api/chatbot-config", httpOptions);
  }
  updatesettingApi(data: any): Observable<string> {
    let httpOptions = this.gethttpOptions()
    return this.http.put<string>(baseUrl + "api/chatbot-config", data, httpOptions);
  }
  fileUploadApi(data:any){
    let httpOptions = this.gethttpOptionsforFile();
    //https://enbot.360scrm.com/api/uploadfile
    return this.http.post(baseUrl + "api/uploadfile", data, httpOptions)
  }
}
