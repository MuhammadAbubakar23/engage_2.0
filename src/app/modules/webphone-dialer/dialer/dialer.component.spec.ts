import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialerComponent } from './dialer.component';
describe('DialerComponent', () => {
  let component: DialerComponent;
  let fixture: ComponentFixture<DialerComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialerComponent]
    });
    fixture = TestBed.createComponent(DialerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
