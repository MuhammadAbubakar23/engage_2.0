import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpamHeaderComponent } from './spam-header.component';
describe('SpamHeaderComponent', () => {
  let component: SpamHeaderComponent;
  let fixture: ComponentFixture<SpamHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpamHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SpamHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
