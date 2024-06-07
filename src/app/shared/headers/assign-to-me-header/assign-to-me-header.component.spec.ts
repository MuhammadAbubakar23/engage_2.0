import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignToMeHeaderComponent } from './assign-to-me-header.component';
describe('AssignToMeHeaderComponent', () => {
  let component: AssignToMeHeaderComponent;
  let fixture: ComponentFixture<AssignToMeHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignToMeHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AssignToMeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
