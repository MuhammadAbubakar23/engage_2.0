import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTableWrapComponent } from './console-table-wrap.component';

describe('ConsoleTableWrapComponent', () => {
  let component: ConsoleTableWrapComponent;
  let fixture: ComponentFixture<ConsoleTableWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTableWrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleTableWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
