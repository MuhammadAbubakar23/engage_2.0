import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryTagReportComponent } from './queryTag-report.component';

describe('QueryTagReportComponent', () => {
  let component: QueryTagReportComponent;
  let fixture: ComponentFixture<QueryTagReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryTagReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryTagReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
