import { Component, Input, OnInit } from '@angular/core';
import { AddPhotoDialogComponent } from '../../../../shared/components/add-photo-dialog/add-photo-dialog.component';
import { PhotoEndpointsEnum } from '../../../../shared/enums/photo-endpoints-enum';
import { DialogService } from 'primeng/dynamicdialog';
import { UserAccountFullDetails } from '../../../../shared/models/users/UserAccountFullDetails';
import PhotoHelper from '../../../../shared/helpers/PhotoHelper';
import { PhotoService } from '../../../../shared/services/API/photo/photo.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { ConfirmationService } from 'primeng/api';
import { UsersService } from '../../../../shared/services/API/users/users.service';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.scss'],
})
export class UserPhotosComponent implements OnInit {
  @Input() userDetails: UserAccountFullDetails;
  displayCustom: boolean;
  activeIndex: number = 0;
  responsiveOptions: any[] = [];

  images: any = [];

  constructor(
    private dialogService: DialogService,
    private photoService: PhotoService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.initPhotos();
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  private initPhotos(): void {
    this.responsiveOptions = PhotoHelper.getGalleryResponsiveOptions();
    this.images = PhotoHelper.getImagesArrayFromPhoto(this.userDetails.photos);
  }

  addPhoto(): void {
    const ref = this.dialogService.open(AddPhotoDialogComponent, {
      width: '40rem',
      data: {
        id: this.userDetails.id,
        isAnnouncementChangePhoto: false,
        photoEndpoint: PhotoEndpointsEnum.USER_PHOTO,
      },
    });
  }

  deletePhoto(photoId: number): void {
    this.confirmationService.confirm({
      message: 'Czy chcesz usunąć zdjęcie?',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.photoService.deletePhoto(photoId).subscribe({
          next: (resp: any) => {
            this.userService.triggerAccountDataReload();
            this.toastService.showSuccessMessage('Zdjęcie zostało usunięte');
          },
          error: (err: any) => {
            this.toastService.showErrorMessage(
              'Wystąpił błąd podczas usuwania zdjęcia'
            );
          },
        });
      },
    });
  }
}
