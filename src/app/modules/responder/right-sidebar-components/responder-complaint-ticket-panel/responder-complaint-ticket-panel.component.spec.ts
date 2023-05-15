import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderComplaintTicketPanelComponent } from './responder-complaint-ticket-panel.component';

describe('ResponderComplaintTicketPanelComponent', () => {
  let component: ResponderComplaintTicketPanelComponent;
  let fixture: ComponentFixture<ResponderComplaintTicketPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderComplaintTicketPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderComplaintTicketPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
