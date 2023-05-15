import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableComponent } from './console-table.component';

describe('ConsoleTableComponent', () => {
  let component: ConsoleTableComponent;
  let fixture: ComponentFixture<ConsoleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
