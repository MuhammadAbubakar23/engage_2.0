import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillMembersComponent } from './add-skill-members.component';

describe('AddSkillMembersComponent', () => {
  let component: AddSkillMembersComponent;
  let fixture: ComponentFixture<AddSkillMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkillMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSkillMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
