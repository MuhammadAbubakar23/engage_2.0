import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleDocumentsHeaderComponent } from './console-documents-header.component';
describe('ConsoleDocumentsHeaderComponent', () => {
  let component: ConsoleDocumentsHeaderComponent;
  let fixture: ComponentFixture<ConsoleDocumentsHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleDocumentsHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleDocumentsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
