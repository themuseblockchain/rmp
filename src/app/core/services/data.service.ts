import { Injectable, Inject, NgZone, Input } from '@angular/core';
import * as muse from 'muse-js';
import * as Rx from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DataService
{
  public userSuccess: any;
 getAccountParameter: any;
 getUrlDataParameter: any;
 getDataForUserParameter: any;
 getContentorAllParameter: any;
 getStreamingPlatformsParameter: any;
 authAccountParameterUser: any;
 authAccountParameterKey: any;

constructor( private zone: NgZone

) { }

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
     return muse.api.getConfig(function(err, response){console.log(response); } );
   }

   getAccount(getAccountParameter) {
     this.museConfig();
     return muse.accountInfo(getAccountParameter, function(err, response, data)
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
      let userSuccess: any;

      userSuccess = muse.login(user, key, (err, response, data) => {
          return response;
        });
        this.zone.run(() => {
            this.userSuccess = userSuccess;
        });
        
      // if (muse.login(user, key, (err, response, data) => {
      //     return response === 'Success';
      //   })) {
      //     userSuccess = true;
      //   }
      //   this.zone.run(() => {
      //       this.userSuccess = userSuccess;
      //   });
      return userSuccess;
    }
}
