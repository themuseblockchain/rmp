import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ManagementService } from './management.service';
import { Animations } from '../../../../core/animations';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { Management } from './management.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '../../../../core/utils';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
    selector     : 'management',
    templateUrl  : './management.component.html',
    styleUrls    : ['./management.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})
export class ManagementComponent 
{
    management = new Management();
    onManagementItemChanged: Subscription;
    pageType: string;
    contractForm: FormGroup;

    constructor(
        private contractService: ManagementService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private location: Location
    )
    {

    }

    createForm()
    {

    }

    saveItem()
    {

    }

    addItem()
    {

    }
}
