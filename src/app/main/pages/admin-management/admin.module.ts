import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManagementComponent } from './management/management.component';
import { ManagementService } from './management/management.service';
import { AdminService } from './admin.service';


const routes: Routes = [
    {
        path     : 'management', 
        component: AdminComponent,
        resolve  : {
            data : AdminService
        }
    },
    {
        path     : 'management/:id',
        component: ManagementComponent,
        resolve  : {
            data: AdminService
        }
    },
    {
        path     : 'management/:id/:handle',
        component: ManagementComponent,
        resolve  : {
            data: AdminService
        }
    },
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AdminComponent,
        ManagementComponent
    ],
    providers   : [
        AdminComponent,
        ManagementService
    ]
})
export class AdminModule
{
}
