import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPreviewUploadComponent } from './img-preview-upload.component';

describe('ImgPreviewUploadComponent', () => {
  let component: ImgPreviewUploadComponent;
  let fixture: ComponentFixture<ImgPreviewUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgPreviewUploadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgPreviewUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
