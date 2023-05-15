import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCaseManagementHeaderComponent } from './console-case-management-header.component';

describe('ConsoleCaseManagementHeaderComponent', () => {
  let component: ConsoleCaseManagementHeaderComponent;
  let fixture: ComponentFixture<ConsoleCaseManagementHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCaseManagementHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCaseManagementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
