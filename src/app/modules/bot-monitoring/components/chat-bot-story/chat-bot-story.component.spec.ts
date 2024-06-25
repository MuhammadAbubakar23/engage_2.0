import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotStoryComponent } from './chat-bot-story.component';

describe('ChatBotStoryComponent', () => {
  let component: ChatBotStoryComponent;
  let fixture: ComponentFixture<ChatBotStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
