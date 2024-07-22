import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleQueuesHeaderComponent } from './console-queues-header.component';

describe('ConsoleQueuesHeaderComponent', () => {
  let component: ConsoleQueuesHeaderComponent;
  let fixture: ComponentFixture<ConsoleQueuesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleQueuesHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleQueuesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
