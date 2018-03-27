import { Injectable } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
 // import { map } from 'rxjs/Operators';
import 'rxjs/Rx'; // all rxjs operators
import 'rxjs/add/observable/of';
import * as muse from 'museblockchain-js';

@Injectable()
export class MuserService {
    // muser = this.muser.asObservable();
    getMuserName = localStorage.getItem('currentUser');

    // getMuserInfo = this.dataService.streamAccountInfo$(this.getMuserName).subscribe(data => {
    //     return data;
    // });

    constructor(
        private dataService: DataService
    ) {
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
