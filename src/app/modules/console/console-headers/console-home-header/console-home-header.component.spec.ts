import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleHomeHeaderComponent } from './console-home-header.component';

describe('ConsoleHomeHeaderComponent', () => {
  let component: ConsoleHomeHeaderComponent;
  let fixture: ComponentFixture<ConsoleHomeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleHomeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleHomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
