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

// Models
import { Config } from '../../../config/config';
import { ErrorCodes } from '../../core/enums';
import { MuseKeys } from '../models/muse-keys';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor(
    private alert: AlertService,
    private museService: MuseService,
    private router: Router,
    private userVerification: VerificationService,
  ) { }

  private muserName: string;
  private isAuthenticated: any;

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
    const user = firebase.auth().currentUser;
    firebase.database().ref('musers/' + user.uid).set({
      muserName: muserName,
      dateAdded: new Date().toString(),
      email: user.email,
      emailVerified: user.emailVerified
      // phoneNumber: phoneNumber
    }).then(() => {
      const membersInfo = {};
      firebase.database().ref('muserNames').update({
        [muserName]: user.uid // <<< This may not be the best format
      }).catch((err) => {
        this.alert.showErrorMessage('createMuserProfileFireBase() >> db: ' + err);
        // TODO: Add in Error Logging. Most likely write errors to firebase
      });
    }).catch((err) => {
      this.alert.showErrorMessage('createMuserProfileFireBase(): ' + err);
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
              reject(this.alert.showErrorMessage('muse.broadcast.accountCreate(): ' + err));
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

  validateTesterKey(inputKey) {
    return new Promise((resolve, reject) => {
      const db = firebase.database();
      const ref = db.ref('BetaTesterKey/');
      ref.on('value', (snap) => {
        if (snap.val() === inputKey) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
}
