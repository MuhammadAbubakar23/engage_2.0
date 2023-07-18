import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderProfileComponent } from './responder-profile.component';

describe('ResponderProfileComponent', () => {
  let component: ResponderProfileComponent;
  let fixture: ComponentFixture<ResponderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
