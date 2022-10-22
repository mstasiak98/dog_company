import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { StepsModule } from 'primeng/steps';
import { AccountInfoComponent } from './components/register/account-info/account-info.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PersonalInfoComponent } from './components/register/personal-info/personal-info.component';
import { AdditionalInfoComponent } from './components/register/additional-info/additional-info.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadModule } from 'primeng/fileupload';
import { AuthStateService } from './shared/services/auth-state/auth-state.service';
import { DialogService } from 'primeng/dynamicdialog';

import pl from '@angular/common/locales/pl';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MakeProposalDialogComponent } from './shared/components/make-proposal-dialog/make-proposal-dialog.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';

registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountInfoComponent,
    PersonalInfoComponent,
    AdditionalInfoComponent,
    MakeProposalDialogComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    StepsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    KeyFilterModule,
    FileUploadModule,
    CheckboxModule,
    CalendarModule,
    RadioButtonModule,
    InputTextareaModule,
    InputMaskModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    MessageService,
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
