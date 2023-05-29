import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableFooterComponent } from './console-table-footer.component';

describe('ConsoleTableFooterComponent', () => {
  let component: ConsoleTableFooterComponent;
  let fixture: ComponentFixture<ConsoleTableFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
