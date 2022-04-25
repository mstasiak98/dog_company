import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegistrationFormService} from "../../../shared/services/registration-form/registration-form.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {RegistrationData} from "../../../shared/models/RegistrationData";
import {UserState} from "../../../shared/models/UserState";
import {AuthStateService} from "../../../shared/services/auth-state/auth-state.service";
import {TokenService} from "../../../shared/services/token/token.service";

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdditionalInfoComponent implements OnInit {

  additionalData: any;
  imgUploaded = false;
  file: File;
  imgUrl:any;
  errors: any = null;

  registrationData: any;
  test:any;

  constructor(
    private registrationFormService: RegistrationFormService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authStateService: AuthStateService,
    private tokenService: TokenService
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
      if(this.imgUploaded){
        formData.append('photo', this.file);
      }
      formData.append('data', JSON.stringify(this.registrationData));

      this.authService.register(formData).subscribe({
        next: (result: any) =>{
          console.log('RESULT', result);
          if(result.success){
            this.tokenService.handleData(result.data.access_token);
            const userState: UserState = {authenticated: true, user: {userId: result.data.user_id, userName: result.data.name}};
            this.authStateService.setAuthState(userState);
            this.router.navigate(['/dashboard']);
          }else{
            this.errors = result.error;
          }
        },
        error: (error) => {},
        complete: () => {
          this.additionalData.reset();
          this.registrationFormService.registrationFormData.reset();
        }
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
      first_name: formGroupData.get('firstName')?.value,
      last_name: formGroupData.get('lastName')?.value,
      email: formGroupData.get('email')?.value,
      password: formGroupData.get('password')?.value,
      phone_number: formGroupData.get('phoneNo')?.value,
      city: formGroupData.get('personalData')!.get('city')?.value,
      zip_code: formGroupData.get('personalData')!.get('zipCode')?.value,
      street: formGroupData.get('personalData')!.get('street')?.value,
      house_number: formGroupData.get('personalData')!.get('houseNo')?.value,
      flat_number: formGroupData.get('personalData')!.get('flatNo')?.value,
      description: formGroupData.get('additionalData')!.get('info')?.value
    };
  }
}
