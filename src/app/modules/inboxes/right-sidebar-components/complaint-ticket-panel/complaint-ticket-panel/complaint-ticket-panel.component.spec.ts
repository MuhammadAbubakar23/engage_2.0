import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplaintTicketPanelComponent } from './complaint-ticket-panel.component';
describe('ComplaintTicketPanelComponent', () => {
  let component: ComplaintTicketPanelComponent;
  let fixture: ComponentFixture<ComplaintTicketPanelComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintTicketPanelComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintTicketPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
