import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultitenantComponent } from './multitenant.component';

describe('MultitenantComponent', () => {
  let component: MultitenantComponent;
  let fixture: ComponentFixture<MultitenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultitenantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultitenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
