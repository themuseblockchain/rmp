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
            //     'path': '404',
            //     'loadChildren': '.\/pages\/not-found\/not-found.module#NotFoundModule'
            // },
            {
                'path': 'wallet',
                'loadChildren': './pages/wallet/wallet.module#WalletModule'
            },
            {
                'path': 'post',
                'loadChildren': './pages/rights-management/post.module#PostModule'
            },
        ]
    },
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
