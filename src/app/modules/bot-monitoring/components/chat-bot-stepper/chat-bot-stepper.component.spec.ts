import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotStepperComponent } from './chat-bot-stepper.component';

describe('ChatBotStepperComponent', () => {
  let component: ChatBotStepperComponent;
  let fixture: ComponentFixture<ChatBotStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
