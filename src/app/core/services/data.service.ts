import { Injectable } from '@angular/core';
import { AlertService } from '../../core/services/alert.service';
import * as muse from 'museblockchain-js';

@Injectable()
export class DataService {

  constructor(
    private alert: AlertService
  ) { }

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

  postContent(authKey, muserName, content) {
    this.museConfig();
    const actualActkey = muse.auth.getPrivateKeys(muserName, authKey);

    console.log('content: ' + JSON.stringify(content));
    console.log('album_meta: ' + JSON.stringify(content.album_meta));
    console.log('track_meta: ' + JSON.stringify(content.track_meta));
  
    return new Promise(function (resolve, reject) {
      muse.broadcast.content(
        // actualActkey.active,
        // muserName,
        // content.url,

        // content.album_meta,
        // content.track_meta,
        // {
          
        //   part_of_album: content.partOfAlbum,
        //   album_title: content.albumTitle,
        //   album_artist: content.albumArtists,
        //   genre_1: content.albumGenre1,
        //   genre_2: content.albumGenre2,
        //   country_of_origin: content.countryOrigin,
        //   explicit_: content.explicit,
        //   p_line: content.albumPLine,
        //   c_line: content.albumCLine,
        //   upc_or_ean: content.upcEan,
        //   release_date: content.releaseDate,
        //   release_year: content.releaseYear,
        //   sales_start_date: content.salesStartDate,
        //   album_producer: content.albumProducer,
        //   album_type: content.albumType,
        //   master_label_name: content.masterLabelName,
        //   display_label_name: content.displayLabelName,
        // },
        // {
        //   track_title: content.trackTitle,
        //   ISRC: content.isrc,
        //   track_artists: content.trackArtists,
        //   featured_artist: content.featuredArtist,
        //   featured_artist_ISNI: content.featuredArtistIsni,
        //   track_producer: content.trackProducer,
        //   genre_1: content.trackGenre1,
        //   genre_2: content.trackGenre2,
        //   p_line: content.trackPLine,
        //   track_no: content.trackNo,
        //   track_volume: content.trackVolumeNo,
        //   copyright: content.copyright,
        //   track_duration: content.trackDuration,
        //   samples: content.hasSample,
        // },
        // {
        //   composition_title: content.compTitle,
        //   alternate_composition_title: content.compTitleAlt,
        //   ISWC: content.compTitleIswc,
        //   third_party_publishers: content.isThirdPartyPublishers,
        //   publishers: content.publishers,
        //   writers: content.writers,
        //   PRO: content.performingRightsOrg,
        // },
        // content.distributions,
        // content.management,
        // content.management_threshold,
        // content.distributionsComp,
        // content.managementComp,
        // content.management_threshold_comp,
        // content.playing_reward,
        // content.publishers_share,

        function (err, success) {

          if (err) {
            reject(err);
          } else {
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

  // endregion

}
