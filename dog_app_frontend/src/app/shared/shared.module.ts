import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSwitchComponent } from './components/input-switch/input-switch.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputSwitchComponent],
  imports: [CommonModule, InputSwitchModule, FormsModule, ReactiveFormsModule],
  exports: [InputSwitchComponent],
})
export class SharedModule {}
