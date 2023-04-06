import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableActionComponent } from './console-table-action.component';

describe('ConsoleTableActionComponent', () => {
  let component: ConsoleTableActionComponent;
  let fixture: ComponentFixture<ConsoleTableActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
