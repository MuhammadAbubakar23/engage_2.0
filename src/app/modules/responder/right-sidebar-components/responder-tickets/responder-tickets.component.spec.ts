import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderTicketsComponent } from './responder-tickets.component';

describe('ResponderTicketsComponent', () => {
  let component: ResponderTicketsComponent;
  let fixture: ComponentFixture<ResponderTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
