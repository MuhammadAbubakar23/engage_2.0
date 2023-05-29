import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableHeaderCheckboxComponent } from './console-table-header-checkbox.component';

describe('ConsoleTableHeaderCheckboxComponent', () => {
  let component: ConsoleTableHeaderCheckboxComponent;
  let fixture: ComponentFixture<ConsoleTableHeaderCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableHeaderCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableHeaderCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
