import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboundContentComponent } from './inbound-content.component';
describe('InboundContentComponent', () => {
  let component: InboundContentComponent;
  let fixture: ComponentFixture<InboundContentComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InboundContentComponent]
    });
    fixture = TestBed.createComponent(InboundContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
