import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotStepperHeaderComponent } from './chat-bot-stepper-header.component';

describe('ChatBotStepperHeaderComponent', () => {
  let component: ChatBotStepperHeaderComponent;
  let fixture: ComponentFixture<ChatBotStepperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotStepperHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotStepperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
