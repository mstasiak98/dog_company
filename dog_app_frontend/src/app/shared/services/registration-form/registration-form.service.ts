import { Injectable } from '@angular/core';
import {RegistrationData} from "../../models/RegistrationData";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {

  registrationFormData: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationFormData = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      phoneNo: ['', [Validators.required]],
      personalData: this.formBuilder.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        houseNo: ['', [Validators.required]],
        flatNo: [''],
      }),
      additionalData: this.formBuilder.group({
        file: [File],
        info: [''],
      })
    });
  }

  getRegistrationData(): FormGroup{
    return this.registrationFormData;
  }

  resetData(){
    this.registrationFormData.reset();
  }
}
