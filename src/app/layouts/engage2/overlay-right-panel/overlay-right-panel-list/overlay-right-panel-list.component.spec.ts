import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayRightPanelListComponent } from './overlay-right-panel-list.component';

describe('OverlayRightPanelListComponent', () => {
  let component: OverlayRightPanelListComponent;
  let fixture: ComponentFixture<OverlayRightPanelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayRightPanelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayRightPanelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
