import { Injectable, Inject, NgZone, Input } from '@angular/core';
import * as muse from 'muse-js';
import * as Rx from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import CryptoJS from 'crypto-js';


@Injectable()
export class DataService
{

 private isAuthen: any;
 public userSuccess: any;
 getAccountParameter: any;
 getUrlDataParameter: any;
 getDataForUserParameter: any;
 getContentorAllParameter: any;
 getStreamingPlatformsParameter: any;
 getPostContentData: any;
 authAccountParameterUser: any;
 authAccountParameterKey: any;

constructor( 
            private zone: NgZone,
            private http: HttpClient,
            protected storage: AsyncLocalStorage
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

   getAccount(userName) {
     this.museConfig();
     muse.accountInfo(userName, function(err, response, data)
     {
       console.log(data);
     });
   }
   getUrlData(getUrlDataParameter) {
     this.museConfig();
     return muse.api.getContentByUrl(getUrlDataParameter, function(err, response, data)
     {
       console.log(response);
     });
   }
   getDataForUser(getDataForUserParameter) {
     this.museConfig();

     return muse.api.getContentByUploader(getDataForUserParameter, function(err, response, data)
     {
       console.log(response);
     });
   }

   // optionally provide a lowerbound parameter to lookup by

   getContentorAll(getContentorAllParameter) {
     this.museConfig();
     return muse.api.lookupContent(getContentorAllParameter, 50, function(err, response, data)
     {
       console.log(response);
     });
   }

   // optionally provide a lowerbound parameter to lookup by

   getStreamingPlatforms(getStreamingPlatformsParameter) {
     this.museConfig();
     return muse.api.lookupStreamingPlatformAccounts(getStreamingPlatformsParameter, 50, function(err, response, data)
     {
       console.log(err, response, data);
     });
   }

   getAllAccounts(){
     this.museConfig();
     return muse.api.lookupAccounts('', 9999, function(err, response, data)
     {
       console.log(err, response, data);
     });
   }



    authAccount(user, key) {
      this.museConfig();
        // return new Promise((resolve, reject) => {
        //     this.http.get('api/e-commerce-orders/')
        //         .subscribe((response: any) => {
        //             this.order = response;
        //             this.onOrderChanged.next(this.order);
        //             resolve(response);
        //         }, reject);
        // });



        // return new Promise((resolve, reject) => {
        //     muse.login(user, key, function(err, response, data)
        //         {
        //           this.storage.setItem('isAuthenticated', response).subscribe(() => {});
        //             // resolve(response);
        //         }, reject);
        // });
 
         muse.login(user, key, function (err, response, data) {
            this.storage.setItem('isAuthenticated', response).subscribe(() => {});
          });


      // return new Promise((resolve, reject) => {
      //     muse.login(user, key, function(err, response, data) {
      //     // if (response === 'Success')
      //     // { 
      //       this.storage.setItem('isAuthenticated', response).subscribe(() => {
      //         // Done
      //            resolve(response);
      //       });
      //     })
      //     .then((response) => { console.log(response); })
      //       .catch((err) => { console.log(err); });
      //     }); 
         
          

    
    }
    postContent(authAccountParameterKey, authAccountParameterUser, getPostContentData) {
      this.museConfig();
      muse.broadcast.content(
        authAccountParameterKey,
        authAccountParameterUser,
        getPostContentData.url,
        {
          'part_of_album': getPostContentData.part_of_album, // bool
          'album_title': getPostContentData.lbum_title,
          'album_artist': [authAccountParameterUser],
          'genre_1': getPostContentData.genre_1,
          'country_of_origin': getPostContentData.country_of_origin,
          'explicit_': getPostContentData.explicit_, // bool
          'p_line': getPostContentData.p_line,
          'c_line': getPostContentData.c_line,
          'upc_or_ean': getPostContentData.upc_or_ean,
          'release_date': getPostContentData.release_date,
          'release_year': getPostContentData.release_year,
          'sales_start_date': getPostContentData.sales_start_date,
          'master_label_name': getPostContentData.master_label_name,
          'display_label_name': getPostContentData.display_label_name
        },
        {
          'track_title': getPostContentData.track_title,
          'ISRC': getPostContentData.ISRC,
          'track_artists': [authAccountParameterUser],
          'genre_1': getPostContentData.genre_1,
          'p_line': getPostContentData.track_p_line,
          'track_no': getPostContentData.track_no,
          'track_volume': getPostContentData.track_volume,
          'track_duration': getPostContentData.track_duration,
          'samples': getPostContentData.samples // bool
        },
        {
          'composition_title': getPostContentData.composition_title,
          'third_party_publishers': getPostContentData.third_party_publishers, // bool
          'publishers': getPostContentData.publishers,
          'writers': getPostContentData.writers,
          'PRO': getPostContentData.pro
        },

        [{
          'payee': authAccountParameterUser,
          'bp': 10000
        }
        ],
        [{
          'voter': authAccountParameterUser,
          'percentage': 100
        }
        ],
        100,
        [],
        [],
        100,
        10,
        5000,
    function(err, result){
    // return(err, result);
      });
    }
}
