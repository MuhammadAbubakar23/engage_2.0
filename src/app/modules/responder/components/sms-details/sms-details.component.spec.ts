import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsDetailsComponent } from './sms-details.component';

describe('SmsDetailsComponent', () => {
  let component: SmsDetailsComponent;
  let fixture: ComponentFixture<SmsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
