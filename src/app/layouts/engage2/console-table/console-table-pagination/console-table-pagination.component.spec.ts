import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTablePaginationComponent } from './console-table-pagination.component';

describe('ConsoleTablePaginationComponent', () => {
  let component: ConsoleTablePaginationComponent;
  let fixture: ComponentFixture<ConsoleTablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTablePaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
