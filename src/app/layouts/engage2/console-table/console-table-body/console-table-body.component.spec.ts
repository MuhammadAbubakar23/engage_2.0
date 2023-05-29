import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableBodyComponent } from './console-table-body.component';

describe('ConsoleTableBodyComponent', () => {
  let component: ConsoleTableBodyComponent;
  let fixture: ComponentFixture<ConsoleTableBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
