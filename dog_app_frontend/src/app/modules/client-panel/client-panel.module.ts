import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientPanelComponent } from './client-panel.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { NotLoggedGuard } from '../../shared/guards/not-logged.guard';
import { CoreModule } from '../../core/core.module';

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
        path: 'announcements',
        loadChildren: () =>
          import('./announcement/announcement.module').then(
            m => m.AnnouncementModule
          ),
      },

      {
        path: 'messages',
        loadChildren: () =>
          import('./messages/messages.module').then(m => m.MessagesModule),
      },

      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then(m => m.UserModule),
      },

      {
        path: 'opieka',
        loadChildren: () =>
          import('./dog-care/dog-care.module').then(m => m.DogCareModule),
      },
    ],
  },
];

@NgModule({
  declarations: [ClientPanelComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CoreModule],
})
export class ClientPanelModule {}
