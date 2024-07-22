import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentScorecardDashboardComponent } from './agent-scorecard-dashboard.component';

describe('AgentScorecardDashboardComponent', () => {
  let component: AgentScorecardDashboardComponent;
  let fixture: ComponentFixture<AgentScorecardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentScorecardDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentScorecardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
