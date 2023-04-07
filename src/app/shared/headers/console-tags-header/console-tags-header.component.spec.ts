import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleTagsHeaderComponent } from './console-tags-header.component';

describe('ConsoleTagsHeaderComponent', () => {
  let component: ConsoleTagsHeaderComponent;
  let fixture: ComponentFixture<ConsoleTagsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleTagsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleTagsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
