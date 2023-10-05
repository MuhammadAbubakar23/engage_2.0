import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRowDataComponent } from './social-raw-data.component';

describe('SocialRowDataComponent', () => {
  let component: SocialRowDataComponent;
  let fixture: ComponentFixture<SocialRowDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRowDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
