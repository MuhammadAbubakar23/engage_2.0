import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMoniteringChatComponent } from './bot-monitering-chat.component';

describe('BotMoniteringChatComponent', () => {
  let component: BotMoniteringChatComponent;
  let fixture: ComponentFixture<BotMoniteringChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotMoniteringChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotMoniteringChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
