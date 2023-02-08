import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegistrationFormService {
  registrationFormData: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationFormData = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNo: [
        '',
        [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{3}$/)],
      ],
      personalData: this.formBuilder.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        zipCode: [
          '',
          [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)],
        ],
        houseNo: ['', [Validators.required]],
        flatNo: [''],
      }),
      additionalData: this.formBuilder.group({
        file: [File],
        info: [''],
      }),
    });
  }

  getRegistrationData(): FormGroup {
    return this.registrationFormData;
  }

  resetData() {
    this.registrationFormData.reset();
  }
}
