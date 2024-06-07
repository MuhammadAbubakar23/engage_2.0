import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserHeaderComponent } from './create-user-header.component';
describe('CreateUserHeaderComponent', () => {
  let component: CreateUserHeaderComponent;
  let fixture: ComponentFixture<CreateUserHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
