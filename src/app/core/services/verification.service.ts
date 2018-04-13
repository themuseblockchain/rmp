import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { AlertService } from './alert.service';
import { AlertComponent } from './../../main/components/alert/alert.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VerificationService {
  private user: any;
  private checkVerified;
  public emailVerified;

  constructor(
    private alert: AlertService) { }

  sendEmailVerification() {
    const that = this;
    return new Promise((resolve, reject) => {
      // TODO: loading.show(); 
      // that.emailVerified = false;
      that.alert.closeAll();
      firebase.auth().currentUser.sendEmailVerification().then(() => {
          that.alert.showEmailVerificationSentMessage(firebase.auth().currentUser.email);
          // TODO: loading.hide();
        }).catch((err) => {
          this.alert.showErrorMessage('sendEmailVerification(): ' + err);
         });
    });
  }

  checkVerified$() {
    return Observable
      .interval(1000)
      .flatMap(() => {
        return firebase.auth().currentUser.reload().then(() => {
          this.emailVerified = firebase.auth().currentUser.emailVerified;
          if (this.emailVerified === true) {
            this.alert.closeAll();
            this.alert.showEmailVerified();
            return this.emailVerified;
          }
        });
      });
  }
}
