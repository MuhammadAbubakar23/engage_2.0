import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsatRawDataReportComponent } from './csat-raw-data-report.component';

describe('CsatRawDataReportComponent', () => {
  let component: CsatRawDataReportComponent;
  let fixture: ComponentFixture<CsatRawDataReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsatRawDataReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsatRawDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
