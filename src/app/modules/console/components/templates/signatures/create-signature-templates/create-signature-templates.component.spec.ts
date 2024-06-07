import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSignatureTemplatesComponent } from './create-signature-templates.component';
describe('CreateSignatureTemplatesComponent', () => {
  let component: CreateSignatureTemplatesComponent;
  let fixture: ComponentFixture<CreateSignatureTemplatesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSignatureTemplatesComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSignatureTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
