import { NgModule } from '@angular/core';
 import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { UserManagementService } from './user-management.service';
import { UserManagementUserListComponent } from './user-list/user-list.component';
import { UserManagementMainSidenavComponent } from './sidenavs/main/main.component';
import { UserManagementDetailsSidenavComponent } from './sidenavs/details/details.component';

const routes: Routes = [
    {
        path     : 'user-management',
        component: UserManagementComponent,
        children : [],
        resolve  : {
            files: UserManagementService
        }
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        UserManagementComponent,
        UserManagementUserListComponent,
        UserManagementMainSidenavComponent,
        UserManagementDetailsSidenavComponent
    ],
    providers   : [
        UserManagementService
    ]
})
export class UserManagementModule
{
}
