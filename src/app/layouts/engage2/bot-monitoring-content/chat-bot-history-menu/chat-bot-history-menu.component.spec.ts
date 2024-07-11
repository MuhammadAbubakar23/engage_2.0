import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotHistoryMenuComponent } from './chat-bot-history-menu.component';

describe('ChatBotHistoryMenuComponent', () => {
  let component: ChatBotHistoryMenuComponent;
  let fixture: ComponentFixture<ChatBotHistoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatBotHistoryMenuComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatBotHistoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
