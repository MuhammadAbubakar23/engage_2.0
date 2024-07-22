import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveInteractionReportComponent } from './live-interaction-report.component';

describe('LiveInteractionReportComponent', () => {
  let component: LiveInteractionReportComponent;
  let fixture: ComponentFixture<LiveInteractionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveInteractionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveInteractionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
