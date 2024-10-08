import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickResponseComponent } from './quick-response.component';
describe('QuickResponseComponent', () => {
  let component: QuickResponseComponent;
  let fixture: ComponentFixture<QuickResponseComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickResponseComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(QuickResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
