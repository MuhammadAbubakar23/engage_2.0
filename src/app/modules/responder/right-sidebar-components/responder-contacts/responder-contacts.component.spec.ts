import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderContactsComponent } from './responder-contacts.component';

describe('ResponderContactsComponent', () => {
  let component: ResponderContactsComponent;
  let fixture: ComponentFixture<ResponderContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
