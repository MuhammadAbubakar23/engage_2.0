import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleDocumentDetailsHeaderComponent } from './console-document-details-header.component';
describe('ConsoleDocumentDetailsHeaderComponent', () => {
  let component: ConsoleDocumentDetailsHeaderComponent;
  let fixture: ComponentFixture<ConsoleDocumentDetailsHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleDocumentDetailsHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleDocumentDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
