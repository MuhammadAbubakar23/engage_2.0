import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBuilderHeaderComponent } from './report-builder-header.component';

describe('ReportBuilderHeaderComponent', () => {
  let component: ReportBuilderHeaderComponent;
  let fixture: ComponentFixture<ReportBuilderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBuilderHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportBuilderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
