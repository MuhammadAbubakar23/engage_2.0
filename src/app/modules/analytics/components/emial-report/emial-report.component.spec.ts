import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmialReportComponent } from './emial-report.component';

describe('EmialReportComponent', () => {
  let component: EmialReportComponent;
  let fixture: ComponentFixture<EmialReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmialReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
