import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleCreatePreferencesHeaderComponent } from './console-create-preferences-header.component';
describe('ConsoleCreatePreferencesHeaderComponent', () => {
  let component: ConsoleCreatePreferencesHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreatePreferencesHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreatePreferencesHeaderComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ConsoleCreatePreferencesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
