import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderHeaderComponent } from './responder-header.component';

describe('ResponderHeaderComponent', () => {
  let component: ResponderHeaderComponent;
  let fixture: ComponentFixture<ResponderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
