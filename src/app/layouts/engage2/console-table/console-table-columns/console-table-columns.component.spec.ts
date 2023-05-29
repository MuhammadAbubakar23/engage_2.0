import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableColumnsComponent } from './console-table-columns.component';

describe('ConsoleTableColumnsComponent', () => {
  let component: ConsoleTableColumnsComponent;
  let fixture: ComponentFixture<ConsoleTableColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableColumnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
