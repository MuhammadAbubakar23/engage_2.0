import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookReportScrmComponent } from './facebook-report-scrm.component';

describe('FacebookReportScrmComponent', () => {
  let component: FacebookReportScrmComponent;
  let fixture: ComponentFixture<FacebookReportScrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookReportScrmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookReportScrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
