import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleKnowledgeBaseHeaderComponent } from './console-knowledge-base-header.component';

describe('ConsoleKnowledgeBaseHeaderComponent', () => {
  let component: ConsoleKnowledgeBaseHeaderComponent;
  let fixture: ComponentFixture<ConsoleKnowledgeBaseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleKnowledgeBaseHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleKnowledgeBaseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
