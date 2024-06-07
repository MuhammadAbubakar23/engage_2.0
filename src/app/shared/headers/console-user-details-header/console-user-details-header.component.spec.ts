import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleUserDetailsHeaderComponent } from './console-user-details-header.component';
describe('ConsoleUserDetailsHeaderComponent', () => {
  let component: ConsoleUserDetailsHeaderComponent;
  let fixture: ComponentFixture<ConsoleUserDetailsHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleUserDetailsHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleUserDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
