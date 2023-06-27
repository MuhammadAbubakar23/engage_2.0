import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleQuickResponseHeaderComponent } from './console-quick-response-header.component';

describe('ConsoleQuickResponseHeaderComponent', () => {
  let component: ConsoleQuickResponseHeaderComponent;
  let fixture: ComponentFixture<ConsoleQuickResponseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleQuickResponseHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleQuickResponseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
