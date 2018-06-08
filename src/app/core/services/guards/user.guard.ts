import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../alert.service';
import { AuthService } from '../auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private alert: AlertService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    if (this.auth.isUser(this.auth.muser)) {
      return Observable.of(true);
    } else {
      this.alert.showErrorMessage('Access Denied - Must be logged');
    }
    return Observable.of(false);

  }
}
