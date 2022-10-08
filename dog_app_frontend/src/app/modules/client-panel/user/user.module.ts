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
import { InputTextModule } from 'primeng/inputtext';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { InputMaskModule } from 'primeng/inputmask';
import { AccountFormComponent } from './account-form/account-form.component';
import { TabViewModule } from 'primeng/tabview';
import { UserPhotosComponent } from './user-photos/user-photos.component';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const routes: Routes = [
  { path: 'profile/:id', component: GuardianProfileViewComponent },
  { path: '', component: UserComponent },
];

@NgModule({
  declarations: [
    UserComponent,
    GuardianProfileViewComponent,
    ProfileFormComponent,
    AccountFormComponent,
    UserPhotosComponent,
  ],
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
    InputTextModule,
    InputMaskModule,
    TabViewModule,
    GalleriaModule,
    InputTextareaModule,
    ConfirmDialogModule,
  ],
})
export class UserModule {}
