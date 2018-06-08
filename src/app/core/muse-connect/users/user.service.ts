import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    private url =  environment.apiUrl + 'users/';
    private headers = new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    getUsers(): Observable<User[]> {
        return this.http.get(this.url).map((res: User[]) => res);
    }

    getUser(id: string): Observable<User> {
        return this.http.get(this.url + id).map((res: User) => res);
    }

    addUser(user: User) {
        return this.http.post(this.url, user);
    }

    updateUser(user: User) {
        return this.http.put(this.url + user.id, user);
    }

    deleteUser(user: User) {
        return this.http.delete(this.url + user.id);
    }

}
