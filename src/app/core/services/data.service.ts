import { Injectable, Inject } from '@angular/core';
import * as muse from 'muse-js';

@Injectable()
export class DataService
{
 getAccountParameter: any;
 AccountDetails: any;
 getUrlDataParameter: any;
 getDataForUserParameter: any;
 getContentorAllParameter: any;
 getStreamingPlatformsParameter: any;
 authAccountParameterUser: any;
 authAccountParameterKey: any;

constructor() {

}
   // because of the way we instantiate muse we must set config each time we use a function.
   setConfig() {
     return muse.config.set('websocket', 'wss://api.muse.blckchnd.com');
   }
   getConfig() {
     return muse.api.getConfig(function(err, response){console.log(response); } );
   }

   getAccount(getAccountParameter) {
     return muse.accountInfo(getAccountParameter, function(err, response, data)
     {
       var AccountDetails = data;
       console.log(AccountDetails);
     });
   }
   getAccountHistory(getAccountParameter) {
     return muse.accountHistory(getAccountParameter, null, 1000, function(err, response, data)
     {
       console.log(err, response, data);
     });
   }
   getUrlData(getUrlDataParameter) {
     return muse.api.getContentByUrl(getUrlDataParameter, function(err, response, data)
     {
       console.log(response);
     });
   }
   getDataForUser(getDataForUserParameter) {
     return muse.api.getContentByUploader(getDataForUserParameter, function(err, response, data)
     {
       console.log(response);
     });
   }

   // optionally provide a lowerbound parameter to lookup by

   getContentorAll(getContentorAllParameter) {
     return muse.api.lookupContent(getContentorAllParameter, 50, function(err, response, data)
     {
       console.log(response);
     });
   }

   // optionally provide a lowerbound parameter to lookup by

   getStreamingPlatforms(getStreamingPlatformsParameter) {
     return muse.api.lookupStreamingPlatformAccounts(getStreamingPlatformsParameter, 50, function(err, response, data)
     {
       console.log(err, response, data);
     });
   }

   getAllAccounts(){
     return muse.api.lookupAccounts('', 9999, function(err, response, data)
     {
       console.log(err, response, data);
     });
   }

    authAccount(authAccountParameterUser,authAccountParameterKey) {
       // logic to transform data if needed and then                // logic to transform data if needed and then
       // return muse.function;                // return muse.function;
      return muse.login(authAccountParameterUser, authAccountParameterKey, function(err, response, data)
      {
        console.log(err, response, data);
      });
    }
}
