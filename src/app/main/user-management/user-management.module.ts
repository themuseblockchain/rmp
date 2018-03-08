import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { UsersService } from './users/users.service';


const routes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        resolve: {
            data: UsersService
        }
    },
    {
        path: 'user',
        component: UserComponent,
        resolve: {
            data: UserService
        }
    },
    {
        path: 'users/:id',
        component: UserComponent,
        resolve: {
            data: UserService
        }
    },
    {
        path: 'users/:id/:handle',
        component: UserComponent,
        resolve: {
            data: UserService
        }
    },
    // {
    //     path     : 'orders',
    //     component: UserComponent,
    //     resolve  : {
    //         data: UserService
    //     }
    // } ,
    // {
    //     path     : 'users/:id',
    //     component: UserComponent,
    //     resolve  : {
    //         data: UserService
    //     }
    //  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        UsersComponent,
        UserComponent
    ],
    providers: [
        UsersService,
        UserService
    ]
})
export class UserManagementModule {
}
