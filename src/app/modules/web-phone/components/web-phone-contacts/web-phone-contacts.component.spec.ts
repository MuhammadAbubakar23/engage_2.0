import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebPhoneContactsComponent } from './web-phone-contacts.component';
describe('WebPhoneContactsComponent', () => {
  let component: WebPhoneContactsComponent;
  let fixture: ComponentFixture<WebPhoneContactsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPhoneContactsComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(WebPhoneContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
