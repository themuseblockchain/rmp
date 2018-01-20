import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContentListService implements Resolve<any>
{
    contentList: any[];
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
                this.getContents()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getContents()// :Promise<any>
    {
        // return new Promise((resolve, reject) => {
            // this.http.get('api/users')
            //     .subscribe((response: any) => {
            //         this.contentList = response;
            //         this.onContentChanged.next(this.contentList);
            //         resolve(response);
            //     }, reject);
        // });
    }
}
