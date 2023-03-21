import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxRightSidebarComponent } from './inbox-right-sidebar.component';

describe('RightSidebarComponent', () => {
  let component: InboxRightSidebarComponent;
  let fixture: ComponentFixture<InboxRightSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxRightSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
