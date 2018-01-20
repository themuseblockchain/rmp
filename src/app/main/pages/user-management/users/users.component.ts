import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Animations } from '../../../../core/animations';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Utils } from '../../../../core/utils';
// import {DataService} from '../../../../core/services/data.services';

@Component({
    selector   : 'users',
    templateUrl  : './users.component.html',
    styleUrls    : ['./users.component.scss'],
    animations : Animations
})
export class UsersComponent implements OnInit
{
    dataSource: FilesDataSource | null; 
    displayedColumns = ['id', 'museId', 'email', 'permissions', 'status', 'validated'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private usersService: UsersService, 
        // private dataService: DataService
    )
    {
    }

    ngOnInit()
    {
        this.dataSource = new FilesDataSource(this.usersService, this.paginator, this.sort);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
                  .debounceTime(150)
                  .distinctUntilChanged()
                  .subscribe(() => {
                      if ( !this.dataSource )
                      {
                          return;
                      }
                      this.dataSource.filter = this.filter.nativeElement.value;
                  });

                //   const test = this.dataService.getAccounts();
    }
}

export class FilesDataSource extends DataSource<any>
{
    _filterChange = new BehaviorSubject('');
    _filteredDataChange = new BehaviorSubject('');

    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    constructor(
        private usersService: UsersService,
        private _paginator: MatPaginator,
        private _sort: MatSort
    )
    {
        super();
        this.filteredData = this.usersService.users;
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.usersService.onUserChanged,
            this._paginator.page,
            this._filterChange,
            this._sort.sortChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            let data = this.usersService.users.slice();

            data = this.filterData(data);

            this.filteredData = [...data];

            data = this.sortData(data);

            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
        });
    }

    filterData(data)
    {
        if ( !this.filter )
        {
            return data;
        }
        return Utils.filterArrayByString(data, this.filter);
    }

    sortData(data): any[]
    {
        if ( !this._sort.active || this._sort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._sort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'museId':
                    [propertyA, propertyB] = [a.museId, b.museId];
                    break;
                case 'email':
                    [propertyA, propertyB] = [a.email[0], b.email[0]];
                    break;
                case 'permissions':
                    [propertyA, propertyB] = [a.permissions, b.permissions];
                    break;
                case 'status':
                    [propertyA, propertyB] = [a.status, b.status];
                    break;
                case 'validated':
                    [propertyA, propertyB] = [a.validated, b.validated];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }

    disconnect()
    {
    }
}
