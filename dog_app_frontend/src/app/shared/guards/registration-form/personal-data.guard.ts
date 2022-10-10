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
export class PersonalDataGuard implements CanActivate {
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
    if (
      !this.registrationFormService.registrationFormData.get('personalData')!
        .invalid
    ) {
      return true;
    }
    return this.router.navigate(['/rejestracja']);
  }
}
