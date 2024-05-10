import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleAutoResponderHeaderComponent } from './console-auto-responder-header.component';

describe('ConsoleAutoResponderHeaderComponent', () => {
  let component: ConsoleAutoResponderHeaderComponent;
  let fixture: ComponentFixture<ConsoleAutoResponderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleAutoResponderHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleAutoResponderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
