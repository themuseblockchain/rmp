import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Muser } from '../modals/muser.modal';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from '../../core/services/data.service';

export const ANONYMOUS_USER: Muser = {
    // muserName: undefined,
    // password: undefined,
    // key: undefined,
    // isLoggedIn: false
    muserName: 'John',
    password: '123',
    key: '456',
    isLoggedIn: true
};

@Injectable()
export class MuserService {

    private muser = new BehaviorSubject<Muser>(ANONYMOUS_USER);
    cast = this.muser.asObservable();

    constructor(
        private dataService: DataService
    ) {

        // http.get<Muser>('/api/user')
        //     .do(console.log)
        //     .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
    }

    updateMuser(newMuser) {
        this.muser.next(newMuser);
    }





    // muser$: Observable<Muser> = this.muser.asObservable().filter(muser => !!muser);
    // isLoggedIn$: Observable<boolean> = this.muser$.map(muser => !!muser.muserName);
    // isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn);



    signUp(email: string, password: string) {

        return '';
        // return this.http.post<User>('/api/signup', { email, password })
        //     .shareReplay()
        //     .do(user => this.subject.next(user));
    }

    //     login(authUser: string, authKey: string) {

    //         return this.http.post<Muser>('/api/login', { authUser, authKey })
    //             .shareReplay()
    //             .do(user => this.subject.next(user));

    //     //  this.isAuthenticated = this.webLocalStorage.observe('isAuthenticated').subscribe((isAuthenticated) => {
    //     //       console.log(isAuthenticated);
    //     //       });
    //     return this.dataService.authAccount(authUser.toLowerCase(), authKey).then(() => {
    //       this.isAuthenticated = localStorage.getItem('isAuthenticated');
    //       if (this.isAuthenticated != null && this.isAuthenticated === 'true') {
    //         this.router.navigateByUrl('/');
    //       }
    //     }).catch(e => console.log('error' + e));
    //     // this.webLocalStorage.retrieve('isAuthenticated');
    //   }


    loginAsUser(email: string) {
        return '';
        // return this.http.post<User>('/api/admin', { email })
        //     .shareReplay()
        //     .do(user => this.subject.next(user));
    }

    // logout(): Observable<any> {
    // return this.http.post('/api/logout', null)
    //     .shareReplay()
    //     .do(user => this.subject.next(ANONYMOUS_USER));
    // }
}








