import { Injectable, Inject, NgZone, Input } from '@angular/core';
import * as muse from 'museblockchain-js';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { LocalStorageService, SessionStorageService} from 'ngx-webstorage'; // https://github.com/PillowPillow/ng2-webstorage
import * as cryptojs from 'crypto-js';
// import { Muser } from '../modals/muser.modal';

@Injectable()
export class DataService
{

  private isAuthen: any;
  public userSuccess: any;
  getData: any;
  submitContent: any;
  private authUser: any;
  private authKey: any;

  constructor(
    private zone: NgZone
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
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', authUser);
          // localStorage.setItem('password', authKey);

          localStorage.setItem('password', cryptojs.AES.encrypt(authKey, authUser));
          // const test = localStorage.getItem('encrypt');
          // const decrypt = cryptojs.AES.decrypt(test.toString(), authUser);
          // localStorage.setItem('decryptedData', JSON.stringify(decrypt.toString(cryptojs.enc.Utf8)));
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
              submitContent.ipfsUrl,
              {
                'part_of_album': submitContent.partofAlbum, // bool
                'album_title': submitContent.albumTitle,
                'album_artist': [authUser], // array
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
                'artist': [authUser], // array
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
              // [{'payee': authUser, 'bp': 10000}], // This array describes the distributions for master side, total must equal 10k between all entries.
              submitContent.masterright,
              // [{'voter': authUser, 'percentage': 100}], // This array describes the voting rights on the master side.
              submitContent.masterthresh, // 100, // Management threshold on master side
              submitContent.compdist, // [], // distributions_comp this array describes the distributions for composition side.
              submitContent.compright, // [], // management_comp this array describes the voting rights on the composition side.
              submitContent.compthresh, // 100, // management threshold composition side
              submitContent.playreward, // 10, // playing reward
              submitContent.pubshare, // 5000, // publishers share
              function(err, success) {
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
