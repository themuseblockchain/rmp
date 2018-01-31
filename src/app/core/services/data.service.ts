import { Injectable, Inject } from '@angular/core';
import * as muse from 'muse-js';
import * as Rx from 'rxjs/Rx';
 import { of } from 'rxjs/observable/of';

@Injectable()
export class DataService
{
 item: any;
 getAccountParameter: any;
 getUrlDataParameter: any;
 getDataForUserParameter: any;
 getContentorAllParameter: any;
 getStreamingPlatformsParameter: any;
 authAccountParameterUser: any;
 authAccountParameterKey: any;

constructor(
  
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
      // logic to transform data if needed and then return muse function;
      this.museConfig();
      return  muse.login(user, key, function(err, response, data)
        {
          console.log(err, response, data);
        });
       
      // Object.assign(this.item, (
      //   muse.login(user, key, function login(err, response, data)
      //   {
      //     this.item = response;
      //     console.log(err, response, data);
      //   })
      
      // ));
      // return this.item;

    }
}
