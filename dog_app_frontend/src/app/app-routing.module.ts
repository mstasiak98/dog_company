import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { AccountInfoComponent } from './components/register/account-info/account-info.component';
import { PersonalInfoComponent } from './components/register/personal-info/personal-info.component';
import { AdditionalInfoComponent } from './components/register/additional-info/additional-info.component';
import { AccountDataGuard } from './shared/guards/registration-form/account-data.guard';
import { PersonalDataGuard } from './shared/guards/registration-form/personal-data.guard';
import { LoginComponent } from './components/login/login.component';
import { NotLoggedGuard } from './shared/guards/not-logged.guard';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { NotAuthorizedPageComponent } from './core/components/not-authorized-page/not-authorized-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then(m => m.LandingModule),
  },

  {
    path: 'aplikacja',
    loadChildren: () =>
      import('./modules/client-panel/client-panel.module').then(
        m => m.ClientPanelModule
      ),
  },

  {
    path: 'logowanie',
    component: LoginComponent,
    canActivate: [NotLoggedGuard],
  },

  {
    path: 'rejestracja',
    component: RegisterComponent,
    canActivate: [NotLoggedGuard],
    children: [
      { path: '', redirectTo: 'dane_konta', pathMatch: 'full' },
      { path: 'dane_konta', component: AccountInfoComponent },
      {
        path: 'dane_profilowe',
        component: PersonalInfoComponent,
        canActivate: [AccountDataGuard],
      },
      {
        path: 'dodatkowe_informacje',
        component: AdditionalInfoComponent,
        canActivate: [AccountDataGuard, PersonalDataGuard],
      },
    ],
  },

  {
    path: 'nie-znaleziono',
    component: NotFoundPageComponent,
  },

  {
    path: 'brak-autoryzacji',
    component: NotAuthorizedPageComponent,
  },

  {
    path: '**',
    redirectTo: 'nie-znaleziono',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
