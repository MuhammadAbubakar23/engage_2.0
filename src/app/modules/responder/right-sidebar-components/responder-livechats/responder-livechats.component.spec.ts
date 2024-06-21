import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderLivechatsComponent } from './responder-livechats.component';
describe('ResponderLivechatsComponent', () => {
  let component: ResponderLivechatsComponent;
  let fixture: ComponentFixture<ResponderLivechatsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderLivechatsComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderLivechatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
