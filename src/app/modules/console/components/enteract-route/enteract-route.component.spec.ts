import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnteractRouteComponent } from './enteract-route.component';
describe('EnteractRouteComponent', () => {
  let component: EnteractRouteComponent;
  let fixture: ComponentFixture<EnteractRouteComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnteractRouteComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(EnteractRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
