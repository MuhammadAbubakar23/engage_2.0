import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsContentComponent } from './analytics-content.component';

describe('AnalyticsContentComponent', () => {
  let component: AnalyticsContentComponent;
  let fixture: ComponentFixture<AnalyticsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
