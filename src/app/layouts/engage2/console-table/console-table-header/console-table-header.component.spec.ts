import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableHeaderComponent } from './console-table-header.component';

describe('ConsoleTableHeaderComponent', () => {
  let component: ConsoleTableHeaderComponent;
  let fixture: ComponentFixture<ConsoleTableHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
