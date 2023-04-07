import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamHeaderComponent } from './create-team-header.component';

describe('CreateTeamHeaderComponent', () => {
  let component: CreateTeamHeaderComponent;
  let fixture: ComponentFixture<CreateTeamHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeamHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
