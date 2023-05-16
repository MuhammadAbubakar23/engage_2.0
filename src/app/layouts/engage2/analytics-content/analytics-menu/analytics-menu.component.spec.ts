import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsMenuComponent } from './analytics-menu.component';

describe('AnalyticsMenuComponent', () => {
  let component: AnalyticsMenuComponent;
  let fixture: ComponentFixture<AnalyticsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
