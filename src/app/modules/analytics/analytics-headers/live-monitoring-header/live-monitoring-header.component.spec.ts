import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMonitoringHeaderComponent } from './live-monitoring-header.component';

describe('LiveMonitoringHeaderComponent', () => {
  let component: LiveMonitoringHeaderComponent;
  let fixture: ComponentFixture<LiveMonitoringHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveMonitoringHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveMonitoringHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
