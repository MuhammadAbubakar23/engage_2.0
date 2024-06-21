import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleContactsHeaderComponent } from './console-contacts-header.component';
describe('ConsoleContactsHeaderComponent', () => {
  let component: ConsoleContactsHeaderComponent;
  let fixture: ComponentFixture<ConsoleContactsHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleContactsHeaderComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleContactsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
