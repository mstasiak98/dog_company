import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { PaginatorModule } from 'primeng/paginator';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: MessagesComponent },
  { path: 'temat/:id', component: MessageDetailsComponent },
];

@NgModule({
  declarations: [MessagesComponent, MessageDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    ProgressSpinnerModule,
    TableModule,
    ButtonModule,
    DividerModule,
    VirtualScrollerModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MessagesModule {}
