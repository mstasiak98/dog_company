import { Component, OnInit } from '@angular/core';
import { RegistrationFormService } from '../../../shared/services/registration-form/registration-form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorUtils } from '../../../shared/util/validator.utils';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  personalData: any;
  submitted: boolean = false;

  constructor(
    private registrationFormService: RegistrationFormService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(
      'DANE Z NOWEGO KOMPONENTU',
      this.registrationFormService.registrationFormData.value
    );
    this.personalData = this.formBuilder.group({
      city: ['', [Validators.required, ValidatorUtils.notOnlyWhitespace]],
      street: ['', [Validators.required, ValidatorUtils.notOnlyWhitespace]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]],
      houseNo: ['', [Validators.required, ValidatorUtils.notOnlyWhitespace]],
      flatNo: [''],
    });

    this.personalData.patchValue(
      this.registrationFormService.registrationFormData.get('personalData')
        ?.value
    );
  }

  get f() {
    return this.personalData.controls;
  }

  nextPage() {
    console.log('DANE PO ZATWIERDZENIU= ', this.personalData.value);
    if (this.personalData.valid && !this.personalData.errors) {
      this.registrationFormService.registrationFormData
        .get('personalData')
        ?.patchValue(this.personalData.value);
      console.log(
        'DANE PO NOWYM ZATWIERDZENIU',
        this.registrationFormService.registrationFormData.value
      );
      this.router.navigate(['rejestracja/dodatkowe_informacje']);
    }
    this.submitted = true;
  }

  previousPage() {
    this.registrationFormService.registrationFormData
      .get('personalData')
      ?.patchValue(this.personalData.value, {
        emitEvent: false,
        onlySelf: true,
      });
    this.router.navigate(['rejestracja']);
  }
}
