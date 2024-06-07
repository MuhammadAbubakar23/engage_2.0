import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialerMenuComponent } from './dialer-menu.component';
describe('DialerMenuComponent', () => {
  let component: DialerMenuComponent;
  let fixture: ComponentFixture<DialerMenuComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialerMenuComponent]
    });
    fixture = TestBed.createComponent(DialerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
