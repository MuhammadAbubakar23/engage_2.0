import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleRulesHeaderComponent } from './console-rules-header.component';
describe('ConsoleRulesHeaderComponent', () => {
  let component: ConsoleRulesHeaderComponent;
  let fixture: ComponentFixture<ConsoleRulesHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleRulesHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleRulesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
