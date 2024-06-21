import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMessageTemplatesComponent } from './create-message-templates.component';
describe('CreateMessageTemplatesComponent', () => {
  let component: CreateMessageTemplatesComponent;
  let fixture: ComponentFixture<CreateMessageTemplatesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMessageTemplatesComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessageTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
