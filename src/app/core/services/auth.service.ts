// Angular & Rxjs
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AlertService } from './alert.service';
import { MuseService } from './muse.service';
import { CryptoService } from './crypto.service';
import { VerificationService } from './verification.service';

// Api
import * as muse from 'museblockchain-js';
import * as firebase from 'firebase';

// Models
import { Config } from '../../../config/config';
import { ErrorCodes } from '../../core/enums';
import { MuseKeys } from '../modals/muse-keys';
import { Muser } from '../modals/muser';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(
    private alert: AlertService,
    private museService: MuseService,
    private router: Router,
    private userVerification: VerificationService,
  ) {
    this.setMuser();
  }

  public muser: Observable<Muser>;
  private muserName: string;
  private isAuthenticated: any;

  private setMuser() {
    firebase.auth().onAuthStateChanged(user => {
      if (firebase.auth().currentUser) {
        const ref = firebase.database().ref('musers/' + firebase.auth().currentUser.uid).on('value', (snapshot) => {
          this.muser = Observable.of(snapshot.val());
        });
      } else {
        this.muser = Observable.of(null);
      }
    });
  }

  setMuseSocket() {
    muse.config.set('websocket', 'wss://api.muse.blckchnd.com');
  }

  authAccount(muserName, password) {
    this.setMuseSocket();
    return new Promise(function (resolve, reject) {
      muse.login(muserName.toLowerCase(), password, function (err, success) {
        if (err !== 1) {
          reject(err);
        } else {
          resolve(success);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', muserName);
          CryptoService.encrypt(password);
        }
      });
    }).catch((err) => {
      this.alert.showErrorMessage('authAccount(): ' + err);
    });
  }

  createAccount(muserName: string, password: string, email: string) {
    this.muserName = muserName.toLocaleLowerCase();
    this.museService.getAccount(muserName).then(
      dataExist => {
        if (dataExist.length === 0) {
          // also check for password length
          firebase.auth().createUserWithEmailAndPassword(email, this.muserName)
            .then((success) => {
              this.verifyAccount(muserName, password);
            }).catch((err) => {
              this.alert.showErrorMessage('createAccount(): ' + err);
            });
        } else {
          this.alert.showErrorMessage(ErrorCodes.muserNameAlreadyInUse);
        }
      }
    );
  }

  verifyAccount(muserName, password) {
    try {
      // TODO: how to handle if user does not complete verification in one sitting?
      if (!firebase.auth().currentUser.emailVerified) {
        this.userVerification.sendEmailVerification().then(() => { });

        const verification = this.userVerification.checkVerified$().subscribe(
          verified => {
            if (verified === true) {
              verification.unsubscribe();
              this.createMuserProfileFireBase(muserName /*, phoneNumber*/);
              this.registerMuseAccount(muserName, password).then(() => {
                // TODO: This logic needs to be moved to the register.component.ts
                this.router.navigateByUrl('/login');
                this.authAccount(muserName.toLowerCase(), password).then(() => {
                  this.isAuthenticated = localStorage.getItem('isAuthenticated');
                  if (this.isAuthenticated === 'true') {
                    this.router.navigateByUrl('/');
                  }
                }).catch((err) => {
                  this.alert.showErrorMessage('register(): ' + err);
                });
                // TODO: This logic needs to be moved to the register.component.ts
              });
            }
          }
        );
      }
    } catch (error) {
      this.alert.showErrorMessage('verifyAccount(): ' + error);
      // TODO: Add in Error Logging. Most likely write errors to firebase
    }
  }

  createMuserProfileFireBase(muserName /*, phoneNumber*/) {

    // Fetch current User
    const user = firebase.auth().currentUser;

    // Set Muser Values
    const muser: Muser = new Muser();
    muser.uid = user.uid;
    muser.muserName = muserName;
    muser.dateAdded = new Date().toString();
    muser.email = user.email;
    muser.emailVerified = user.emailVerified;
    // muser.pin = input value // TODO: Implement Pin

    // Create user in Database
    firebase.database().ref('musers/' + user.uid).set(muser).catch((err) => {
      this.alert.showErrorMessage('createMuserProfileFireBase() >> db: ' + err);
      // TODO: Add in Error Logging. Most likely write errors to firebase
    });

  }

  registerMuseAccount(muserName, password) {
    this.setMuseSocket();
    return new Promise((resolve, reject) => {
      this.getPrivateKeys(muserName, password).then((keys: MuseKeys) => {

        muse.broadcast.accountCreate(
          Config.faucet_config.private_wif,
          Config.faucet_config.account_creation_fee,
          Config.faucet_config.account,
          muserName,
          {
            'weight_threshold': 1,
            'account_auths': [],
            'key_auths': [[keys.ownerPubkey, 1]]
          },
          {
            'weight_threshold': 1,
            'account_auths': [],
            'key_auths': [[keys.activePubkey, 1]]
          },
          {
            'weight_threshold': 0,
            'account_auths': [],
            'key_auths': [[keys.basicPubkey, 1]]
          }, keys.memoPubkey, {}, function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
      });
    }).then(() => {
      muse.broadcast.transferToVestingAsync(Config.faucet_config.private_wif, Config.faucet_config.account, muserName, '0.01 2.28.0');
    }).catch((err) => {
      this.alert.showErrorMessage('registerMuseAccount(): ' + err);
    });
  }

  getPrivateKeys(muserName, password): Promise<void | MuseKeys> {
    this.setMuseSocket();
    // Note: Returns private keys for the password provided, can be used to generate new keys
    return new Promise<MuseKeys>(function (resolve, reject) {
      const keys = muse.auth.getPrivateKeys(muserName, password, ['owner', 'active', 'basic', 'memo']);
      if (!keys) { reject('Failed to load keys.'); }
      resolve(keys);
    }).catch((err) => {
      this.alert.showErrorMessage('getPrivateKeys(): ' + err);
    });

  }

  updateAccountKeys(muserName, password, newPassword, ownerPubkey, activePubkey, basicPubkey, memoPubkey): Promise<void | boolean> {
    const alert = this.alert;
    this.setMuseSocket();
    return new Promise<boolean>(function (resolve, reject) {
      muse.updateAccountKeys(muserName, password, ownerPubkey, activePubkey, basicPubkey, memoPubkey, (code, message) => {
        if (code === 0) {
          CryptoService.encrypt(newPassword);
          alert.showSuccessMessage('Password Changed!', 'Your password has been successfully changed.'); // TODO: Set messages in a resource file
          resolve(true);
        } else {
          reject(message);
        }
      });
    }).catch((err) => {
      this.alert.showErrorMessage('updateAccountKeys(): ' + err);
    });
  }

  // region Roles

  isUser(user: any): boolean {
    const allowed = ['admin', 'management', 'user'];
    return this.checkAuthorization(user, allowed);
  }

  isManagement(user: any): boolean {
    const allowed = ['admin', 'management'];
    return this.checkAuthorization(user, allowed);
  }

  isAdmin(user: any): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(muser: Muser, allowedRoles: string[]): boolean {

    if (!muser) {
      return false;
    }

    for (const role of allowedRoles) {
      if (muser && muser.roles && muser.roles[role]) {
        if (muser.roles[role]) {
          return true;
        }
      }
    }

    return false;
  }

  // endregion

}
