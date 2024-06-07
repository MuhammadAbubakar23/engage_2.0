import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteToAgentComponent } from './route-to-agent.component';
describe('RouteToAgentComponent', () => {
  let component: RouteToAgentComponent;
  let fixture: ComponentFixture<RouteToAgentComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteToAgentComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RouteToAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
