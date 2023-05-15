import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCreateRolesHeaderComponent } from './console-create-roles-header.component';

describe('ConsoleCreateRolesHeaderComponent', () => {
  let component: ConsoleCreateRolesHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateRolesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateRolesHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCreateRolesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
