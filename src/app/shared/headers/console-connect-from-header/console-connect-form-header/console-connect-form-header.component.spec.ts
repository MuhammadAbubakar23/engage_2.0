import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleConnectFormHeaderComponent } from './console-connect-form-header.component';

describe('ConsoleConnectFormHeaderComponent', () => {
  let component: ConsoleConnectFormHeaderComponent;
  let fixture: ComponentFixture<ConsoleConnectFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleConnectFormHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleConnectFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
