// notification-sound.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationSoundService {
  private audio = new Audio();

  constructor() {
    this.audio.src = 'assets/notificationSound/iphone_notification.mp3'; // Path to your audio file
    this.audio.load();
  }

  playSound(): void {
    this.audio.play().catch(error => console.error('Error playing sound:', error));
  }
}
