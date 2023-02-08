import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PhotoService } from '../../services/API/photo/photo.service';
import { ToastService } from '../../services/toast/toast.service';
import { DogService } from '../../services/API/dog/dog.service';
import { UsersService } from '../../services/API/users/users.service';
import { ContextMenu } from 'primeng/contextmenu';

@Component({
  selector: 'app-fullscreen-gallery',
  templateUrl: './fullscreen-gallery.component.html',
  styleUrls: ['./fullscreen-gallery.component.scss'],
})
export class FullscreenGalleryComponent implements OnInit {
  @ViewChild('targetContextMenu') contextMenu: ContextMenu;
  @ViewChild('.p-galleria-close') closeGallery: ElementRef<HTMLElement>;
  @Input() photos: any[] = [];
  @Input() displayGallery: boolean;
  @Output() displayGalleryChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  items: MenuItem[];
  images: any[] = [];

  responsiveOptions: any[] = [
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

  constructor(
    private photoService: PhotoService,
    private toastService: ToastService,
    private dogService: DogService,
    private userService: UsersService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.initPhotos();
  }

  ngOnChanges(change: SimpleChanges): void {
    if (change.displayGallery.currentValue === true) {
      this.initListener();
    }
  }

  private initListener(): void {
    setTimeout(() => {
      const button =
        this.elementRef.nativeElement.querySelector('.p-galleria-close');
      this.renderer.listen(button, 'click', () => {
        this.displayGallery = !this.displayGallery;
        this.displayGalleryChange.emit(this.displayGallery);
      });
    }, 5000);
  }

  private initPhotos(): void {
    this.photos.forEach(photo => {
      this.images.push({
        previewImageSrc: photo.url,
        thumbnailImageSrc: photo.url,
        id: photo.id,
      });
    });
  }

  onContextMenu(event: any, data: any) {
    if (this.contextMenu) {
      this.items = [
        {
          label: 'Usuń',
          command: event => this.doAction(data),
        },
      ];
      this.contextMenu.show(event);
      event.stopPropagation();
    }
  }

  doAction(data: any) {
    this.photoService.deletePhoto(data.id).subscribe({
      next: resp => {
        this.toastService.showSuccessMessage('Zdjęcie zostało usunięte');
        this.displayGallery = false;
        this.dogService.triggerDataReload();
      },
      error: () => {
        this.toastService.showErrorMessage(
          'Wystąpił błąd podczas usuwania zdjęcia'
        );
      },
    });
  }
}
