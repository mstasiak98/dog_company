import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationFormService } from '../../services/registration-form/registration-form.service';

@Injectable({
  providedIn: 'root',
})
export class AccountDataGuard implements CanActivate {
  constructor(
    private router: Router,
    private registrationFormService: RegistrationFormService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const formData = this.registrationFormService.registrationFormData;
    if (
      !(
        formData.get('firstName')!.invalid &&
        formData.get('lastName')!.invalid &&
        formData.get('email')!.invalid &&
        formData.get('password')!.invalid &&
        formData.get('phoneNo')!.invalid
      )
    ) {
      return true;
    }
    return this.router.navigate(['/rejestracja']);
  }
}
