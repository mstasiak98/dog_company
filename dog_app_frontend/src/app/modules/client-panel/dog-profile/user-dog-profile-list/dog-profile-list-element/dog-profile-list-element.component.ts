import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DogProfile } from '../../../../../shared/models/dogs/DogProfile';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DogService } from '../../../../../shared/services/API/dog/dog.service';
import { ToastService } from '../../../../../shared/services/toast/toast.service';
import { Router } from '@angular/router';
import { ContextMenu } from 'primeng/contextmenu';
import { DialogService } from 'primeng/dynamicdialog';
import { AddPhotoDialogComponent } from '../../../../../shared/components/add-photo-dialog/add-photo-dialog.component';
import { InputSwitchComponent } from '../../../../../shared/components/input-switch/input-switch.component';
import { PhotoService } from '../../../../../shared/services/API/photo/photo.service';
import { PhotoEndpointsEnum } from '../../../../../shared/enums/photo-endpoints-enum';

@Component({
  selector: 'app-dog-profile-list-element',
  templateUrl: './dog-profile-list-element.component.html',
  styleUrls: ['./dog-profile-list-element.component.scss'],
})
export class DogProfileListElementComponent implements OnInit {
  @ViewChild('targetContextMenu') contextMenu: ContextMenu;
  @ViewChild('visibleSwitchElement') switchElement: InputSwitchComponent;
  @Input() dogProfile: DogProfile;
  checked: boolean;
  displayGallery: boolean = false;
  activeIndex: number = 0;
  items: MenuItem[];
  images: any[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private dogService: DogService,
    private toastService: ToastService,
    private router: Router,
    private dialogService: DialogService,
    private photoService: PhotoService
  ) {}

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

  ngOnInit(): void {
    this.checked = !!this.dogProfile.visible;
    this.initPhotos();
  }

  change(event: any) {
    this.displayGallery = !this.displayGallery;
  }

  private initPhotos(): void {
    this.dogProfile.photos.forEach(photo => {
      this.images.push({
        previewImageSrc: photo.url,
        thumbnailImageSrc: photo.url,
        alt: `Zdjęcie psa ${this.dogProfile.name}`,
        title: this.dogProfile.name,
        id: photo.id,
      });
    });
  }

  deleteDogProfile(): void {
    this.confirmationService.confirm({
      message: `Czy chesz usunąć profil psa ${this.dogProfile.name}?`,
      header: 'Potwierdzenie',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.dogService.deleteDogProfile(this.dogProfile.id).subscribe({
          next: data => {
            if (!data.success) {
              this.toastService.showErrorMessage(
                'Wystąpił błąd podczas usuwania profilu psa.'
              );
            } else {
              this.toastService.showSuccessMessage(
                'Profil psa został usunięty'
              );
              this.dogService.triggerDataReload();
            }
          },
          error: err => {
            this.toastService.showErrorMessage(
              'Wystąpił błąd podczas usuwania profilu psa.'
            );
          },
        });
      },
    });
  }

  changeProfileVisibility(event: any): void {
    this.dogService.changeVisibility(this.dogProfile.id, event).subscribe({
      next: resp => {},
      error: () => {
        this.checked = !!this.dogProfile.visible;
      },
    });
  }

  openImageUploadDialog(): void {
    const ref = this.dialogService.open(AddPhotoDialogComponent, {
      width: '40rem',
      height: '30rem',
      data: {
        id: this.dogProfile.id,
        isAnnouncementChangePhoto: false,
        photoEndpoint: PhotoEndpointsEnum.DOG_PROFILE_PHOTO,
      },
    });
  }
}
