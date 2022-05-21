import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogProfileComponent} from "./dog-profile/dog-profile.component";
import {RouterModule, Routes} from "@angular/router";
import {CoreModule} from "../../core/core.module";
import {GalleriaModule} from "primeng/galleria";
import {CarouselModule} from "primeng/carousel";
import {ImageModule} from "primeng/image";
import {CheckboxModule} from "primeng/checkbox";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { DynamicDialogModule } from 'primeng/dynamicdialog';

const routes: Routes = [
  { path: '', component: DogProfileComponent }
]

@NgModule({
  declarations: [
    DogProfileComponent
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
    ]
})
export class DogProfileModule { }
