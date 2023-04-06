import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappDetailsComponent } from './whatsapp-details.component';

describe('WhatsappDetailsComponent', () => {
  let component: WhatsappDetailsComponent;
  let fixture: ComponentFixture<WhatsappDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
