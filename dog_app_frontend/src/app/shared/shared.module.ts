import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSwitchComponent } from './components/input-switch/input-switch.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullscreenGalleryComponent } from './components/fullscreen-gallery/fullscreen-gallery.component';
import { GalleriaModule } from 'primeng/galleria';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
  declarations: [InputSwitchComponent, FullscreenGalleryComponent],
  imports: [
    CommonModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    GalleriaModule,
    ContextMenuModule,
  ],
  exports: [InputSwitchComponent, FullscreenGalleryComponent],
})
export class SharedModule {}
