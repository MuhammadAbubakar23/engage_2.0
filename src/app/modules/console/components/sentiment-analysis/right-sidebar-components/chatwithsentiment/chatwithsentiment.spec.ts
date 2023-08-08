import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithSentimentComponent } from './chatwithsentiment';

describe('SentimentchatComponent', () => {
  let component: ChatWithSentimentComponent;
  let fixture: ComponentFixture<ChatWithSentimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatWithSentimentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatWithSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
