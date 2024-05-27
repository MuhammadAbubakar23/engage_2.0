import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotHeaderComponent } from './chat-bot-header.component';

describe('ChatBotHeaderComponent', () => {
  let component: ChatBotHeaderComponent;
  let fixture: ComponentFixture<ChatBotHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
