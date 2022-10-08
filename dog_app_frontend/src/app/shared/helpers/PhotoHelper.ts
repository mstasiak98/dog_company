import { Photo } from '../models/Photo';

export default class PhotoHelper {
  static getImagesArrayFromPhoto(photos: Photo[]): any[] {
    let images: any[] = [];
    photos.forEach(photo => {
      images.push({
        previewImageSrc: photo.url,
        thumbnailImageSrc: photo.url,
        id: photo.id,
      });
    });
    return images;
  }

  static getGalleryResponsiveOptions(): any[] {
    return [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }
}
