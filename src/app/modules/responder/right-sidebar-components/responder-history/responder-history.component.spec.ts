import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderHistoryComponent } from './responder-history.component';
describe('ResponderHistoryComponent', () => {
  let component: ResponderHistoryComponent;
  let fixture: ComponentFixture<ResponderHistoryComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderHistoryComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
