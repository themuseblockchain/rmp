import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmartContractsComponent } from './smart-contracts.component';
import { ContractComponent } from './contract/contract.component';
import { ContractService } from './contract/contract.service';
import { SmartContractsService } from './smart-contracts.service';


const routes: Routes = [
    {
        path: 'contract',
        component: SmartContractsComponent,
        resolve: {
            data: SmartContractsService
        }
    },
    {
        path: 'contract/:id',
        component: ContractComponent,
        resolve: {
            data: SmartContractsService
        }
    },
    {
        path: 'contract/:id/:handle',
        component: ContractComponent,
        resolve: {
            data: SmartContractsService
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        SmartContractsComponent,
        ContractComponent
    ],
    providers: [
        SmartContractsComponent,
        ContractService
    ]
})
export class SmartContractsModule {
}
