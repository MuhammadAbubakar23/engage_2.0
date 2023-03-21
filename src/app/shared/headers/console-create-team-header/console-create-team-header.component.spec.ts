import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCreateTeamHeaderComponent } from './console-create-team-header.component';

describe('ConsoleCreateTeamHeaderComponent', () => {
  let component: ConsoleCreateTeamHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateTeamHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateTeamHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCreateTeamHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
