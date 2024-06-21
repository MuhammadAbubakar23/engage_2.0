import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleEntractRouteHeaderComponent } from './console-entract-route-header.component';
describe('ConsoleEntractRouteHeaderComponent', () => {
  let component: ConsoleEntractRouteHeaderComponent;
  let fixture: ComponentFixture<ConsoleEntractRouteHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleEntractRouteHeaderComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ConsoleEntractRouteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
