import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCreateQueuesHeaderComponent } from './console-create-queues-header.component';

describe('ConsoleCreateQueuesHeaderComponent', () => {
  let component: ConsoleCreateQueuesHeaderComponent;
  let fixture: ComponentFixture<ConsoleCreateQueuesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCreateQueuesHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleCreateQueuesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
