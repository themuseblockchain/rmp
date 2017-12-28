import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../modules/shared.module';
import { SearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        SearchBarComponent
    ],
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        SearchBarComponent
    ]
})
export class SearchBarModule
{
}
