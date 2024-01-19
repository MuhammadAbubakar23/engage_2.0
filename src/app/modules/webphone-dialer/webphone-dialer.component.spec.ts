import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebphoneDialerComponent } from './webphone-dialer.component';

describe('WebphoneDialerComponent', () => {
  let component: WebphoneDialerComponent;
  let fixture: ComponentFixture<WebphoneDialerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebphoneDialerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebphoneDialerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
