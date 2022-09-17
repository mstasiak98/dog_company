import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogProfileComponent } from './dog-profile/dog-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UserDogProfileListComponent } from './user-dog-profile-list/user-dog-profile-list.component';
import { DogProfilesDashboardComponent } from './dog-profiles-dashboard/dog-profiles-dashboard.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { CreateDogProfileComponent } from './create-dog-profile/create-dog-profile.component';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DogProfileListElementComponent } from './user-dog-profile-list/dog-profile-list-element/dog-profile-list-element.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ContextMenuModule } from 'primeng/contextmenu';

const routes: Routes = [
  { path: 'edit-dog-profile/:id', component: CreateDogProfileComponent },
  { path: 'dog-profiles', component: DogProfilesDashboardComponent },
  { path: 'dog-profile/:id', component: DogProfileComponent },
  { path: 'my-dog-profiles', component: UserDogProfileListComponent },
  { path: 'add-dog-profile', component: CreateDogProfileComponent },
  { path: '', redirectTo: 'dog-profiles', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    DogProfileComponent,
    UserDogProfileListComponent,
    DogProfilesDashboardComponent,
    CreateDogProfileComponent,
    DogProfileListElementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    GalleriaModule,
    CarouselModule,
    ImageModule,
    CheckboxModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
    FormsModule,
    RadioButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextareaModule,
    MultiSelectModule,
    PaginatorModule,
    DividerModule,
    RippleModule,
    TooltipModule,
    InputTextModule,
    FileUploadModule,
    ConfirmDialogModule,
    InputSwitchModule,
    ContextMenuModule,
  ],
  providers: [],
})
export class DogProfileModule {}
