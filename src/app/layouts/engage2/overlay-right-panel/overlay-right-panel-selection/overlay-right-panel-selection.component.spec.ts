import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayRightPanelSelectionComponent } from './overlay-right-panel-selection.component';

describe('OverlayRightPanelSelectionComponent', () => {
  let component: OverlayRightPanelSelectionComponent;
  let fixture: ComponentFixture<OverlayRightPanelSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayRightPanelSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayRightPanelSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
