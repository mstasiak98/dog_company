import { Component, OnInit } from '@angular/core';
import { RegistrationFormService } from '../../../shared/services/registration-form/registration-form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      phoneNo: ['', [Validators.required]],
    });

    this.accountData.patchValue(
      this.registrationFormService.registrationFormData.value
    );
  }

  nextPage() {
    console.log('DANE PO ZATWIERDZENIU= ', this.accountData.value);
    if (this.accountData.valid && !this.accountData.errors) {
      this.registrationFormService.registrationFormData.patchValue(
        this.accountData.value,
        { emitEvent: false, onlySelf: true }
      );
      this.router.navigate(['register/personal_info']);
    }
    this.submitted = true;
  }

  get f() {
    return this.accountData.controls;
  }
}
