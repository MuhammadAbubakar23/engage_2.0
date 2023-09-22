import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterReportComponent } from './twitter-report.component';

describe('TwitterReportComponent', () => {
  let component: TwitterReportComponent;
  let fixture: ComponentFixture<TwitterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitterReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
