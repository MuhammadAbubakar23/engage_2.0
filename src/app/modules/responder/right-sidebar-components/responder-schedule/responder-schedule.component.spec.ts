import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderScheduleComponent } from './responder-schedule.component';
describe('ResponderScheduleComponent', () => {
  let component: ResponderScheduleComponent;
  let fixture: ComponentFixture<ResponderScheduleComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderScheduleComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
