import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSwitchComponent } from './components/input-switch/input-switch.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullscreenGalleryComponent } from './components/fullscreen-gallery/fullscreen-gallery.component';
import { GalleriaModule } from 'primeng/galleria';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CreateMessageDialogComponent } from './components/create-message-dialog/create-message-dialog.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MapComponent } from './components/map/map.component';
import { GMapModule } from 'primeng/gmap';
import { SignInButtonComponent } from './components/sign-in-button/sign-in-button.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    InputSwitchComponent,
    FullscreenGalleryComponent,
    CreateMessageDialogComponent,
    MapComponent,
    SignInButtonComponent,
  ],
  imports: [
    CommonModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    GalleriaModule,
    ContextMenuModule,
    InputTextareaModule,
    InputTextModule,
    GMapModule,
    ButtonModule,
  ],
  exports: [
    InputSwitchComponent,
    FullscreenGalleryComponent,
    MapComponent,
    SignInButtonComponent,
  ],
})
export class SharedModule {}
