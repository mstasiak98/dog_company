import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogProfileComponent } from './dog-profile/dog-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProposalDialogComponent } from './proposal-dialog/proposal-dialog.component';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

const routes: Routes = [{ path: '', component: DogProfileComponent }];

@NgModule({
  declarations: [DogProfileComponent, ProposalDialogComponent],
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
  ],
  providers: [],
})
export class DogProfileModule {}
