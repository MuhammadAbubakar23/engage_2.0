import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InteractionReportComponent } from './interaction-report.component';
describe('InteractionReportComponent', () => {
  let component: InteractionReportComponent;
  let fixture: ComponentFixture<InteractionReportComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionReportComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(InteractionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
