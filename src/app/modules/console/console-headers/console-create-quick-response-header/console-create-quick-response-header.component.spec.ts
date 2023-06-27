import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCreateQuickResponseHeaderComponent } from './console-create-quick-response-header.component';

describe('ConsoleCreateQuickResponseHeaderComponent', () => {
  let component: ConsoleCreateQuickResponseHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateQuickResponseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateQuickResponseHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleCreateQuickResponseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
