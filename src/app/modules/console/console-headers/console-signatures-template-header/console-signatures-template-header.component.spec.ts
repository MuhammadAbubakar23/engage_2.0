import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleSignaturesTemplateHeaderComponent } from './console-signatures-template-header.component';
describe('ConsoleSignaturesTemplateHeaderComponent', () => {
  let component: ConsoleSignaturesTemplateHeaderComponent;
  let fixture: ComponentFixture<ConsoleSignaturesTemplateHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleSignaturesTemplateHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleSignaturesTemplateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
