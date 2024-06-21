import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleCreateContactHeaderComponent } from './console-create-contact-header.component';
describe('ConsoleCreateContactHeaderComponent', () => {
  let component: ConsoleCreateContactHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateContactHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateContactHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCreateContactHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
