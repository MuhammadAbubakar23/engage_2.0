import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleSkillsHeaderComponent } from './console-skills-header.component';

describe('ConsoleSkillsHeaderComponent', () => {
  let component: ConsoleSkillsHeaderComponent;
  let fixture: ComponentFixture<ConsoleSkillsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleSkillsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleSkillsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
