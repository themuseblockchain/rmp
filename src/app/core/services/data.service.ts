import { Injectable } from '@angular/core';
import { AlertService } from '../../core/services/alert.service';
import * as muse from 'museblockchain-js';

@Injectable()
export class DataService {

  constructor(
    private alert: AlertService
  ) { }

  setMuseSocket() {
    muse.config.set('websocket', 'wss://api.muse.blckchnd.com');
  }

  postContent(authKey, muserName, content) {
    this.setMuseSocket();
    const actualActkey = muse.auth.getPrivateKeys(muserName, authKey);
    return new Promise(function (resolve, reject) {
      muse.broadcast.content(

  // "params": 
  // ["uploader", "url", "album_meta", "track_meta", 
  // "comp_meta", "distributions", "management", 
  // "management_threshold", "distributions_comp", "management_comp", 
  // "management_threshold_comp", "playing_reward", "publishers_share"]

        actualActkey.active,
        muserName,
        content.ipfsUrl,
        // content.album_meta,
        // content.track_meta,
        // content.comp_meta,
        
        // content.distributions,
        // content.management,
        // content.management_threshold,

        // content.distributions_comp,
        // content.management_comp,
        // content.management_threshold_comp,
        // content.playing_reward,
        // content.publishers_share,
 
        {
          'part_of_album': content.partOfAlbum, 
          'album_title': content.albumTitle,
          'album_artist': content.albumArtists, 
          'genre_1': content.albumGenre1,
          'genre_2': content.albumGenre2,
          'country_of_origin': content.countryOrigin,
          'explicit_': content.explicit, 
          'p_line': content.albumPLine,
          'c_line': content.albumCLine,
          'upc_or_ean': content.upcEan,
          'release_date': content.releaseDate, 
          'release_year': content.releaseYear, 
          'sales_start_date': content.salesStartDate, 
          'master_label_name': content.masterLabelName,
          'album_producer': content.albumProducer,
          'albumType': content.albumType,
          'display_label_name': content.displayLabelName
        },
        {
          'track_title': content.trackTitle,
          'ISRC': content.isrc,
          'track_artists': content.trackArtistList, // array
          'featured_artist': content.featuredArtist, // string
          'featured_artist_ISNI': content.featuredArtistISNI, // int
          'genre_1': content.trackGenre1, // integer
          'genre_2': content.trackGenre2, // integer
          'p_line': content.trackPline,
          'track_no': content.trackNo, // integer
          'track_volume': content.trackVolumeNo, // integer // this is volume number not volume level
          'track_duration': 0, // integer // still trying to figure the purpose of this
          'samples': content.samples // bool
        },
        {
          'composition_title': content.compTitle,
          'alternate_composition_title': content.compTitleAlt,
          'ISWC': content.compTitleIswc,
          'third_party_publishers': content.isThirdPartyPublishers,
          'publishers': content.publishers, 
          'writers': content.writers, 
          'PRO': content.performingRightsOrg
        },



  // "distributions", 
  // "management", 
  // "management_threshold", 
  // "distributions_comp", 
  // "management_comp", 
  // "management_threshold_comp", 
  // "playing_reward", 
  // "publishers_share"]

        content.distributions, [{'payee': content.masterSplit.muserName, 'bp': content.masterSplit.bp}], // This array describes the distributions for master side, total must equal 10k between all entries.
        content.management, [{'voter': content.masterSplit.muserName, 'percentage': content.masterSplit.percentage}], // This array describes the voting rights on the master side.
        content.management_threshold, // 100, // Management threshold on master side
       
       
        content.distributions_comp, [{'payee': content.compSplit.muserName, 'bp': content.compSplit.bp}], // [], // distributions_comp this array describes the distributions for composition side.
        content.management_comp, [{'voter': content.compSplit.muserName, 'percentage': content.compSplit.percentage}], // [], // management_comp this array describes the voting rights on the composition side.
        content.management_threshold_comp, // 100, // management threshold composition side
        content.playing_reward, // 10, // playing reward
        content.publishers_share, // 5000, // publishers share


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

  // region Deprecated ???

  // Is this method deprecated ???
  // getConfig() {
  //   return muse.api.getConfig(function (err, response) { });
  // }

  // Is this method deprecated ???
  // streamingAccounts(muserName) {
  //   this.setMuseSocket();
  //   return new Promise(function (resolve, reject) {
  //     muse.api.streamOperations(muserName, 1,
  //       function (err, success) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(success);
  //         }
  //       });
  //   }).catch((err) => {
  //     this.alert.showErrorMessage('streamingAccounts(): ' + err);
  //   });
  // }

  // Is this method deprecated ???
  // getUrlData(getData) {
  //   this.setMuseSocket();
  //   return new Promise(function (resolve, reject) {
  //     muse.api.getContentByUrl(getData,
  //       function (err, success) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(success);
  //         }
  //       });
  //   }).catch((err) => {
  //     this.alert.showErrorMessage('getUrlData(): ' + err);
  //   });
  // }

  // Is this method deprecated ???
  // getDataForUser(getData) {
  //   this.setMuseSocket();
  //   return new Promise(function (resolve, reject) {
  //     muse.api.getContentByUploader(getData,
  //       function (err, success) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(success);
  //         }
  //       });
  //   }).catch((err) => {
  //     this.alert.showErrorMessage('getDataForUser(): ' + err);
  //   });
  // }

  // Is this method deprecated ???
  // optionally provide a lowerbound parameter to lookup by
  // getContentorAll(getData) {
  //   this.setMuseSocket();
  //   return new Promise(function (resolve, reject) {
  //     muse.api.lookupContent(getData, 50,
  //       function (err, success) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(success);
  //         }
  //       });
  //   }).catch((err) => {
  //     this.alert.showErrorMessage('getContentorAll(): ' + err);
  //   });
  // }

  // Is this method deprecated ???
  // optionally provide a lowerbound parameter to lookup by
  // getStreamingPlatforms(getData) {
  //   this.setMuseSocket();
  //   return new Promise(function (resolve, reject) {
  //     muse.api.lookupStreamingPlatformAccounts(getData, 50,
  //       function (err, success) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(success);
  //         }
  //       });
  //   }).catch((err) => {
  //     this.alert.showErrorMessage('getStreamingPlatforms(): ' + err);
  //   });
  // }

  // Is this method deprecated ???
  getAllAccounts() {
    this.setMuseSocket();
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

  // endregion

}
