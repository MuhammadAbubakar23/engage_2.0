import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueCustomersComponent } from './unique-customers.component';

describe('UniqueCustomersComponent', () => {
  let component: UniqueCustomersComponent;
  let fixture: ComponentFixture<UniqueCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniqueCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniqueCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
