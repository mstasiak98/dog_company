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

@NgModule({
  declarations: [
    InputSwitchComponent,
    FullscreenGalleryComponent,
    CreateMessageDialogComponent,
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
  ],
  exports: [InputSwitchComponent, FullscreenGalleryComponent],
})
export class SharedModule {}
