import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubRoleMenuComponent } from './sub-role-menu.component';

describe('SubRoleMenuComponent', () => {
  let component: SubRoleMenuComponent;
  let fixture: ComponentFixture<SubRoleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubRoleMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubRoleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
