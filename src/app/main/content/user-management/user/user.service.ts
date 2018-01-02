import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService implements Resolve<any>
{
    routeParams: any;
    user: any;
    onUserChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient
    )
    {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getUser()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onUserChanged.next(false);
                resolve(false);
            }
            else
            {
                this.http.get('api/users/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.user = response;
                        this.onUserChanged.next(this.user);
                        resolve(response);
                    }, reject);
            }
        });
    }

    saveUser(user)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/users/' + user.id, user)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addUser(user)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/users/', user)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
