import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/common/material.module';
import { ScrollbarModule } from '../../core/scrollbar/scrollbar.module';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollbarModule
  ],
  declarations: [
    AlertComponent

  ],
  entryComponents: [
    AlertComponent
  ]
})

export class ComponentsModule {
}
