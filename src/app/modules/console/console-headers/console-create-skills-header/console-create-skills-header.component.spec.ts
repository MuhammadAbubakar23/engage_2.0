import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCreateSkillsHeaderComponent } from './console-create-skills-header.component';

describe('ConsoleCreateSkillsHeaderComponent', () => {
  let component: ConsoleCreateSkillsHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateSkillsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateSkillsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleCreateSkillsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
