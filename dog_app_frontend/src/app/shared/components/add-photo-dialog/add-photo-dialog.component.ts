import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast/toast.service';
import { PhotoService } from '../../services/API/photo/photo.service';
import { finalize } from 'rxjs';
import { DogService } from '../../services/API/dog/dog.service';
import { PhotoEndpointsEnum } from '../../enums/photo-endpoints-enum';
import { AnnouncementService } from '../../services/API/announcement/announcement.service';
import { UsersService } from '../../services/API/users/users.service';

@Component({
  selector: 'app-add-photo-dialog',
  templateUrl: './add-photo-dialog.component.html',
  styleUrls: ['./add-photo-dialog.component.scss'],
})
export class AddPhotoDialogComponent implements OnInit {
  isLoading: boolean = false;
  file: File | null;
  modelId: number;
  isAnnouncementChangePhoto: boolean;
  photoId: number;
  photoEndpoint: PhotoEndpointsEnum;

  constructor(
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private toastService: ToastService,
    private photoService: PhotoService,
    private dogService: DogService,
    private announcementService: AnnouncementService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // change photo view for announcements
    if (this.config.data.isAnnouncementChangePhoto) {
      this.isAnnouncementChangePhoto =
        this.config.data.isAnnouncementChangePhoto;
      this.photoId = this.config.data.photoId;
    }
    // add new photo view for users and dog profiles
    else {
      this.modelId = this.config.data.id;
    }
    this.photoEndpoint = this.config.data.photoEndpoint;
  }

  addPhoto(event: any) {
    this.file = event;
  }

  unloadPhoto(event: any) {
    this.file = null;
  }

  save(): void {
    if (!this.file) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true;

    const requestObservable = this.isAnnouncementChangePhoto
      ? this.photoService.announcementChangePhoto(this.photoId, this.file)
      : this.photoService.uploadPhoto(
          Number(this.modelId),
          this.file,
          this.photoEndpoint
        );

    requestObservable
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: res => {
          if (res.success) {
            this.toastService.showSuccessMessage(
              `Zdjęcie zostało ${
                this.isAnnouncementChangePhoto ? 'zmienione' : 'dodane'
              }.`
            );

            if (this.isAnnouncementChangePhoto) {
              this.announcementService.triggerDataReload();
            } else if (
              this.photoEndpoint === PhotoEndpointsEnum.DOG_PROFILE_PHOTO
            ) {
              this.dogService.triggerDataReload();
            } else if (this.photoEndpoint === PhotoEndpointsEnum.USER_PHOTO) {
              this.usersService.triggerAccountDataReload();
            }
          }
          this.ref.close();
        },
        error: err => {
          this.toastService.showErrorMessage(
            `Wystąpił błąd podczas ${
              this.isAnnouncementChangePhoto ? 'zmieniania' : 'dodawania'
            } zdjęcia`
          );
        },
      });
  }
}
