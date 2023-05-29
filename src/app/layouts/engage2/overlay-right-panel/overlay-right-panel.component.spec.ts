import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayRightPanelComponent } from './overlay-right-panel.component';

describe('OverlayRightPanelComponent', () => {
  let component: OverlayRightPanelComponent;
  let fixture: ComponentFixture<OverlayRightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayRightPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
