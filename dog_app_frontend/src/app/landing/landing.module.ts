import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

const routes: Routes = [{ path: '', component: LandingComponent }];

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    ButtonModule,
    RippleModule,
  ],
})
export class LandingModule {}
