import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserManagementService implements Resolve<any>
{
    onUserChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onUserSelected: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient)
    {
    }

    /**
     * The User Manager App Main Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUser()
            ]).then(
                ([files]) => {
                    resolve();
                },
                reject
            );
        });
    }

    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/user-manager')
                .subscribe((response: any) => {
                    this.onUserChanged.next(response);
                    this.onUserSelected.next(response[0]);
                    resolve(response);
                }, reject);
        });
    }

}
