import { Component, OnInit } from '@angular/core';
import { DogService } from '../../../../shared/services/API/dog/dog.service';
import { DogProfile } from '../../../../shared/models/dogs/DogProfile';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dog-profile-list',
  templateUrl: './user-dog-profile-list.component.html',
  styleUrls: ['./user-dog-profile-list.component.scss'],
})
export class UserDogProfileListComponent implements OnInit {
  isContentLoading = false;
  isSignedIn = true;
  dogProfiles: DogProfile[];
  constructor(
    private dogService: DogService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isContentLoading = true;
    this.getDogProfiles();
    this.listenOnTriggerReloadEvent();
  }

  private getDogProfiles(): void {
    this.dogService.getUserDogProfiles().subscribe(this.processResults());
  }

  private processResults() {
    return (data: any) => {
      this.dogProfiles = data;
      this.isContentLoading = false;
    };
  }

  private listenOnTriggerReloadEvent(): void {
    this.dogService.getTriggerObservable().subscribe(() => {
      this.getDogProfiles();
    });
  }

  deleteDogProfile(dogProfile: DogProfile): void {
    this.confirmationService.confirm({
      message: `Czy chesz usunąć profil psa ${dogProfile.name}?`,
      header: 'Potwierdzenie',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.dogService.deleteDogProfile(dogProfile.id).subscribe({
          next: data => {
            if (!data.success) {
              this.toastService.showErrorMessage(
                'Wystąpił błąd podczas usuwania profilu psa.'
              );
            } else {
              this.toastService.showSuccessMessage(
                'Profil psa został usunięty'
              );
              this.getDogProfiles();
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
}
