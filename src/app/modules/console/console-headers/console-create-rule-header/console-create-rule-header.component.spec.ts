import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleCreateRuleHeaderComponent } from './console-create-rule-header.component';
describe('ConsoleCreateRuleHeaderComponent', () => {
  let component: ConsoleCreateRuleHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateRuleHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateRuleHeaderComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ConsoleCreateRuleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
