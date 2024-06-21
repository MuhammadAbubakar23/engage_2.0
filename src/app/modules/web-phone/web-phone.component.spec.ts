import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebPhoneComponent } from './web-phone.component';
describe('WebPhoneComponent', () => {
  let component: WebPhoneComponent;
  let fixture: ComponentFixture<WebPhoneComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPhoneComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(WebPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
