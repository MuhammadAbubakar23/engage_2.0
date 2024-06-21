import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispositionFormComponent } from './disposition-form.component';
describe('DispositionFormComponent', () => {
  let component: DispositionFormComponent;
  let fixture: ComponentFixture<DispositionFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispositionFormComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DispositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
