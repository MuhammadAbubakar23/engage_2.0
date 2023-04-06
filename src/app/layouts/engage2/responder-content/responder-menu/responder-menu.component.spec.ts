import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderMenuComponent } from './responder-menu.component';

describe('ResponderMenuComponent', () => {
  let component: ResponderMenuComponent;
  let fixture: ComponentFixture<ResponderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
