import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderKeyboardShortcutsComponent } from './responder-keyboard-shortcuts.component';

describe('ResponderKeyboardShortcutsComponent', () => {
  let component: ResponderKeyboardShortcutsComponent;
  let fixture: ComponentFixture<ResponderKeyboardShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderKeyboardShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderKeyboardShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
