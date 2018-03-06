import { Injectable, Inject, NgZone, Input } from '@angular/core';
import * as muse from 'museblockchain-js';
import * as Rx from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { LocalStorageService, SessionStorageService} from 'ngx-webstorage'; // https://github.com/PillowPillow/ng2-webstorage
import CryptoJS from 'crypto-js';


@Injectable()
export class DataService
{

  private isAuthen: any;
  public userSuccess: any;
  getData: any;
  submitContent: any;
  authUser: any;
  authKey: any;

  constructor(
    private zone: NgZone,
    private http: HttpClient
    // private webLocalStorage: LocalStorageService,
    // private webSessionStorage: SessionStorageService
  ) {
  }


  //  private subject: Rx.Subject<MessageEvent>;
  museConfig(){
  this.setConfig();
  this.getConfig();
}
// because of the way we instantiate muse we must set config each time we use a function.
setConfig() {
return muse.config.set('websocket', 'wss://api.muse.blckchnd.com');
}
getConfig() {
  return muse.api.getConfig(function(err, response)
  {
    // console.log(response);
  });
}

getAccount(authUser) {
  this.museConfig();

  return muse.api.getAccounts([authUser])
  .then((result) => result.map(this.transformUserInfo));
}

private transformUserInfo(user) {
  user.meta = JSON.parse(user.json_metadata);
  // console.log(user);
  return user;
}

authAccount(authUser, authKey) {
  this.museConfig();
  return new Promise(function(resolve, reject){
    muse.login(authUser, authKey, function(err, success){
      if (err !== 1) {
        reject(err);
      } else {
        resolve(success);
        // this.webLocalStorage.observe('isAuthenticated').subscribe((value) => console.log('new value', value));
        // this.webLocalStorage.observe('currentUser').subscribe((value) => console.log('new value', value));
        // this.webLocalStorage.store('isAuthenticated', 'true');
        // this.webLocalStorage.observe('currentUser', authUser);
         localStorage.setItem('isAuthenticated', 'true');
         localStorage.setItem('currentUser', authUser);
      }
    });
  });
}

getAccountHistory(authUser) {
  this.museConfig();
  return new Promise(function(resolve, reject){
    muse.api.getAccountHistory(authUser, 9999, 24,
      function(err, success) {
        if (err) {
          reject(err);
        } else {
          const fakearray = [];
          // console.log(success);
          for (const each of success) {

          let history_info;

          switch (each[1].op[0])
          {
            case 'account_create':
            if (each[1].op[1].creator === authUser)
            {
              history_info = 'Created Account ' + each[1].op[1].new_account_name;
            }
            else if (each[1].op[1].new_account_name === authUser)
            {
              history_info = 'Account Creation';
            }
            break;
            case 'transfer':
            if (each[1].op[1].to === authUser)
            {
              history_info = 'Received ' + each[1].op[1].amount.split(' ')[0] + ' MUSE from ' + each[1].op[1].from;
            }
            else
            {
              history_info = 'Sent ' + each[1].op[1].amount.split(' ')[0] + ' MUSE to ' + each[1].op[1].to;
            }
            break;
            case 'transfer':
            if (each[1].op[1].to === authUser)
            {
              history_info = 'Received ' + each[1].op[1].amount.split(' ')[0] + ' MUSE from ' + each[1].op[1].from;
            }
            else
            {
              history_info = 'Sent ' + each[1].op[1].amount.split(' ')[0] + ' MUSE to ' + each[1].op[1].to;
            }
            break;

            case 'transfer_to_vesting':
            if (each[1].op[1].to === authUser)
            {
              // history_info = 'Received ' + each[1].op[1].amount.split(' ')[0] + ' VEST from ' + each[1].op[1].from;
              history_info = 'Transferred ' + each[1].op[1].amount.split(' ')[0] + ' MUSE to VEST';
            }
            else
            {
              history_info = 'Sent ' + each[1].op[1].amount.split(' ')[0] + ' VEST to ' + each[1].op[1].to;
            }
            break;
            case 'withdraw_vesting':
            history_info = 'Withdrawing ' + each[1].op[1].vesting_shares.split(' ')[0] + ' VEST';
            break;
            case 'account_witness_vote':

            if (each[1].op[1].approve)
            {
              history_info =  each[1].op[1].account + ' Voted Witness ' + each[1].op[1].witness;
            }
            else
            {
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
  return new Promise(function(resolve, reject){
    muse.api.getWitnessesByVote('', 100,
    function(err, success) {
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
  return new Promise(function(resolve, reject){
    muse.api.getContentByUrl(getData,
      function(err, success) {
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
    return new Promise(function(resolve, reject){
      muse.api.getContentByUploader(getData,
        function(err, success) {
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
      return new Promise(function(resolve, reject){
        muse.api.lookupContent(getData, 50,
          function(err, success) {
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
        return new Promise(function(resolve, reject){
          muse.api.lookupStreamingPlatformAccounts(getData, 50,
            function(err, success) {
              if (err) {
                reject(err);
              } else {
                resolve(success);
              }
            });
          });
        }

        getAllAccounts(){
          this.museConfig();
          return new Promise(function(resolve, reject){
            muse.api.lookupAccounts('', 9999,
            function(err, success) {
              if (err) {
                reject(err);
              } else {
                resolve(success);
              }
            });
          });
        }


        postContent(authKey, authUser, submitContent) {
          this.museConfig();
          return new Promise(function(resolve, reject){
            muse.broadcast.content(
              authKey,
              authUser,
              submitContent.url,
              {
                'part_of_album': submitContent.part_of_album, // bool
                'album_title': submitContent.album_title,
                'album_artist': [authUser], // array
                'genre_1': submitContent.genre_1, // integer ??? what do these numbers relate to?
                'country_of_origin': submitContent.country_of_origin,
                'explicit_': submitContent.explicit_, // apperently int???? wtf?
                'p_line': submitContent.p_line,
                'c_line': submitContent.c_line,
                'upc_or_ean': submitContent.upc_or_ean,
                'release_date': submitContent.release_date, // integer
                'release_year': submitContent.release_year, // integer
                'sales_start_date': submitContent.sales_start_date, // integer
                'master_label_name': submitContent.master_label_name,
                'display_label_name': submitContent.display_label_name
              },
              {
                'track_title': submitContent.track_title,
                'ISRC': submitContent.isrc,
                'artist': [authUser], // array
                'track_artists': submitContent.track_artists, // array
                'genre_1': submitContent.genre_1, // integer
                'p_line': submitContent.track_p_line,
                'track_no': submitContent.track_no, // integer
                'track_volume': submitContent.track_volume, // integer
                'track_duration': submitContent.track_duration, // integer
                'samples': submitContent.samples // bool
              },
              {
                'composition_title': submitContent.composition_title,
                'third_party_publishers': submitContent.third_party_publishers, // bool
                'publishers': submitContent.publishers, // array
                'writers': submitContent.writers, // array
                'PRO': submitContent.pro
              },

              [{
                'payee': authUser,
                'bp': 10000
              }
            ], // This array describes the distributions for master side, total must equal 10k between all entries.
            [{
            'voter': authUser,
            'percentage': 100
          }
        ], // This array describes the voting rights on the master side.
        100, // Management threshold on master side
        [], // distributions_comp this array describes the distributions for composition side.
        [], // management_comp this array describes the voting rights on the composition side.
        100, // management threshold composition side
        10, // playing reward
        5000, // publishers share
        function(err, success) {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
  }

  transferMuse(authUser, authKey, transferTo, amount, memo) {
    this.museConfig();
    return new Promise(function(resolve, reject){
      muse.transferFunds(authUser, authKey, transferTo, amount, memo, function(err, success){
        if (err === -1) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
  }

  transferMusetoVest(authUser, authKey, amount) {
    this.museConfig();
    return new Promise(function(resolve, reject){
      muse.transferFundsToVestings(authUser, authKey, null, amount, function(err, success){
        if (err === -1) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
  }

  withdrawVesting(authUser, authKey, amount) {
    this.museConfig();
    return new Promise(function(resolve, reject){
      muse.withdrawVesting(authUser, authKey, amount, function(err, success){
        if (err === -1) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
  }
}
