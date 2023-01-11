import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Feature } from '../../../../shared/models/dogs/Feature';
import { Size } from '../../../../shared/models/dogs/Size';
import { Activity } from '../../../../shared/models/dogs/Activity';
import { Availability } from '../../../../shared/models/dogs/Availability';
import { Breed } from '../../../../shared/models/dogs/Breed';
import { DogService } from '../../../../shared/services/API/dog/dog.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DogProfile } from '../../../../shared/models/dogs/DogProfile';
import { ValidatorUtils } from '../../../../shared/util/validator.utils';

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
  isRequestSending: boolean = false;

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
      name: [null, [Validators.required, ValidatorUtils.notOnlyWhitespace]],
      color: [null, [Validators.required, ValidatorUtils.notOnlyWhitespace]],
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
    if (this.router.url.includes('edytuj')) {
      this.isEdit = true;
      this.route.params.subscribe(parameter => {
        this.dogService.getDogProfileEditData(parameter.id).subscribe({
          next: data => {
            this.dogProfile = data.dog;
            this.setFormEditData();
          },
          error: err => {
            this.router.navigate([`/aplikacja/moje-psy`]);
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
    let dogProfile;
    if (this.isEdit) {
      dogProfile = {
        ...this.dogProfileForm.value,
        id: this.dogProfile.id,
      };
    } else {
      dogProfile = this.dogProfileForm.value;
    }

    let request = !this.isEdit
      ? this.dogService.storeDogProfile(dogProfile, this.photos)
      : this.dogService.updateDogProfile(dogProfile);

    this.isRequestSending = true;
    request.subscribe({
      next: result => {
        this.isRequestSending = false;
        if (result.success) {
          this.router.navigate(['/aplikacja/moje-psy']);
        }
      },
      error: error => {
        this.isRequestSending = false;
        this.router.navigate(['/aplikacja/moje-psy']).then(() => {
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
