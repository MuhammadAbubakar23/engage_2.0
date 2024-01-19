import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundContentComponent } from './outbound-content.component';

describe('OutboundContentComponent', () => {
  let component: OutboundContentComponent;
  let fixture: ComponentFixture<OutboundContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutboundContentComponent]
    });
    fixture = TestBed.createComponent(OutboundContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
