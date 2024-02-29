import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringHeaderComponent } from './monitoring-header.component';

describe('MonitoringHeaderComponent', () => {
  let component: MonitoringHeaderComponent;
  let fixture: ComponentFixture<MonitoringHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
