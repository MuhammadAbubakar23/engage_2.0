import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsContentComponent } from './logs-content.component';

describe('LogsContentComponent', () => {
  let component: LogsContentComponent;
  let fixture: ComponentFixture<LogsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsContentComponent]
    });
    fixture = TestBed.createComponent(LogsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
