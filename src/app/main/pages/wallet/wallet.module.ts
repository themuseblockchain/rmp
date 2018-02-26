import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { WalletComponent } from './wallet.component';
import { ModalDialog } from './modal/modal-dialog';

const routes = [
    {
        path     : 'wallet',
        component: WalletComponent
    }
];

@NgModule({
    declarations: [
        WalletComponent,
        ModalDialog
        ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        WalletComponent,
        ModalDialog
    ]
})

export class WalletModule
{
}
