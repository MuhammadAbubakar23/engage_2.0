import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelContentComponent } from './admin-panel-content.component';

describe('AdminPanelContentComponent', () => {
  let component: AdminPanelContentComponent;
  let fixture: ComponentFixture<AdminPanelContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPanelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
