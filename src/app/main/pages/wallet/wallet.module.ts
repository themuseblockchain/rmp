import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { WalletComponent } from './wallet.component';

const routes = [
    {
        path     : 'wallet',
        component: WalletComponent
    }
];

@NgModule({
    declarations: [
        WalletComponent
    ],
    imports     : [
         SharedModule,
         RouterModule.forChild(routes)
    ],
    exports     : [
        WalletComponent
    ]
})

export class WalletModule
{
}
