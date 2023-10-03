import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundOntboundReportComponent } from './inbound-ontbound-report.component';

describe('InboundOntboundReportComponent', () => {
  let component: InboundOntboundReportComponent;
  let fixture: ComponentFixture<InboundOntboundReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboundOntboundReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboundOntboundReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
