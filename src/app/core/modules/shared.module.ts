import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSidenavHelperDirective, MatSidenavTogglerDirective } from '../directives/mat-sidenav-helper/mat-sidenav-helper.directive';
import { MatSidenavHelperService } from '../directives/mat-sidenav-helper/mat-sidenav-helper.service';
import { PipesModule } from '../pipes/pipes.module';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { CountdownComponent } from '../components/countdown/countdown.component';
import { NavbarVerticalService } from '../../main/components/navbar/vertical/navbar-vertical.service';
import { HljsComponent } from '../components/hljs/hljs.component';
// import { PerfectScrollbarDirective } from '../directives/perfect-scrollbar/perfect-scrollbar.directive';
import { IfOnDomDirective } from '../directives/if-on-dom/if-on-dom.directive';
import { MaterialColorPickerComponent } from '../components/material-color-picker/material-color-picker.component';


@NgModule({
    declarations   : [
        MatSidenavHelperDirective,
        MatSidenavTogglerDirective,
        ConfirmDialogComponent,
        CountdownComponent,
        HljsComponent,
        IfOnDomDirective,
        // PerfectScrollbarDirective,
        MaterialColorPickerComponent
    ],
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        ColorPickerModule
    ],
    exports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        MatSidenavHelperDirective,
        MatSidenavTogglerDirective,
        PipesModule,
        CountdownComponent,
        HljsComponent,
        // PerfectScrollbarDirective,
        ReactiveFormsModule,
        ColorPickerModule,
        IfOnDomDirective,
        MaterialColorPickerComponent
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    providers      : [
        NavbarVerticalService,
        MatSidenavHelperService
    ]
})

export class SharedModule
{

}
