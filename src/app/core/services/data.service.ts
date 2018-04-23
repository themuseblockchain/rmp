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

  postContent(authKey, muserName, submitContent) {
    this.setMuseSocket();
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
  // getAllAccounts() {
  //   this.setMuseSocket();
  //   return new Promise(function (resolve, reject) {
  //     muse.api.lookupAccounts('', 9999,
  //       function (err, success) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(success);
  //         }
  //       });
  //   }).catch((err) => {
  //     this.alert.showErrorMessage('getAllAccounts(): ' + err);
  //   });
  // }

  // endregion

}
