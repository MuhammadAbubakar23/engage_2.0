import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleKnowledgeBaseComponent } from './knowledge-base.component';
describe('KnowledgeBaseComponent', () => {
  let component: ConsoleKnowledgeBaseComponent;
  let fixture: ComponentFixture<ConsoleKnowledgeBaseComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleKnowledgeBaseComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleKnowledgeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
