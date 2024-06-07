import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleRolesComponent } from './console-roles.component';
describe('ConsoleRolesComponent', () => {
  let component: ConsoleRolesComponent;
  let fixture: ComponentFixture<ConsoleRolesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleRolesComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
