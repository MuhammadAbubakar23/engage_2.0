import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderKnowledgeBaseComponent } from './responder-knowledge-base.component';

describe('ResponderKnowledgeBaseComponent', () => {
  let component: ResponderKnowledgeBaseComponent;
  let fixture: ComponentFixture<ResponderKnowledgeBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderKnowledgeBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderKnowledgeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
