import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneAdminPanelComponent } from './telephone-admin-panel.component';

describe('TelephoneAdminPanelComponent', () => {
  let component: TelephoneAdminPanelComponent;
  let fixture: ComponentFixture<TelephoneAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelephoneAdminPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelephoneAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
