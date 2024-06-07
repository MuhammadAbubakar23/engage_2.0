import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DblistingComponent } from './dblisting.component';
describe('DblistingComponent', () => {
  let component: DblistingComponent;
  let fixture: ComponentFixture<DblistingComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DblistingComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DblistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
