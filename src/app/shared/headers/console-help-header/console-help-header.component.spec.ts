import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleHelpHeaderComponent } from './console-help-header.component';

describe('ConsoleHelpHeaderComponent', () => {
  let component: ConsoleHelpHeaderComponent;
  let fixture: ComponentFixture<ConsoleHelpHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleHelpHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleHelpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
