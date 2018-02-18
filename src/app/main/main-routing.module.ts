import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
    {
        'path': '',
        'component': MainComponent,
        'canActivate': [AuthGuard],
        'children': [
            // {
            //     'path': 'angular\/ng-bootstrap',
            //     'loadChildren': '.\/pages\/angular\/ng-bootstrap\/ng-bootstrap.module#NgBootstrapModule'
            // },
            // {
            //     'path': 'angular\/primeng',
            //     'loadChildren': '.\/pages\/angular\/primeng\/primeng.module#PrimengModule'
            // },
            // {
            //     'path': 'index',
            //     'loadChildren': '.\/pages\/index\/index.module#IndexModule'
            // },
            // {
            //     'path': '404',
            //     'loadChildren': '.\/pages\/not-found\/not-found.module#NotFoundModule'
            // },
            {
                'path': '',
                'redirectTo': 'index',
                'pathMatch': 'full'
            }
        ]
    },
    // {
        // 'path': 'snippets\/pages\/errors\/error-6',
        // 'loadChildren': '.\/pages\/self-layout-blank\/snippets\/pages\/errors\/errors-error-6\/errors-error-6.module#ErrorsError6Module'
    // },
    // {
        // 'path': '**',
        // 'redirectTo': '404',
        // 'pathMatch': 'full'
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
