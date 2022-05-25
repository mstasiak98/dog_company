import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementDashboardComponent } from './announcement-dashboard/announcement-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {CoreModule} from "../../core/core.module";

const routes: Routes = [
  { path: '', component: AnnouncementDashboardComponent }
]

@NgModule({
  declarations: [
    AnnouncementDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
  ]
})
export class AnnouncementModule { }
