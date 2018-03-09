import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/common/material-components.module';
import { ScrollbarModule } from '../../core/scrollbar/scrollbar.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { DemoDialogComponent, DialogsComponent } from './dialogs/dialogs.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollbarModule
  ],
  declarations: [
    ComponentsComponent,
    DialogsComponent,
    DemoDialogComponent,
    MenuComponent,
    ProgressComponent,
    ProgressSpinnerComponent
  ],
  entryComponents: [DemoDialogComponent]
})
export class ComponentsModule {
}
