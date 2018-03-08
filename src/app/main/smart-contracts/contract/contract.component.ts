import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContractService } from './contract.service';
import { Animations } from '../../../core/animations';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { Contract } from './contract.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
    selector: 'contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: Animations
})
export class ContractComponent {
    contract = new Contract();
    onContractChanged: Subscription;
    pageType: string;
    contractForm: FormGroup;

    constructor(
        private contractService: ContractService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private location: Location
    ) {

    }

    createContractForm() {

    }

    saveContract() {

    }

    addContract() {

    }
}
