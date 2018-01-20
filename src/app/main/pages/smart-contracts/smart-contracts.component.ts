import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SmartContractsService } from './smart-contracts.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Animations } from '../../../core/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Utils } from '../../../core/utils';
// import {DataService} from '../../../../core/services/data.services';

@Component({
    selector   : 'smart-contracts',
    templateUrl  : './smart-contracts.component.html',
    styleUrls    : ['./smart-contracts.component.scss'],
    animations : Animations
})
export class SmartContractsComponent
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private smartContractsService: SmartContractsService, 
        // private dataService: DataService
    )
    {
    }
}
