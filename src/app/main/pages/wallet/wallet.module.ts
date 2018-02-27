import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { WalletComponent } from './wallet.component';
import { ModalDialogTransferComponent } from './modal/modaldialogtransfer.component';
import { ModalDialogVestComponent } from './modal/modaldialogvest.component';
import { ModalDialogWithdrawComponent } from './modal/modaldialogwithdraw.component';

const routes = [
    {
        path     : 'wallet',
        component: WalletComponent
    }
];

@NgModule({
    declarations: [
        WalletComponent,
        ModalDialogTransferComponent,
        ModalDialogVestComponent,
        ModalDialogWithdrawComponent
        ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        WalletComponent
    ],
    entryComponents: [
        ModalDialogTransferComponent,
        ModalDialogVestComponent,
        ModalDialogWithdrawComponent
    ],
})

export class WalletModule
{
}
