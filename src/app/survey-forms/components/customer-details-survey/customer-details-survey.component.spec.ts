import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerDetailsSurveyComponent } from './customer-details-survey.component';
describe('CustomerDetailsSurveyComponent', () => {
  let component: CustomerDetailsSurveyComponent;
  let fixture: ComponentFixture<CustomerDetailsSurveyComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsSurveyComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CustomerDetailsSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
