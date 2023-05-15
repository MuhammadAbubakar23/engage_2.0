import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCreateBulkUserHeaderComponent } from './console-create-bulk-user-header.component';

describe('ConsoleCreateBulkUserHeaderComponent', () => {
  let component: ConsoleCreateBulkUserHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateBulkUserHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateBulkUserHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCreateBulkUserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
