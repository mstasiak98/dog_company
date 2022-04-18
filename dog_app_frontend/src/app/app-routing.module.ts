import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {RegisterComponent} from "./components/register/register.component";
import {AccountInfoComponent} from "./components/register/account-info/account-info.component";
import {PersonalInfoComponent} from "./components/register/personal-info/personal-info.component";
import {AdditionalInfoComponent} from "./components/register/additional-info/additional-info.component";
import {AccountDataGuard} from "./shared/guards/registration-form/account-data.guard";
import {PersonalDataGuard} from "./shared/guards/registration-form/personal-data.guard";

const routes: Routes = [
  { path: 'root', component: AppComponent },
  {
    path: 'register',
    component: RegisterComponent,
    children: [
      { path: '', redirectTo: 'account_info', pathMatch: 'full' },
      { path: 'account_info', component: AccountInfoComponent },
      { path: 'personal_info', component: PersonalInfoComponent, canActivate: [AccountDataGuard]},
      { path: 'additional_info', component: AdditionalInfoComponent, canActivate: [AccountDataGuard, PersonalDataGuard]  },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
