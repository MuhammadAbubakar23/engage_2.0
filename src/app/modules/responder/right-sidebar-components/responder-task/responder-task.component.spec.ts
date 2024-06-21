import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderTaskComponent } from './responder-task.component';
describe('ResponderTaskComponent', () => {
  let component: ResponderTaskComponent;
  let fixture: ComponentFixture<ResponderTaskComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderTaskComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
