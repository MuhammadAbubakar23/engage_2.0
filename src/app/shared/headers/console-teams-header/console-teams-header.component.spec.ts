import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTeamsHeaderComponent } from './console-teams-header.component';

describe('ConsoleTeamsHeaderComponent', () => {
  let component: ConsoleTeamsHeaderComponent;
  let fixture: ComponentFixture<ConsoleTeamsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTeamsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleTeamsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
