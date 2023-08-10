import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPhoneCallListComponent } from './web-phone-call-list.component';

describe('WebPhoneCallListComponent', () => {
  let component: WebPhoneCallListComponent;
  let fixture: ComponentFixture<WebPhoneCallListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebPhoneCallListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPhoneCallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
