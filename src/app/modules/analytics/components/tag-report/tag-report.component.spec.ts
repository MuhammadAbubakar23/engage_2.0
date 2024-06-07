import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagReportComponent } from './tag-report.component';
describe('TagReportComponent', () => {
  let component: TagReportComponent;
  let fixture: ComponentFixture<TagReportComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagReportComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TagReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
