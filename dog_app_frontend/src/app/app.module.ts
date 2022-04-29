import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/services/interceptors/auth.interceptor";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RegisterComponent } from './components/register/register.component';
import {StepsModule} from "primeng/steps";
import { AccountInfoComponent } from './components/register/account-info/account-info.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { PersonalInfoComponent } from './components/register/personal-info/personal-info.component';
import { AdditionalInfoComponent } from './components/register/additional-info/additional-info.component';
import {KeyFilterModule} from "primeng/keyfilter";
import {FileUploadModule} from "primeng/fileupload";
import {AuthStateService} from "./shared/services/auth-state/auth-state.service";
import { NavbarComponent } from './core/navbar/navbar.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        AccountInfoComponent,
        PersonalInfoComponent,
        AdditionalInfoComponent,
        NavbarComponent
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
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        MessageService
    ],
    exports: [
        NavbarComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
