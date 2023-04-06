import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizedChatWidgetComponent } from './minimized-chat-widget.component';

describe('MinimizedChatWidgetComponent', () => {
  let component: MinimizedChatWidgetComponent;
  let fixture: ComponentFixture<MinimizedChatWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimizedChatWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimizedChatWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
