import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxResponderComponent } from './inbox-responder.component';

describe('InboxResponderComponent', () => {
  let component: InboxResponderComponent;
  let fixture: ComponentFixture<InboxResponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxResponderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxResponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
