import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenGalleryComponent } from './fullscreen-gallery.component';

describe('FullscreenGalleryComponent', () => {
  let component: FullscreenGalleryComponent;
  let fixture: ComponentFixture<FullscreenGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullscreenGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
