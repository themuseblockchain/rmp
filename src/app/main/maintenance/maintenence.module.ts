import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance.component';

const routes = [
    {
        path: 'maintenance',
        component: MaintenanceComponent
    }
];

@NgModule({
    declarations: [
        MaintenanceComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})

export class MaintenanceModule {

}
