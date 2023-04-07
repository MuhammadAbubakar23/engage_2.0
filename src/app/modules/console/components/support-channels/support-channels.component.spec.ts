import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportChannelsComponent } from './support-channels.component';

describe('SupportChannelsComponent', () => {
  let component: SupportChannelsComponent;
  let fixture: ComponentFixture<SupportChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportChannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
