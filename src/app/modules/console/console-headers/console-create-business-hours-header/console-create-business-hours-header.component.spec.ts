import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCreateBusinessHoursHeaderComponent } from './console-create-business-hours-header.component';

describe('ConsoleCreateBusinessHoursHeaderComponent', () => {
  let component: ConsoleCreateBusinessHoursHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateBusinessHoursHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateBusinessHoursHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleCreateBusinessHoursHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
