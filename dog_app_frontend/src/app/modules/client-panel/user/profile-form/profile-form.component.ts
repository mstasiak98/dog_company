import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAccountFullDetails } from '../../../../shared/models/users/UserAccountFullDetails';
import { UsersService } from '../../../../shared/services/API/users/users.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { ValidatorUtils } from '../../../../shared/util/validator.utils';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  profileForm: any;
  isSaving: boolean = false;
  @Input() userDetails: UserAccountFullDetails;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.profileForm = this.formBuilder.group({
      first_name: [
        this.userDetails.first_name,
        [Validators.required, ValidatorUtils.notOnlyWhitespace],
      ],
      last_name: [
        this.userDetails.last_name,
        [Validators.required, ValidatorUtils.notOnlyWhitespace],
      ],
      phone_number: [this.userDetails.phone_number, [Validators.required]],
      city: [
        this.userDetails.city,
        [Validators.required, ValidatorUtils.notOnlyWhitespace],
      ],
      street: [
        this.userDetails.street,
        [Validators.required, ValidatorUtils.notOnlyWhitespace],
      ],
      zip_code: [
        this.userDetails.zip_code,
        [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)],
      ],
      house_number: [
        this.userDetails.house_number,
        [Validators.required, ValidatorUtils.notOnlyWhitespace],
      ],
      flat_number: [this.userDetails.flat_number],
      description: [this.userDetails.description],
    });
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.profileForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  update(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isSaving = true;
    this.usersService.updateUserAccount(this.profileForm.value).subscribe({
      next: (resp: any) => {
        this.toastService.showSuccessMessage(
          'Dane profilowe zostały zmienione'
        );
        this.isSaving = false;
      },
      error: (err: any) => {
        this.toastService.showErrorMessage(
          'Wystąpił błąd podczas aktualizacji danych profilowych'
        );
        this.isSaving = false;
      },
    });
  }

  get f() {
    return this.profileForm.controls;
  }
}
