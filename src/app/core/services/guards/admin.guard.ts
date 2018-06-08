import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private alert: AlertService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    if (this.auth.isAdmin(this.auth.muser)) {
      return Observable.of(true);
    } else {
      this.alert.showErrorMessage('Access Denied - Admin Only');
    }
    return Observable.of(false);

  }
}
