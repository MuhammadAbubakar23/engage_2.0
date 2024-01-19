import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBookContentComponent } from './contact-book-content.component';

describe('ContactBookContentComponent', () => {
  let component: ContactBookContentComponent;
  let fixture: ComponentFixture<ContactBookContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactBookContentComponent]
    });
    fixture = TestBed.createComponent(ContactBookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
