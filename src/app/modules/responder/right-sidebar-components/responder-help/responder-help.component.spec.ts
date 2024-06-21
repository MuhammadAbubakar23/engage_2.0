import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderHelpComponent } from './responder-help.component';
describe('ResponderHelpComponent', () => {
  let component: ResponderHelpComponent;
  let fixture: ComponentFixture<ResponderHelpComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderHelpComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
