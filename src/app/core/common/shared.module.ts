import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [],
    exports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class SharedModule {
}
