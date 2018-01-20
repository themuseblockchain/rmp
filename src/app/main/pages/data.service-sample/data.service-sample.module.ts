import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { DataServiceSampleComponent } from './data.service-sample.component';


const routes = [
    {
        path     : 'dataService-sample',
        component: DataServiceSampleComponent
    }
];

@NgModule({
    declarations: [
        DataServiceSampleComponent
        // ReactComponent
    ],
    imports     : [
         SharedModule,
        // Ng2ReactModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        DataServiceSampleComponent
        // ReactComponent
    ]
})


export class DataServiceSampleModule
{
}
