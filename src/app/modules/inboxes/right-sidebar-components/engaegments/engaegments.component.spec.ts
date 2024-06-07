import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EngaegmentsComponent } from './engaegments.component';
describe('EngaegmentsComponent', () => {
  let component: EngaegmentsComponent;
  let fixture: ComponentFixture<EngaegmentsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngaegmentsComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(EngaegmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
