import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { GuardianProfileViewComponent } from './guardian-profile-view/guardian-profile-view.component';

const routes: Routes = [
  { path: 'profile/:id', component: GuardianProfileViewComponent },
];

@NgModule({
  declarations: [UserComponent, GuardianProfileViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    ProgressSpinnerModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    PaginatorModule,
    ButtonModule,
    RippleModule,
    TooltipModule,
  ],
})
export class UserModule {}
