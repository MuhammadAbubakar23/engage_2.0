import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPerformanceReportComponent } from './agent-performance-report.component';

describe('AgentPerformanceReportComponent', () => {
  let component: AgentPerformanceReportComponent;
  let fixture: ComponentFixture<AgentPerformanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentPerformanceReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
