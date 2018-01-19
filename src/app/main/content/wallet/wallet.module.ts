import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { Wallet } from './wallet.component';

const routes = [
    {
        path     : 'wallet',
        component: Wallet
    }
];

@NgModule({
    declarations: [
        Wallet
        // ReactComponent
    ],
    imports     : [
         SharedModule,
        // Ng2ReactModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        Wallet
        // ReactComponent
    ]
})


export class WalletModule
{
}
