import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderContentComponent } from './responder-content.component';

describe('ResponderContentComponent', () => {
  let component: ResponderContentComponent;
  let fixture: ComponentFixture<ResponderContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
