import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessHoursComponent } from './create-business-hours.component';

describe('CreateBusinessHoursComponent', () => {
  let component: CreateBusinessHoursComponent;
  let fixture: ComponentFixture<CreateBusinessHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBusinessHoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBusinessHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
