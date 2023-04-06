import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarredHeaderComponent } from './starred-header.component';

describe('StarredHeaderComponent', () => {
  let component: StarredHeaderComponent;
  let fixture: ComponentFixture<StarredHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarredHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarredHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
