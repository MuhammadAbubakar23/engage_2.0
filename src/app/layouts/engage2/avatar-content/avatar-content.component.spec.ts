import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarContentComponent } from './avatar-content.component';

describe('AvatarContentComponent', () => {
  let component: AvatarContentComponent;
  let fixture: ComponentFixture<AvatarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
