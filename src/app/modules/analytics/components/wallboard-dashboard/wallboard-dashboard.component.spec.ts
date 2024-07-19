import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallboardDashboardComponent } from './wallboard-dashboard.component';

describe('WallboardDashboardComponent', () => {
  let component: WallboardDashboardComponent;
  let fixture: ComponentFixture<WallboardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallboardDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WallboardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
