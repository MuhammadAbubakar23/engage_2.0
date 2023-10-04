import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandledByBotComponent } from './handled-by-bot.component';

describe('HandledByBotComponent', () => {
  let component: HandledByBotComponent;
  let fixture: ComponentFixture<HandledByBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandledByBotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandledByBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
