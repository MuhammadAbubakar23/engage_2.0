import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleAccessReportHeaderComponent } from './console-access-report-header.component';

describe('ConsoleAccessReportHeaderComponent', () => {
  let component: ConsoleAccessReportHeaderComponent;
  let fixture: ComponentFixture<ConsoleAccessReportHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleAccessReportHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleAccessReportHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
