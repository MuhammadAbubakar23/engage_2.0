import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateQuickResponseTemplatesComponent } from './create-quick-response-templates.component';
describe('CreateQuickResponseTemplatesComponent', () => {
  let component: CreateQuickResponseTemplatesComponent;
  let fixture: ComponentFixture<CreateQuickResponseTemplatesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuickResponseTemplatesComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CreateQuickResponseTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
