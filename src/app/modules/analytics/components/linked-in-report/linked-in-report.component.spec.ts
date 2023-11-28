import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedInReportComponent } from './linked-in-report.component';

describe('LinkedInReportComponent', () => {
  let component: LinkedInReportComponent;
  let fixture: ComponentFixture<LinkedInReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedInReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedInReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
