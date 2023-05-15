import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableToolbarComponent } from './console-table-toolbar.component';

describe('ConsoleTableToolbarComponent', () => {
  let component: ConsoleTableToolbarComponent;
  let fixture: ComponentFixture<ConsoleTableToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
