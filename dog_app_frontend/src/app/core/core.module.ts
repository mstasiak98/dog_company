import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuModule } from 'primeng/menu';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { HeaderComponent } from './components/header/header.component';
import { ImgPreviewUploadComponent } from './components/img-preview-upload/img-preview-upload.component';
import { FormsModule } from '@angular/forms';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { GalleriaModule } from 'primeng/galleria';
import { AddPhotoDialogComponent } from './components/add-photo-dialog/add-photo-dialog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ClickOutsideDirective,
    HeaderComponent,
    ImgPreviewUploadComponent,
    ClickStopPropagationDirective,
    AddPhotoDialogComponent,
  ],
  exports: [
    NavbarComponent,
    ClickOutsideDirective,
    HeaderComponent,
    ImgPreviewUploadComponent,
    ClickStopPropagationDirective,
  ],
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    RippleModule,
    DividerModule,
    FormsModule,
    GalleriaModule,
  ],
})
export class CoreModule {}
