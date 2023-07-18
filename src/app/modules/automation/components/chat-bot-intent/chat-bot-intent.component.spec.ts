import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotIntentComponent } from './chat-bot-intent.component';

describe('ChatBotIntentComponent', () => {
  let component: ChatBotIntentComponent;
  let fixture: ComponentFixture<ChatBotIntentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotIntentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
