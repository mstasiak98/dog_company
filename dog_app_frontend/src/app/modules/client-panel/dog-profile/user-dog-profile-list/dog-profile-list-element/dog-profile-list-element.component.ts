import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DogProfile } from '../../../../../shared/models/dogs/DogProfile';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DogService } from '../../../../../shared/services/API/dog/dog.service';
import { ToastService } from '../../../../../shared/services/toast/toast.service';
import { Router } from '@angular/router';
import { ContextMenu } from 'primeng/contextmenu';
import { MakeProposalDialogComponent } from '../../../../../shared/components/make-proposal-dialog/make-proposal-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AddPhotoDialogComponent } from '../../../../../core/components/add-photo-dialog/add-photo-dialog.component';
import { InputSwitch } from 'primeng/inputswitch';

@Component({
  selector: 'app-dog-profile-list-element',
  templateUrl: './dog-profile-list-element.component.html',
  styleUrls: ['./dog-profile-list-element.component.scss'],
})
export class DogProfileListElementComponent implements OnInit {
  @ViewChild('targetContextMenu') contextMenu: ContextMenu;
  @Input() dogProfile: DogProfile;
  checked: boolean = true;
  displayBasic2: boolean;
  activeIndex: number = 0;
  items: MenuItem[];
  images: any[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private dogService: DogService,
    private toastService: ToastService,
    private router: Router,
    private dialogService: DialogService
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
    console.log('do action =', data);
  }

  ngOnInit(): void {
    console.log('dog = ', this.dogProfile.photos);

    this.initPhotos();
    this.checked = this.dogProfile.visible;
    console.log('checked = ', this.checked);
  }

  private initPhotos(): void {
    this.dogProfile.photos.forEach(photo => {
      this.images.push({
        previewImageSrc: photo.url,
        thumbnailImageSrc: photo.url,
        alt: `Zdjęcie psa ${this.dogProfile.name}`,
        title: this.dogProfile.name,
      });
    });
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayBasic2 = true;
  }

  deleteDogProfile(): void {
    console.log('event = ', event);
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
            console.log('error ', err);
            this.toastService.showSuccessMessage(
              'Wystąpił błąd podczas usuwania profilu psa.'
            );
            this.router.navigate(['my-dog-profiles']);
          },
          complete: () => {
            this.router.navigate(['my-dog-profiles']);
          },
        });
      },
    });
  }

  changeProfileVisibility(event: any): void {
    console.log('ev = ', event);
    console.log('dog id ', this.dogProfile.id);
    this.dogService
      .changeVisibility(this.dogProfile.id, event.checked)
      .subscribe({
        next: resp => {
          console.log('res- = ', resp);
        },
        error: () => {
          this.checked = this.dogProfile.visible;
        },
      });
  }

  openImageUploadDialog(): void {
    const ref = this.dialogService.open(AddPhotoDialogComponent, {
      width: '40rem',
      height: '30rem',
      data: {
        dogProfileId: this.dogProfile.id,
      },
    });
  }
}
