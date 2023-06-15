import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDbSettingsComponent } from './report-db-settings.component';

describe('ReportDbSettingsComponent', () => {
  let component: ReportDbSettingsComponent;
  let fixture: ComponentFixture<ReportDbSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDbSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDbSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
