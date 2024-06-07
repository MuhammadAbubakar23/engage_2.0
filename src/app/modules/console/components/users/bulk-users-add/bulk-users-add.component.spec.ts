import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkUsersAddComponent } from './bulk-users-add.component';
describe('BulkUsersAddComponent', () => {
  let component: BulkUsersAddComponent;
  let fixture: ComponentFixture<BulkUsersAddComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUsersAddComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUsersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
