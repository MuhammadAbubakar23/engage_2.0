import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EchartsTestingComponent } from './echarts-testing.component';
describe('EchartsTestingComponent', () => {
  let component: EchartsTestingComponent;
  let fixture: ComponentFixture<EchartsTestingComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsTestingComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(EchartsTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
