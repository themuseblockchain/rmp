import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { ColorPickerModule } from 'ngx-color-picker';
import { MaterialColorPickerComponent } from '../material-color-picker/material-color-picker.component';
@NgModule({
    imports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
        // ColorPickerModule
    ],
    exports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
        // ColorPickerModule
    ]
})

export class SharedModule {
}
