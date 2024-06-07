import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleCreateSignatureTemplatesHeaderComponent } from './console-create-signature-templates-header.component';
describe('ConsoleCreateSignatureTemplatesHeaderComponent', () => {
  let component: ConsoleCreateSignatureTemplatesHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateSignatureTemplatesHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateSignatureTemplatesHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCreateSignatureTemplatesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
