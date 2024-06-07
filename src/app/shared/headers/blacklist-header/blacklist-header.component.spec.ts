import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlacklistHeaderComponent } from './blacklist-header.component';
describe('BlacklistHeaderComponent', () => {
  let component: BlacklistHeaderComponent;
  let fixture: ComponentFixture<BlacklistHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlacklistHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
