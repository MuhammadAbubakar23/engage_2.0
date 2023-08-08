import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotBuilderComponent } from './chat-bot-builder.component';

describe('ChatBotBuilderComponent', () => {
  let component: ChatBotBuilderComponent;
  let fixture: ComponentFixture<ChatBotBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
