// chat-visibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ChatVisibilityService {
  private newChatIdSubject = new BehaviorSubject<string | null>(null);
  newChatId$: Observable<string | null> = this.newChatIdSubject.asObservable();
  notifyNewChatId(chat: any) {
    this.newChatIdSubject.next(chat);
  }
  private activeIdSubject = new BehaviorSubject<any>(null);
  activeId$: Observable<any> = this.activeIdSubject.asObservable();
  removeActiveId(activeObj:any) {
    this.activeIdSubject.next(activeObj);
  }
  private thirdActiveSubject = new BehaviorSubject<string | null>(null);
  thirdActive$: Observable<string | null> = this.thirdActiveSubject.asObservable();
  notifythirdActive(chat: any) {
    this.thirdActiveSubject.next(chat);
  }
}
