// Angular & Rxjs
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';

// Services
import { AlertService } from './alert.service';

// Api
import * as muse from 'museblockchain-js';
import { MuseAccountHistory } from '../modals/muse-account-history';

@Injectable()
export class MuseService {

  constructor(
    private alertService: AlertService
  ) { }

  setMuseSocket() {
    muse.config.set('websocket', 'wss://api.muse.blckchnd.com');
  }

  getAccount(muserName): Promise<any> {
    this.setMuseSocket();
    return muse.api.getAccounts([muserName]).catch((err) => {
      this.alertService.showErrorMessage('getAccountHistory(): ' + err);
    });
  }

  streamAccountInfo$(muserName): Observable<any> {
    this.setMuseSocket();
    return new Observable((observer: Observer<any>) => {
      muse.api.streamOperationsAsync((err, result) => {
        muse.api.getAccounts([muserName]).then((results => {
          observer.next(results);
        }));
      });
    });
  }

  getAccountHistory(muserName): Promise<MuseAccountHistory[]> {
    this.setMuseSocket();

    return new Promise(function (resolve, reject) {
      muse.api.getAccountHistory(muserName, 9999, 24, function (error, result) {


        if (error) {
          reject(error);
        }

        if (!error) {

          const MuseAccountHistories: MuseAccountHistory[] = [];

          result.forEach(museHistory => {
            const accountHistory: MuseAccountHistory = new MuseAccountHistory();
            accountHistory.mapHistory(museHistory[1]);
            MuseAccountHistories.push(accountHistory);
          });

          resolve(MuseAccountHistories.reverse());

        }

      }).catch((err) => {
        this.alertService.showErrorMessage('getAccountHistory(): ' + err);
      });
    });

  }

  getWitnesses() {
    this.setMuseSocket();
    return new Promise(function (resolve, reject) {
      muse.api.getWitnessesByVote('', 100, function (err, success) {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    }).catch((err) => {
      this.alertService.showErrorMessage('getWitnesses(): ' + err);
    });
  }

  transferMuse(muserName, password, transferTo, amount, memo) {
    this.setMuseSocket();
    return new Promise(function (resolve, reject) {
      muse.transferFunds(muserName, password, transferTo, amount, memo, function (err, success) {
        if (err === -1) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
  }

  transferMusetoVest(muserName, password, amount) {
    this.setMuseSocket();
    return new Promise(function (resolve, reject) {
      muse.transferFundsToVestings(muserName, password, null, amount, function (err, success) {
        if (err === -1) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    }).catch((err) => {
      this.alertService.showErrorMessage('transferMusetoVest(): ' + err);
    });
  }

  withdrawVesting(muserName, password, amount) {
    this.setMuseSocket();
    return new Promise(function (resolve, reject) {
      muse.withdrawVesting(muserName, password, amount, function (err, success) {
        if (err === -1) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    }).catch((err) => {
      this.alertService.showErrorMessage('withdrawVesting(): ' + err);
    });
  }

}
