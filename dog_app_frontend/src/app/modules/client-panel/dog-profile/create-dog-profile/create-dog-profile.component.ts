import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { data } from 'autoprefixer';
import { Trait } from '@angular/compiler-cli/src/ngtsc/transform';
import { Feature } from '../../../../shared/models/dogs/Feature';
import { Size } from '../../../../shared/models/dogs/Size';
import { Activity } from '../../../../shared/models/dogs/Activity';
import { Availability } from '../../../../shared/models/dogs/Availability';
import { Breed } from '../../../../shared/models/dogs/Breed';
import { DogService } from '../../../../shared/services/API/dog/dog.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dog-profile',
  templateUrl: './create-dog-profile.component.html',
  styleUrls: ['./create-dog-profile.component.scss'],
})
export class CreateDogProfileComponent implements OnInit {
  dogProfileForm: any;
  isContentLoading = false;

  features: Feature[];
  sizes: Size[];
  activities: Activity[];
  availabilities: Availability[];
  breeds: Breed[];
  photos: any[] = [];
  isEdit: boolean = false;

  constructor(
    private builder: FormBuilder,
    private dogService: DogService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dogService.getDogProfileFilters().subscribe(this.processFilters());

    this.dogProfileForm = this.builder.group({
      name: [null, Validators.required],
      color: [null, Validators.required],
      breed_id: [null, Validators.required],
      size_id: [null, Validators.required],
      activities: [null, Validators.required],
      availabilities: [null, Validators.required],
      features: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  private processFilters() {
    return (data: any) => {
      console.log('data = ', data);
      this.features = data.features;
      this.sizes = data.sizes;
      this.breeds = data.breeds;
      this.activities = data.activities;
      this.availabilities = data.availabilities;
    };
  }

  get f() {
    return this.dogProfileForm.controls;
  }

  saveProfile(): void {
    console.log('test = ', this.dogProfileForm.value);
    console.log('photo = ', this.photos);

    this.dogService
      .storeDogProfile(this.dogProfileForm.value, this.photos)
      .subscribe({
        next: result => {
          console.log('result = ', result);
          if (result.success) {
            this.router.navigate(['my-dog-profiles']);
          } else {
            this.router.navigate(['my-dog-profiles']).then(() => {
              this.toastService.showErrorMessage(
                'Wystąpił błąd poczas tworzenia profilu. Spróbuj ponownie.'
              );
            });
          }
        },
        error: error => {
          this.router.navigate(['my-dog-profiles']).then(() => {
            this.toastService.showErrorMessage(
              'Wystąpił błąd poczas tworzenia profilu. Spróbuj ponownie.'
            );
          });
        },
        complete: () => {
          this.dogProfileForm.reset();
        },
      });
  }

  handleCancelFile() {
    this.photos = [];
  }

  handleSelectFile(event: any) {
    console.log('event', event);
    Array.from(event.files).forEach(file => {
      this.photos.push(file);
    });
  }

  handleRemoveFile(event: any) {
    const idx = this.photos.findIndex(file => file.name === event.file.name);
    if (idx !== -1) {
      this.photos.splice(idx, 1);
    }
  }
}
