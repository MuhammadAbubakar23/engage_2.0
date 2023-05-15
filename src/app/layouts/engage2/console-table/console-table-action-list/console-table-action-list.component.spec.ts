import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableActionListComponent } from './console-table-action-list.component';

describe('ConsoleTableActionListComponent', () => {
  let component: ConsoleTableActionListComponent;
  let fixture: ComponentFixture<ConsoleTableActionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableActionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
