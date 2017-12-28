import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { AnotherSampleComponent } from './another-sample.component';


const routes = [
    {
        path     : 'another-sample',
        component: AnotherSampleComponent
    }
];

@NgModule({
    declarations: [
        AnotherSampleComponent
        // ReactComponent
    ],
    imports     : [
         SharedModule,
        // Ng2ReactModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        AnotherSampleComponent
        // ReactComponent
    ]
})


export class AnotherSampleModule
{
}
