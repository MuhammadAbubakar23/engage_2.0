import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivechatsComponent } from './livechats.component';
describe('LivechatsComponent', () => {
  let component: LivechatsComponent;
  let fixture: ComponentFixture<LivechatsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivechatsComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LivechatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
