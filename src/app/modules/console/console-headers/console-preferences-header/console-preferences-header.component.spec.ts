import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolePreferencesHeaderComponent } from './console-preferences-header.component';

describe('ConsolePreferencesHeaderComponent', () => {
  let component: ConsolePreferencesHeaderComponent;
  let fixture: ComponentFixture<ConsolePreferencesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolePreferencesHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolePreferencesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
