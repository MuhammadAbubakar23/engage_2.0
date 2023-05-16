import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveDashboardHeaderComponent } from './executive-dashboard-header.component';

describe('ExecutiveDashboardHeaderComponent', () => {
  let component: ExecutiveDashboardHeaderComponent;
  let fixture: ComponentFixture<ExecutiveDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutiveDashboardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
