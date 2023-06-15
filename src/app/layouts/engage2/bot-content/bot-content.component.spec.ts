import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotContentComponent } from './bot-content.component';

describe('BotContentComponent', () => {
  let component: BotContentComponent;
  let fixture: ComponentFixture<BotContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
