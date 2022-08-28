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

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/client-panel/client-panel.module').then(
        m => m.ClientPanelModule
      ),
  },

  { path: 'login', component: LoginComponent, canActivate: [NotLoggedGuard] },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedGuard],
    children: [
      { path: '', redirectTo: 'account_info', pathMatch: 'full' },
      { path: 'account_info', component: AccountInfoComponent },
      {
        path: 'personal_info',
        component: PersonalInfoComponent,
        canActivate: [AccountDataGuard],
      },
      {
        path: 'additional_info',
        component: AdditionalInfoComponent,
        canActivate: [AccountDataGuard, PersonalDataGuard],
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
