import { Component, OnInit } from '@angular/core';
import { RegistrationFormService } from '../../../shared/services/registration-form/registration-form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorUtils } from '../../../shared/util/validator.utils';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  submitted: boolean = false;
  disabled = false;
  accountData: any;
  constructor(
    private registrationFormService: RegistrationFormService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountData = this.formBuilder.group({
      firstName: ['', [Validators.required, ValidatorUtils.notOnlyWhitespace]],
      lastName: ['', [Validators.required, ValidatorUtils.notOnlyWhitespace]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNo: [
        '',
        [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{3}$/)],
      ],
    });

    this.accountData.patchValue(
      this.registrationFormService.registrationFormData.value
    );
  }

  nextPage() {
    if (this.accountData.valid && !this.accountData.errors) {
      this.registrationFormService.registrationFormData.patchValue(
        this.accountData.value,
        { emitEvent: false, onlySelf: true }
      );
      this.router.navigate(['rejestracja/dane_profilowe']);
    }
    this.submitted = true;
  }

  get f() {
    return this.accountData.controls;
  }
}
