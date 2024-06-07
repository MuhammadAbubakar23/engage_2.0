import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SentHeaderComponent } from './sent-header.component';
describe('SentHeaderComponent', () => {
  let component: SentHeaderComponent;
  let fixture: ComponentFixture<SentHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
