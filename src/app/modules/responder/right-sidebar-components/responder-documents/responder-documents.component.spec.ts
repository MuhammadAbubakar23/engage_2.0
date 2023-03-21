import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderDocumentsComponent } from './responder-documents.component';

describe('ResponderDocumentsComponent', () => {
  let component: ResponderDocumentsComponent;
  let fixture: ComponentFixture<ResponderDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
