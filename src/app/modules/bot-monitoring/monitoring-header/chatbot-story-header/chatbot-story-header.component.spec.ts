import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotStoryHeaderComponent } from './chatbot-story-header.component';

describe('ChatbotStoryHeaderComponent', () => {
  let component: ChatbotStoryHeaderComponent;
  let fixture: ComponentFixture<ChatbotStoryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotStoryHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotStoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
