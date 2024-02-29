// chat-visibility.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatVisibilityService {
  private newChatIdSubject = new BehaviorSubject<string | null>(null);
  newChatId$: Observable<string | null> = this.newChatIdSubject.asObservable();
  notifyNewChatId(chatId: any) {
    this.newChatIdSubject.next(chatId);
  }
  private activeIdSubject = new BehaviorSubject<string | null>(null);
  activeId$: Observable<string | null> = this.activeIdSubject.asObservable();
  removeActiveId(activeId: any) {
    this.activeIdSubject.next(activeId);
  }

}
