import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsRightSidebarMenuComponent } from './analytics-right-sidebar-menu.component';

describe('AnalyticsRightSidebarMenuComponent', () => {
  let component: AnalyticsRightSidebarMenuComponent;
  let fixture: ComponentFixture<AnalyticsRightSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsRightSidebarMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsRightSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
