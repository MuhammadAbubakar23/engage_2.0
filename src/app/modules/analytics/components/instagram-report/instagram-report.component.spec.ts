import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstagramReportComponent } from './instagram-report.component';
describe('InstagramReportComponent', () => {
  let component: InstagramReportComponent;
  let fixture: ComponentFixture<InstagramReportComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagramReportComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(InstagramReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
