import { Injectable, Inject, NgZone, Input } from '@angular/core';
import { Utils } from '../../core/utils';
import { Muser } from '../modals/muser.modal';
import * as muse from 'museblockchain-js';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CryptoService } from '../../core/services/crypto.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { of } from 'rxjs/observable/of';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
// import { MuserService } from './muser.service';


@Injectable()
export class DataService {
  // muser = this.muser.asObservable();
  private muserData: any;
  // private muserData: Observable<any>;
  private values: any;
  private anyErrors: boolean;
  private finished: boolean;


  constructor(private zone: NgZone) {

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
      .then((result) => result.map(this.transformUserInfo));
  }

  getAccount$(muserName) { // publisher of Muser Data
    return new Observable((observer: Observer<any>) => {
      fromPromise(this.getAccount(muserName).then((result => {
        observer.next(result);
      })));

      // return this.muserData = Observable.of(1)
      //   .switchMap(x => fromPromise(this.getAccount(muserName))
      //   );
    });
  }



  streamAccountInfo$(muserName) { // publisher of Muser Data
    this.museConfig();

    // return new Observable((observer: Observer<any>) => {
    //   muse.api.streamOperationsAsync(this.getAccount$(muserName).subscribe(
    //     result => {
    //     observer.next(result);
    //   }
    //   ));
    // });

    // return new Observable((observer: Observer<any>) => {
    //   muse.api.streamOperations(fromPromise(this.getAccount(muserName).then((result => {
    //     console.log(JSON.stringify(result));
    //     observer.next(result);

    //   }))));
    // });


    // ======================
    // working Observable
    // ======================
    return new Observable((observer: Observer<any>) => {
      muse.api.streamOperationsAsync((err, result) => {
        this.getAccount(muserName).then((results => {
          observer.next(results);
        }));
      });
    });


    //   return new Observable((observer: Observer<any>) => {
    //      muse.api.streamOperations(this.getAccount(muserName).then((result => {
    //       observer.next(result);
    //     })));
    //   });
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
    });
  }

  private transformUserInfo(muser) {
    muser.meta = JSON.parse(muser.json_metadata);
    return muser;
  }

  authAccount(muserName, password) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.login(muserName, password, function (err, success) {
        if (err !== 1) {
          reject(err);
        } else {
          resolve(success);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', muserName);
          CryptoService.encrypt(password);
        }
      });
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
    });
  }

  // getAllAccounts$() {
  //   this.museConfig();
  //   const muserAccountInfo = new Observable(observer => {
  //     muse.api.lookupAccounts('', 9999, function (err, results) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         observer.next(results);
  //       }
  //     });
  //   });
  // }

  postContent(password, muserName, submitContent) {
    this.museConfig();
    return new Promise(function (resolve, reject) {
      muse.broadcast.content(
        password,
        muserName,
        submitContent.ipfsUrl,
        {
          'part_of_album': submitContent.partofAlbum, // bool
          'album_title': submitContent.albumTitle,
          'album_artist': [muserName], // array
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
          'display_label_name': submitContent.displayLabelName
        },
        {
          'track_title': submitContent.trackTitle,
          'ISRC': submitContent.isrc,
          'artist': [muserName], // array
          'track_artists': submitContent.trackArtists, // array
          'genre_1': submitContent.trackGenre, // integer
          'p_line': submitContent.trackPline,
          'track_no': submitContent.trackNo, // integer
          'track_volume': submitContent.trackVolume, // integer // this is volume number not volume level
          'track_duration': 0, // integer // still trying to figure the purpose of this
          'samples': submitContent.samples // bool
        },
        {
          'composition_title': submitContent.compositionTitle,
          'third_party_publishers': submitContent.thirdParty, // bool
          'publishers': submitContent.compositionPublishers, // array
          'writers': submitContent.compositionWriters, // array // wouldnt it be better to store both of these as one array???? this would be contract adjustments.
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
            console.log(err);
            reject(err);
          } else {
            console.log(success);
            resolve(success);
          }
        });
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
    });
  }
}
