import { Injectable } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx'; // all rxjs operators
import 'rxjs/add/observable/of';
import * as muse from 'museblockchain-js';
import { MuseService } from './muse.service';

@Injectable()
export class MuserService {
    // muser = this.muser.asObservable();
    getMuserName = localStorage.getItem('currentUser');

    // getMuserInfo = this.dataService.streamAccountInfo$(this.getMuserName).subscribe(data => {
    //     return data;
    // });

    constructor(
        private dataService: DataService,
        private museService: MuseService,
    ) {
    }

    muserExist(muserName){
        // TODO: convert to Observable
        const muserNameExist = this.museService.getAccount$(muserName);
        muserNameExist.subscribe(muserExist => {
          if (muserExist.length !== 0) {
            // return true
          } else {
            // return false
          }
        });
    }


}


// =========================
// SAMPLE simpleObservable
// =========================

// @Injectable()
// export class MuserService {
//     getMuserName = localStorage.getItem('currentUser');
//     // muser$ = this.muser.asObservable();
//     constructor(
//         private dataService: DataService
//     ) {
//         const simpleObservable = new Observable((observer) => {
//             // observable execution
//             observer.next('bla bla bla');
//             observer.complete();
//         });
//     }
// }

// simpleObservable.subscribe();
