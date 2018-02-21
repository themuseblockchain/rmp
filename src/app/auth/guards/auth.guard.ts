import { JSONSchema } from 'angular-async-local-storage/src/service/validation/json-schema';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Rx';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, 

    protected storage: AsyncLocalStorage 
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

            // const authorized = JSON.parse(localStorage.getItem('is_logged_in'));
        return JSON.parse(localStorage.getItem('is_logged_in'));

        // return this.userService.verify().map(
        //     data => {
        //         if (data !== null) {
        //             // logged in so return true
        //             return true;
        //         }
        //         // error when verify so redirect to login page with the return url
        //         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     },
        //     error => {
        //         // error when verify so redirect to login page with the return url
        //         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     });
        }
}
