import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderCustomerProfilingComponent } from './responder-customer-profiling.component';
describe('ResponderCustomerProfilingComponent', () => {
  let component: ResponderCustomerProfilingComponent;
  let fixture: ComponentFixture<ResponderCustomerProfilingComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderCustomerProfilingComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ResponderCustomerProfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
