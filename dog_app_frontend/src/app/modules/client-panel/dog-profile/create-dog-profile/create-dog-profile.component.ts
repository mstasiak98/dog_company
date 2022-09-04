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
import { ActivatedRoute, Router } from '@angular/router';
import { DogProfile } from '../../../../shared/models/dogs/DogProfile';

@Component({
  selector: 'app-create-dog-profile',
  templateUrl: './create-dog-profile.component.html',
  styleUrls: ['./create-dog-profile.component.scss'],
})
export class CreateDogProfileComponent implements OnInit {
  dogProfileForm: any;
  isContentLoading = false;
  dogProfile: DogProfile;

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dogService.getDogProfileFilters().subscribe(this.processFilters());

    this.isContentLoading = true;
    this.retrieveExistingProfileData();

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

      this.isContentLoading = false;
    };
  }

  private retrieveExistingProfileData(): void {
    if (this.router.url.includes('edit')) {
      this.isEdit = true;
      this.route.params.subscribe(parameter => {
        this.dogService.getDogProfileDetails(parameter.id).subscribe({
          next: data => {
            this.dogProfile = data.dog;
            console.log('profil = ', this.dogProfile);

            this.setFormEditData();
            console.log(
              'ustawiona data do edycji = ',
              this.dogProfileForm.value
            );
          },
          error: err => {
            this.router.navigate([`my-dog-profiles`]);
          },
          complete: () => {
            this.isContentLoading = false;
          },
        });
      });
    }
  }

  private setFormEditData(): void {
    let dogProfile = {
      name: this.dogProfile.name,
      color: this.dogProfile.color,
      breed_id: this.dogProfile.breed.id,
      size_id: this.dogProfile.size.id,
      activities: this.dogProfile.activity.map(value => value.id),
      availabilities: this.dogProfile.availability.map(value => value.id),
      features: this.dogProfile.feature.map(value => value.id),
      description: this.dogProfile.description,
    };

    this.dogProfileForm.setValue(dogProfile);
  }

  get f() {
    return this.dogProfileForm.controls;
  }

  saveProfile(): void {
    console.log('test = ', this.dogProfileForm.value);
    console.log('photo = ', this.photos);

    let dogProfile;
    if (this.isEdit) {
      console.log('jest edit wartosc przed = ', this.dogProfileForm.value);
      dogProfile = {
        ...this.dogProfileForm.value,
        id: this.dogProfile.id,
      };
    } else {
      dogProfile = this.dogProfileForm.value;
    }
    console.log('wysylam, = ', dogProfile);
    let request = !this.isEdit
      ? this.dogService.storeDogProfile(dogProfile, this.photos)
      : this.dogService.updateDogProfile(dogProfile);

    request.subscribe({
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
