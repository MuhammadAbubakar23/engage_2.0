import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinReportScrmComponent } from './linkedin-report-scrm.component';

describe('LinkedinReportScrmComponent', () => {
  let component: LinkedinReportScrmComponent;
  let fixture: ComponentFixture<LinkedinReportScrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedinReportScrmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedinReportScrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
