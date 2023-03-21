import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportChannelsHeaderComponent } from './support-channels-header.component';

describe('SupportChannelsHeaderComponent', () => {
  let component: SupportChannelsHeaderComponent;
  let fixture: ComponentFixture<SupportChannelsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportChannelsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportChannelsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
