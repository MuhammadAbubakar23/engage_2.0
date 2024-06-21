import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateQuickResponseTemplateComponent } from './create-quick-response-template.component';
describe('CreateQuickResponseTemplateComponent', () => {
  let component: CreateQuickResponseTemplateComponent;
  let fixture: ComponentFixture<CreateQuickResponseTemplateComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuickResponseTemplateComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CreateQuickResponseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
