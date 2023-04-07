import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolePostsListHeaderComponent } from './console-posts-list-header.component';

describe('ConsolePostsListHeaderComponent', () => {
  let component: ConsolePostsListHeaderComponent;
  let fixture: ComponentFixture<ConsolePostsListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolePostsListHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolePostsListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
