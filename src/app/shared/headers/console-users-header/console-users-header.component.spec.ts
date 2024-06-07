import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleUsersHeaderComponent } from './console-users-header.component';
describe('ConsoleUsersHeaderComponent', () => {
  let component: ConsoleUsersHeaderComponent;
  let fixture: ComponentFixture<ConsoleUsersHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleUsersHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleUsersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
