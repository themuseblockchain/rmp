import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/common/shared.module';
import { WalletComponent } from './wallet.component';
import { ModalTransferComponent } from './modal/modal-transfer.component';
import { ModalDialogVestComponent } from './modal/modal-vest.component';
import { ModalWithdrawComponent } from './modal/modal-withdraw.component';


@NgModule({
    declarations: [
        WalletComponent,
        ModalTransferComponent,
        ModalDialogVestComponent,
        ModalWithdrawComponent
        ],
    imports     : [
        SharedModule
    ],
    exports     : [
        WalletComponent
    ],
    entryComponents: [
        ModalTransferComponent,
        ModalDialogVestComponent,
        ModalWithdrawComponent
    ],
})

export class WalletModule {
 }
