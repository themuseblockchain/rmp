import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { CryptoService } from '../../services/crypto.service';
import { AlertService } from '../../services/alert.service';

import { environment } from '../../../../environments/environment';
import { User } from '../users/user';

@Injectable()
export class MuseAuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService,
    private cryptoService: CryptoService
  ) {
    this.refreshUser();
  }

  public user: User;
  private url = environment.apiUrl + 'auth/';

  private refreshUser() {

    // Trigger on Auth User State Change
    firebase.app('museConnect').auth().onAuthStateChanged(user => {

      // Only Update user if email is verified
      if (user && user.emailVerified) {

        // Get user Informations & Update it in client
        this.http.get(environment.apiUrl + 'users/' + user.uid).subscribe((res: User) => {

          // Set User
          this.user = res;

          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', res.musername);

        });

      } else {

        // Unset User if not valid
        this.user = null;

        // Temporary Local Storage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('key');
        localStorage.removeItem('password');

      }

    });

  }

  register(user: User) {

    // Muse Connect Register
    this.http.post(this.url + 'register', user).subscribe((response: any) => {

      // Firebase Login
      firebase.app('museConnect').auth().signInWithCustomToken(response.token).then((userRecord: firebase.User) => {

        // Email Verification
        userRecord.sendEmailVerification();
        this.alert.showSuccessMessage('Success', 'A confirmation email has been sent, please verify your address before login.');

        // Redirect
        this.router.navigateByUrl('/login');

      }).catch(error => {
        this.alert.showErrorMessage(error);
      });

    }, error => {
      this.alert.showErrorMessage(error.error.error);
    });

  }

  login(user: User) {

    // Muse Connect Login
    this.http.post(this.url + 'login', user).subscribe((response: any) => {

      // Firebase Auth Login
      firebase.app('museConnect').auth().signInWithCustomToken(response.token).then((res: any) => {

        // Encrypt Password
        this.cryptoService.museConnectEncrypt(res.password);

        // Redirect
        this.router.navigateByUrl('/');

      }).catch(error => {
        this.alert.showErrorMessage(error);
      });

    }, error => {
      this.alert.showErrorMessage(error.error.error);
    });

  }

}
