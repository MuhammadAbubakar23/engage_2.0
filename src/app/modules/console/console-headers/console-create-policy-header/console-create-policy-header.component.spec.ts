import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCreatePolicyHeaderComponent } from './console-create-policy-header.component';

describe('ConsoleCreatePolicyHeaderComponent', () => {
  let component: ConsoleCreatePolicyHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreatePolicyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreatePolicyHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCreatePolicyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
