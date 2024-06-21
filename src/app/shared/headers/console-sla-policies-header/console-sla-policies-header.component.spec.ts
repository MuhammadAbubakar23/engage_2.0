import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleSlaPoliciesHeaderComponent } from './console-sla-policies-header.component';
describe('ConsoleSlaPoliciesHeaderComponent', () => {
  let component: ConsoleSlaPoliciesHeaderComponent;
  let fixture: ComponentFixture<ConsoleSlaPoliciesHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleSlaPoliciesHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleSlaPoliciesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
