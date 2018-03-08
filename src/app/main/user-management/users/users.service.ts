import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from '../../../core/services/data.service';

import * as muse from 'museblockchain-js';

@Injectable()
export class UsersService implements Resolve<any> {
    users: any[];
    onUserChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient,
        private dataService: DataService
    ) {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUsers()
            ]).then(
                () => {
                    resolve();
                },
                reject
                );
        });
    }

    getUsers(): Promise<any> {

        return new Promise((resolve, reject) => {
            // https://tutorialedge.net/typescript/angular/angular-websockets-tutorial/
            // // this.ds = <Subject<Message>>dataService
            // //  this.dataService.museSetup();
            // //  this.http.get(this.dataService.getAllAccounts())
            // const test = this.http.get(this.dataService.getAllAccounts());
            // test.subscribe((response: any) => {
            //     alert('003');
            //     this.users = response;
            //     alert('this.users:' + JSON.stringify(this.users));
            //     this.onUserChanged.next(this.users);
            //     // resolve(response);
            // });

            //     this.http.get('api/users')
            //         .subscribe((response: any) => {
            //             this.users = response;
            //             this.onUserChanged.next(this.users);
            //             resolve(response);
            //         }, reject);
        });
    }
}
