import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SafePipe } from './pipes/safe-pipe.component';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule        
    ],
    declarations: [SafePipe, LoadingOverlayComponent],
    exports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SafePipe,
        LoadingOverlayComponent
    ]
})

export class SharedModule {
}
