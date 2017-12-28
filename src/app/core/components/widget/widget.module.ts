import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { WidgetComponent } from './widget.component';
import { WidgetToggleDirective } from './widget-toggle.directive';

@NgModule({
    imports     : [
        SharedModule
    ],
    exports     : [
        WidgetComponent,
        WidgetToggleDirective
    ],
    declarations: [
        WidgetComponent,
        WidgetToggleDirective
    ]
})
export class WidgetModule
{
}
