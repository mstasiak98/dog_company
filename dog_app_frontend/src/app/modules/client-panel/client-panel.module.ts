import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientPanelComponent } from './client-panel.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { NotLoggedGuard } from '../../shared/guards/not-logged.guard';
import { CoreModule } from '../../core/core.module';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientPanelComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dog-profile/dog-profile.module').then(
            m => m.DogProfileModule
          ),
      },

      {
        path: 'ogloszenia',
        loadChildren: () =>
          import('./announcement/announcement.module').then(
            m => m.AnnouncementModule
          ),
      },

      {
        path: 'wiadomosci',
        loadChildren: () =>
          import('./messages/messages.module').then(m => m.MessagesModule),
        canActivate: [AuthGuard],
      },

      {
        path: 'uzytkownik',
        loadChildren: () =>
          import('./user/user.module').then(m => m.UserModule),
      },

      {
        path: 'opieka',
        loadChildren: () =>
          import('./dog-care/dog-care.module').then(m => m.DogCareModule),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [ClientPanelComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CoreModule],
})
export class ClientPanelModule {}
