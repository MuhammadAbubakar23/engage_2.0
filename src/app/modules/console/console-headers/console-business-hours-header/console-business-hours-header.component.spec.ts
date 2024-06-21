import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleBusinessHoursHeaderComponent } from './console-business-hours-header.component';
describe('ConsoleBusinessHoursHeaderComponent', () => {
  let component: ConsoleBusinessHoursHeaderComponent;
  let fixture: ComponentFixture<ConsoleBusinessHoursHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleBusinessHoursHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleBusinessHoursHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
