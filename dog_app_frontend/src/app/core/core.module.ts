import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MenuModule} from "primeng/menu";
import {AppModule} from "../app.module";
import { ClickOutsideDirective } from './directives/click-outside.directive';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DividerModule} from "primeng/divider";



@NgModule({
  declarations: [
    NavbarComponent,
    ClickOutsideDirective
  ],
  exports: [
    NavbarComponent,
    ClickOutsideDirective
  ],
    imports: [
        CommonModule,
        MenuModule,
        ButtonModule,
        RippleModule,
        DividerModule,
    ]
})
export class CoreModule { }
