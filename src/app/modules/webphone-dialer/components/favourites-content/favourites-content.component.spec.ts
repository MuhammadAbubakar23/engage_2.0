import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesContentComponent } from './favourites-content.component';

describe('FavouritesContentComponent', () => {
  let component: FavouritesContentComponent;
  let fixture: ComponentFixture<FavouritesContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouritesContentComponent]
    });
    fixture = TestBed.createComponent(FavouritesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
