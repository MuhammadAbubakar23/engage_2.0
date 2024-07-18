import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQueuesComponent } from './create-queues.component';

describe('CreateQueuesComponent', () => {
  let component: CreateQueuesComponent;
  let fixture: ComponentFixture<CreateQueuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQueuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
