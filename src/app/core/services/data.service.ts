import { error } from 'util';
import { Local } from 'protractor/built/driverProviders';
import { Injectable, Optional } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
// import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import * as muse from 'museblockchain-js';
import * as firebase from 'firebase';

import { Utils } from '../../core/utils';
import { CryptoService } from '../../core/services/crypto.service';
import { AlertService } from '../../core/services/alert.service';
import { VerificationService } from '../../core/services/verification.service';
import { ErrorCodes } from '../../core/enums';

import { Config } from '../../../config/config';
import { Router } from '@angular/router';

// import { Validator } from '../validator';

@Injectable()
export class DataService {
  private muserData: any;
  private muserName: string;
  private isAuthenticated: any;

  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private userVerification: VerificationService,
    private alert: AlertService,
    private router: Router
  ) {
  }

  museConfig() {
    this.setConfig();
    this.getConfig();
  }
  // because of the way we instantiate muse we must set config each time we use a function.
  setConfig() {
    return muse.config.set('websocket', 'wss://api.muse.blckchnd.com');
  }
  getConfig() {
    return muse.api.getConfig(function (err, response) {
    });
  }

  getAccount(muserName) {
    this.museConfig();
    return muse.api.getAccounts([muserName])
      .then((result) => result);
  }

  getAccount$(muserName) { // publisher of Muser Data
    return new Observable((observer: Observer<any>) => {
      fromPromise(this.getAccount(muserName).then((result => {
        observer.next(result);
      })));
    });
  }

  streamAccountInfo$(muserName) {
    this.museConfig();

    // return new Observable((observer: Observer<any>) => {
    //   muse.api.streamOperationsAsync(this.getAccount$(muserName).subscribe(
    //     result => {
    //     observer.next(result);
    //   }
    //   ));
    // });

    // return new Observable((observer: Observer<any>) => {
    //   muse.api.streamOperationsAsync(fromPromise(this.getAccount(muserName).then((result => {
    //     console.log(JSON.stringify(result));
    //     observer.next(result);

    //   }))));
    // });

    return new Observable((observer: Observer<any>) => {
      muse.api.streamOperationsAsync((err, result) => {
        this.getAccount(muserName).then((results => {
          observer.next(results);
        }));
      });
    });
  }

  streamingAccounts(muserName) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.api.streamOperations(muserName, 1,
        function (err, success) {
          if (err) {
            reject(err);
          } else {
            resolve(success);
          }
        });
    }).catch((err) => {
      this.alert.showErrorMessage('streamingAccounts(): ' + err);
    });
  }


  authAccount(muserName, password) {
    // this.localSt.store('isAuthenticatedTEST', 'TEST');

    this.museConfig();
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

  // createAccount(muserName: string, password: string /*, phoneNumber: number*/, email: string) {
  //   return new Promise((resolve, reject) => {
  //     this.muserName = muserName.toLocaleLowerCase();
  //     this.muserData = this.getAccount(muserName).then((results => {
  //       if (results.length === 0) {
  //         // also check for password length
  //         firebase.auth().createUserWithEmailAndPassword(email, this.muserName)
  //           .then((success) => {
  //             this.verifyAccount(muserName, password/*, phoneNumber*/);
  //           }).catch((err) => {
  //             this.alert.showErrorMessage('createUserWithEmailAndPassword(): ' + err);
  //           });
  //       } else {
  //         this.alert.showErrorMessage(ErrorCodes.muserNameAlreadyInUse);
  //       }
  //     }));
  //   }).catch((err) => {
  //     this.alert.showErrorMessage('createAccount(): ' + err);
  //     // TODO: Add in Error Logging. Most likely write errors to firebase
  //   });
  // }


  createAccount(muserName: string, password: string /*, phoneNumber: number*/, email: string) {
    this.muserName = muserName.toLocaleLowerCase();
    this.muserData = this.getAccount$(muserName);
    this.muserData.subscribe(
      dataExist => {
        if (dataExist.length === 0) {
          // also check for password length
          firebase.auth().createUserWithEmailAndPassword(email, this.muserName)
            .then((success) => {
              this.verifyAccount(muserName, password/*, phoneNumber*/);
            }).catch((err) => {
              this.alert.showErrorMessage('createAccount(): ' + err);
            });
        } else {
          this.alert.showErrorMessage(ErrorCodes.muserNameAlreadyInUse);
        }
      }
    );
  }

  verifyAccount(muserName, password /*, phoneNumber*/) {
    try {
      // TODO: how to handle if user does not complete verification in one sitting?
      if (!firebase.auth().currentUser.emailVerified) {
        this.userVerification.sendEmailVerification().then(() => {
        });

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
      emailVerified: user.emailVerified,
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
    this.museConfig();
    return new Promise((resolve, reject) => {
      this.generateKeys(muserName, password).then((keys: any) => {
        // try {
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
        // } catch (error) {
        //   this.alert.showErrorMessage('muse.broadcast.accountCreate(): ' + error);
        //   // TODO: Add in Error Logging. Most likely write errors to firebase
        // }
      });
    }).then(() => {
      muse.broadcast.transferToVestingAsync(Config.faucet_config.private_wif, Config.faucet_config.account, muserName, '0.01 2.28.0');
    }).catch((err) => {
      this.alert.showErrorMessage('registerMuseAccount(): ' + err);
      // TODO: Add in Error Logging. Most likely write errors to firebase
    });
  }

  generateKeys(muserName, password) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      const keys = muse.auth.getPrivateKeys(muserName, password, ['owner', 'active', 'basic', 'memo']);
      if (keys) {
        resolve(keys);
      } else {
        reject();
        this.alert.showErrorMessage('generateKeys(): ');
      }
    });
  }

  getAccountHistory(muserName) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.api.getAccountHistory(muserName, 9999, 24,
        function (err, success) {
          if (err) {
            reject(err);
          } else {
            const fakearray = [];
            for (const each of success) {
              let history_info;
              switch (each[1].op[0]) {
                case 'account_create':
                  if (each[1].op[1].creator === muserName) {
                    history_info = 'Created Account ' + each[1].op[1].new_account_name;
                  }
                  else if (each[1].op[1].new_account_name === muserName) {
                    history_info = 'Account Creation';
                  }
                  break;
                case 'transfer':
                  if (each[1].op[1].to === muserName) {
                    history_info = 'Received ' + each[1].op[1].amount.split(' ')[0] + ' MUSE from ' + each[1].op[1].from;
                  }
                  else {
                    history_info = 'Sent ' + each[1].op[1].amount.split(' ')[0] + ' MUSE to ' + each[1].op[1].to;
                  }
                  break;
                case 'transfer':
                  if (each[1].op[1].to === muserName) {
                    history_info = 'Received ' + each[1].op[1].amount.split(' ')[0] + ' MUSE from ' + each[1].op[1].from;
                  }
                  else {
                    history_info = 'Sent ' + each[1].op[1].amount.split(' ')[0] + ' MUSE to ' + each[1].op[1].to;
                  }
                  break;

                case 'transfer_to_vesting':
                  if (each[1].op[1].to === muserName) {
                    // history_info = 'Received ' + each[1].op[1].amount.split(' ')[0] + ' VEST from ' + each[1].op[1].from;
                    history_info = 'Transferred ' + each[1].op[1].amount.split(' ')[0] + ' MUSE to VEST';
                  }
                  else {
                    history_info = 'Sent ' + each[1].op[1].amount.split(' ')[0] + ' VEST to ' + each[1].op[1].to;
                  }
                  break;
                case 'withdraw_vesting':
                  history_info = 'Withdrawing ' + each[1].op[1].vesting_shares.split(' ')[0] + ' VEST';
                  break;
                case 'account_witness_vote':
                  if (each[1].op[1].approve) {
                    history_info = each[1].op[1].account + ' Voted Witness ' + each[1].op[1].witness;
                  }
                  else {
                    history_info = each[1].op[1].account + ' UnVoted Witness ' + each[1].op[1].witness;
                  }
                  break;
                case 'witness_update':
                  history_info = 'Witness Update';
                  break;
                case 'account_update':
                  history_info = 'Account Update';
                  break;
                case 'content':
                  history_info = 'Content Listed: URL: ' + each[1].op[1].url + ' Uploader: ' + each[1].op[1].uploader;
                  break;
                case 'fill_vesting_withdraw':
                  history_info = 'Withdrawal of VESTS from: ' + each[1].op[1].from_account + ' to: ' + each[1].op[1].to_account + ' of ' + each[1].op[1].deposited.split(' ')[0];
                  break;
                case 'custom_json':
                  history_info = 'Custom Json ' + each[1].op[1].id + ' ' + each[1].op[1].json + ' ' + each[1].op[1].required_auths + ' ' + each[1].op[1].required_basic_auths;
                  break;
                default:
                  history_info = 'Unknown operation: ' + each[1].op[0];
              }
              fakearray.push(history_info);
              // console.log(each);
              // define case switches here.
              // fakearray.push(each[1].timestamp.split('T')[0] + ' ' + each[1].op[0] + ' ' + JSON.stringify(each[1].op[1]));
            }
            const makecorrectorder = fakearray.reverse();
            // console.log(fakearray);
            resolve(makecorrectorder);

          }
        });
    }).catch((err) => {
      this.alert.showErrorMessage('getAccountHistory(): ' + err);
    });
  }

  getWitnesses() {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.api.getWitnessesByVote('', 100,
        function (err, success) {
          if (err) {
            reject(err);
          } else {
            resolve(success);
          }
        });
    }).catch((err) => {
      this.alert.showErrorMessage('getWitnesses(): ' + err);
    });
  }

  getUrlData(getData) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.api.getContentByUrl(getData,
        function (err, success) {
          if (err) {
            reject(err);
          } else {
            resolve(success);
          }
        });
    }).catch((err) => {
      this.alert.showErrorMessage('getUrlData(): ' + err);
    });
  }

  getDataForUser(getData) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.api.getContentByUploader(getData,
        function (err, success) {
          if (err) {
            reject(err);
          } else {
            resolve(success);
          }
        });
    }).catch((err) => {
      this.alert.showErrorMessage('getDataForUser(): ' + err);
    });
  }

  // optionally provide a lowerbound parameter to lookup by
  getContentorAll(getData) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.api.lookupContent(getData, 50,
        function (err, success) {
          if (err) {
            reject(err);
          } else {
            resolve(success);
          }
        });
    }).catch((err) => {
      this.alert.showErrorMessage('getContentorAll(): ' + err);
    });
  }

  // optionally provide a lowerbound parameter to lookup by
  getStreamingPlatforms(getData) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.api.lookupStreamingPlatformAccounts(getData, 50,
        function (err, success) {
          if (err) {
            reject(err);
          } else {
            resolve(success);
          }
        });
    }).catch((err) => {
      this.alert.showErrorMessage('getStreamingPlatforms(): ' + err);
    });
  }

  getAllAccounts() {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.api.lookupAccounts('', 9999,
        function (err, success) {
          if (err) {
            reject(err);
          } else {
            resolve(success);
          }
        });
    }).catch((err) => {
      this.alert.showErrorMessage('getAllAccounts(): ' + err);
    });
  }

  postContent(authKey, muserName, submitContent) {
    this.museConfig();
    const actualActkey = muse.auth.getPrivateKeys(muserName, authKey);
    return new Promise(function (resolve, reject) {
      muse.broadcast.content(
        actualActkey.active,
        muserName,
        submitContent.ipfsUrl,
        {
          'part_of_album': submitContent.partofAlbum, // bool
          'album_title': submitContent.albumTitle,
          'album_artist': submitContent.albumArtistlist, // array
          'genre_1': submitContent.albumGenre, // integer ??? what do these numbers relate to?
          'country_of_origin': submitContent.countryOrigin,
          'explicit_': submitContent.explicit, // apperently int???? wtf?
          'p_line': submitContent.albumPline,
          'c_line': submitContent.albumCline,
          'upc_or_ean': submitContent.upcEan,
          'release_date': submitContent.releaseDate, // integer
          'release_year': submitContent.releaseYear, // integer
          'sales_start_date': submitContent.salesStartDate, // integer
          'master_label_name': submitContent.masterLabelName,
          'album_producer': submitContent.albumProducer,
          'albumType': submitContent.albumType,
          'display_label_name': submitContent.displayLabelName
        },
        {
          'track_title': submitContent.trackTitle,
          'ISRC': submitContent.isrc,
          'track_artists': submitContent.trackArtistlist, // array
          'featured_artist': submitContent.featuredArtist, // string
          'featured_artist_ISNI': submitContent.featuredArtistISNI, // int
          'genre_1': submitContent.trackGenre, // integer
          'p_line': submitContent.trackPline,
          'track_no': submitContent.trackNo, // integer
          'track_volume': submitContent.trackVolumeNumber, // integer // this is volume number not volume level
          'track_duration': 0, // integer // still trying to figure the purpose of this
          'samples': submitContent.samples // bool
        },
        {
          'composition_title': submitContent.compositionTitle,
          'alternate_composition_title': submitContent.compositionTitleAlt,
          'ISWC': submitContent.iswc,
          'third_party_publishers': submitContent.thirdParty, // bool
          'publishers': submitContent.compositionPublisherslist, // array
          'writers': submitContent.compositionWriterslist, // array
          'PRO': submitContent.pro
        },
        submitContent.masterdist,
        // [{'payee': muserName, 'bp': 10000}], // This array describes the distributions for master side, total must equal 10k between all entries.
        submitContent.masterright,
        // [{'voter': muserName, 'percentage': 100}], // This array describes the voting rights on the master side.
        submitContent.masterthresh, // 100, // Management threshold on master side
        submitContent.compdist, // [], // distributions_comp this array describes the distributions for composition side.
        submitContent.compright, // [], // management_comp this array describes the voting rights on the composition side.
        submitContent.compthresh, // 100, // management threshold composition side
        submitContent.playreward, // 10, // playing reward
        submitContent.pubshare, // 5000, // publishers share
        function (err, success) {
          if (err) {
            // console.log(err);
            reject(err);
          } else {
            // console.log(success);
            resolve(success);
          }
        });
    }).catch((err) => {
      this.alert.showErrorMessage('postContent(): ' + err);
    });
  }

  transferMuse(muserName, password, transferTo, amount, memo) {
    this.museConfig();
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
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.transferFundsToVestings(muserName, password, null, amount, function (err, success) {
        if (err === -1) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    }).catch((err) => {
      this.alert.showErrorMessage('transferMusetoVest(): ' + err);
    });
  }
  withdrawVesting(muserName, password, amount) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.withdrawVesting(muserName, password, amount, function (err, success) {
        if (err === -1) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    }).catch((err) => {
      this.alert.showErrorMessage('withdrawVesting(): ' + err);
    });
  }
}
