import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
const baseUrl = 'https://sentiment.360scrm.com/api/';
export class Message {
  constructor(public author: string, public content: string) { }
}
@Injectable({
  providedIn: 'root'
})
export class SentimentService {
  senconversation = new Subject<Message[]>();
  langconversation = new Subject<Message[]>();
  constructor(private http: HttpClient) { }
  login() {
    const body = { username: 'usman', password: 'usman' };
    return this.http.post(baseUrl + "jwt_token", body);
  }
  gethttpOptions() {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    let httpOptions = {
      headers: headers_object
    };
    return httpOptions
  }
  gethttpOptionsforFile() {
    let headers_object = new HttpHeaders({
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    let httpOptions = {
      headers: headers_object
    };
    return httpOptions;
  }
  getSentimentApi(value: string): Observable<string> {
    let httpOptions = this.gethttpOptions();
    const userMessage = new Message('user', value);
    this.senconversation.next([userMessage]);
    let data = { 'text': value, 'client': 'engage' }
    return this.http.post<string>(baseUrl + "getsentiment", data, httpOptions);
  }
  getLanguageApi(value: string): Observable<string> {
    let httpOptions = this.gethttpOptions();
    const userMessage = new Message('user', value);
    this.langconversation.next([userMessage]);
    let data = { 'text': value }
    return this.http.post<string>(baseUrl + "getlang", data, httpOptions);
  }
  postSentimentApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions();
    return this.http.post(baseUrl + "singlesentence", data, httpOptions)
  }
  fileUploadApi(data: any) {
    let httpOptions = this.gethttpOptionsforFile();
    return this.http.post(baseUrl + "uploadfile", data, httpOptions)
  }
  trainingApi(data: any) {
    let httpOptions = this.gethttpOptionsforFile();
    return this.http.post(baseUrl + "trainmodel", data, httpOptions)
  }
}
