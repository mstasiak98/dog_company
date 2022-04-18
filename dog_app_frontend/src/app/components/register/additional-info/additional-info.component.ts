import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegistrationFormService} from "../../../shared/services/registration-form/registration-form.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {RegistrationData} from "../../../shared/models/RegistrationData";

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdditionalInfoComponent implements OnInit {

  additionalData: any;
  fileName = '';
  imgUploaded = false;
  file: File;
  imgUrl:any;

  registrationData: any;
  test:any;

  constructor(
    private registrationFormService: RegistrationFormService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.additionalData = this.formBuilder.group({
      info: [''],
      file: [''],
    });

    this.additionalData.get("info").patchValue( this.registrationFormService.registrationFormData.get("additionalData")?.get("info")?.value);

    this.registrationData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNo: '',
        city: '',
        street: '',
        zipCode: '',
        houseNo: '',
        flatNo: '',
        info: '',
    }
  }


  previousPage(){
    this.registrationFormService.registrationFormData.get("additionalData")?.patchValue(this.additionalData.value, {emitEvent: false, onlySelf: true});
    this.router.navigate(['/register/personal_info']);
  }

  save(){
    this.registrationFormService.registrationFormData.get('additionalData')?.patchValue(this.additionalData.value);
    if(
      this.registrationFormService.registrationFormData.valid
      &&
      !this.registrationFormService.registrationFormData.errors)
    {
      this.setFormDataToSend();
      console.log('DANE OSTATECZNE OSTATECZNE = ', this.registrationData)

      let formData = new FormData();
      formData.append('data', JSON.stringify(this.registrationData));
      formData.append('photo', this.file);

      this.authService.register(formData).subscribe(res => {
        console.log('ODPOWIEDZ = ', res);
      })
    }
  }

  onChange(event: any){
    const files = event.target.files;
    if(FileReader && files && files.length > 0){
      this.file=files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (_event) => {
        this.imgUrl = reader.result;
        this.imgUploaded = true;
      }
    }else{
      this.imgUploaded = false;
    }
  }

  unloadPhoto(){
    this.imgUrl = null;
    this.imgUploaded = false;
  }

  setFormDataToSend(){
    const formGroupData = this.registrationFormService.registrationFormData;
    this.registrationData = {
      firstName: formGroupData.get('firstName')?.value,
      lastName: formGroupData.get('lastName')?.value,
      email: formGroupData.get('email')?.value,
      password: formGroupData.get('password')?.value,
      phoneNo: formGroupData.get('phoneNo')?.value,
      city: formGroupData.get('personalData')!.get('city')?.value,
      zipCode: formGroupData.get('personalData')!.get('zipCode')?.value,
      street: formGroupData.get('personalData')!.get('street')?.value,
      houseNo: formGroupData.get('personalData')!.get('houseNo')?.value,
      flatNo: formGroupData.get('personalData')!.get('flatNo')?.value,
      info: formGroupData.get('additionalData')!.get('info')?.value
    };
  }
}
