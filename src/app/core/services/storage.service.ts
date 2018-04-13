import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class StorageService implements OnInit, OnDestroy {

    getMuserName = localStorage.getItem('currentUser');

    constructor(
        private dataService: DataService,
        private localSt: LocalStorageService, 
        private sessionSt: LocalStorageService
    ) {
    }

    ngOnInit() {
        this.localSt.store('localSttest', 'test');
        
        this.localSt.observe('key')
            .subscribe((value) => console.log('new value', value));

            this.sessionSt.store('sessionSttest', 'test');
    }

      ngOnDestroy() {

  }

}
