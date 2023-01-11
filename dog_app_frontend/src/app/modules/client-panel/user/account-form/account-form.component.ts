import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAccountFullDetails } from '../../../../shared/models/users/UserAccountFullDetails';
import { UsersService } from '../../../../shared/services/API/users/users.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { ValidatorUtils } from '../../../../shared/util/validator.utils';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  accountForm: any;
  @Input() userDetails: UserAccountFullDetails;
  isSaving: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.accountForm = this.formBuilder.group({
      email: [this.userDetails.email, Validators.required],
      old_password: [
        null,
        [Validators.required, ValidatorUtils.notOnlyWhitespace],
      ],
      new_password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          ValidatorUtils.notOnlyWhitespace,
        ],
      ],
    });
  }

  changePassword(): void {
    if (this.accountForm.invalid) return;
    this.isSaving = true;
    this.usersService.changePassword(this.accountForm.value).subscribe({
      next: (resp: any) => {
        this.toastService.showSuccessMessage('Hasło zostało zmienione');
        this.isSaving = false;
      },
      error: err => {
        this.toastService.showErrorMessage(
          'Wystąpił błąd podczas zmiany hasła'
        );
        this.isSaving = false;
      },
    });
  }

  get f() {
    return this.accountForm.controls;
  }
}
