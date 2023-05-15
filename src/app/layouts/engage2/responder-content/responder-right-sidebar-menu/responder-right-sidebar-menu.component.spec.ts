import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderRightSidebarMenuComponent } from './responder-right-sidebar-menu.component';

describe('ResponderRightSidebarMenuComponent', () => {
  let component: ResponderRightSidebarMenuComponent;
  let fixture: ComponentFixture<ResponderRightSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderRightSidebarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderRightSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
