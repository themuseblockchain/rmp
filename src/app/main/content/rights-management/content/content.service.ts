import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContentService implements Resolve<any>
{
    routeParams: any;
    content: any;
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

        this.routeParams = route.params;

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
            if ( this.routeParams.id === 'new' )
            {
                this.onContentChanged.next(false);
                resolve(false);
            }
            else
            {
                this.http.get('api/content/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.content = response;
                        this.onContentChanged.next(this.content);
                        resolve(response);
                    }, reject);
            }
        });
    }

    saveContent(content)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/content/' + content.id, content)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addContent(content)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/content/', content)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
