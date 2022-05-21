import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogProfileComponent} from "./dog-profile/dog-profile.component";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {CoreModule} from "../../core/core.module";
import {GalleriaModule} from "primeng/galleria";
import {CarouselModule} from "primeng/carousel";
import {ImageModule} from "primeng/image";
import {CheckboxModule} from "primeng/checkbox";

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
    ]
})
export class DogProfileModule { }
