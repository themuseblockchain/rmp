import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { WalletComponent } from './wallet.component';
import { ModalDialogComponent } from './modal/modal-dialog.component';

const routes = [
    {
        path     : 'wallet',
        component: WalletComponent
    }
];

@NgModule({
    declarations: [
        WalletComponent,
        ModalDialogComponent
        ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        WalletComponent
    ],
    entryComponents: [
        ModalDialogComponent
    ],
})

export class WalletModule
{
}
