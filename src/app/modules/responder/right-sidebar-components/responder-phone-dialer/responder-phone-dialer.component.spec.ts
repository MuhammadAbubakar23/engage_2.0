import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderPhoneDialerComponent } from './responder-phone-dialer.component';
describe('ResponderPhoneDialerComponent', () => {
  let component: ResponderPhoneDialerComponent;
  let fixture: ComponentFixture<ResponderPhoneDialerComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderPhoneDialerComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderPhoneDialerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
