import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotHistoryComponent } from './chat-bot-history.component';

describe('ChatBotHistoryComponent', () => {
  let component: ChatBotHistoryComponent;
  let fixture: ComponentFixture<ChatBotHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
