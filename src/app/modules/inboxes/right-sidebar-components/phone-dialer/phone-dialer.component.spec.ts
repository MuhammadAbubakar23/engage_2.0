import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneDialerComponent } from './phone-dialer.component';
describe('PhoneDialerComponent', () => {
  let component: PhoneDialerComponent;
  let fixture: ComponentFixture<PhoneDialerComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneDialerComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneDialerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
