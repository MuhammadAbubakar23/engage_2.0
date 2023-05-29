import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableCheckboxComponent } from './console-table-checkbox.component';

describe('ConsoleTableCheckboxComponent', () => {
  let component: ConsoleTableCheckboxComponent;
  let fixture: ComponentFixture<ConsoleTableCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
