import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMoniteringHeaderComponent } from './bot-monitering-header.component';

describe('BotMoniteringHeaderComponent', () => {
  let component: BotMoniteringHeaderComponent;
  let fixture: ComponentFixture<BotMoniteringHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotMoniteringHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotMoniteringHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
