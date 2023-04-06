import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderCreateNewComponent } from './responder-create-new.component';

describe('ResponderCreateNewComponent', () => {
  let component: ResponderCreateNewComponent;
  let fixture: ComponentFixture<ResponderCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderCreateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
