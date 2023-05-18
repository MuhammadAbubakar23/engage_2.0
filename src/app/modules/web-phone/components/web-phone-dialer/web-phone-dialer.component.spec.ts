import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPhoneDialerComponent } from './web-phone-dialer.component';

describe('WebPhoneDialerComponent', () => {
  let component: WebPhoneDialerComponent;
  let fixture: ComponentFixture<WebPhoneDialerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPhoneDialerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPhoneDialerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
