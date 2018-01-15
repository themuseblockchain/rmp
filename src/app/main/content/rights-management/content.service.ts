import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContentService implements Resolve<any>
{
    content: any[];
    onContentChanged: BehaviorSubject<any> = new BehaviorSubject({});

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

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getContent()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getContent(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/contents')
                .subscribe((response: any) => {
                    this.content = response;
                    this.onContentChanged.next(this.content);
                    resolve(response);
                }, reject);
        });
    }
}
