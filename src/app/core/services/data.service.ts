import { Injectable, Inject } from '@angular/core';
import * as muse from 'muse-js';

@Injectable()
export class DataService
{

  dummyParameter: any;

constructor() {

}
    //because of the way we instantiate muse we must set config each time we use a function.
    setConfig() {
    return muse.config.set('websocket','wss://api.muse.blckchnd.com');
  }
    // getConfig() gets called from another angular component
    getConfig() {
      return muse.api.getConfig(function(err, response){console.log(response);
      });
    }

    getAccount(dummyParameter) {
      return muse.accountInfo(dummyParameter,function(err,response, data)
      {
      console.log(data);
      });
    }
    getUrlData(dummyParameter) {
      return muse.api.getContentByUrl(dummyParameter,function(err,response, data)
      {
      console.log(response);
      });
    }
    getDataForUser(dummyParameter) {
      return muse.api.getContentByUploader(dummyParameter,function(err,response, data)
      {
      console.log(response);
      });
    }

    //optionally provide a lowerbound parameter to lookup by

    getContentorAll(dummyParameter) {
      return muse.api.lookupContent(dummyParameter, 50,function(err,response, data)
      {
      console.log(response);
      });
    }

    //optionally provide a lowerbound parameter to lookup by

    getStreamingPlatforms(dummyParameter) {
      return muse.api.lookupStreamingPlatformAccounts(dummyParameter, 50,function(err,response, data)
      {
      console.log(err, response, data);
      });
    }

    getAllAccounts(){
      return muse.api.lookupAccounts("", 9999, function(err,response, data)
      {
        console.log(err,response, data)
      });
    }


    // 'dummyParameter' would be passed in from angular call from another component
    authAccount(dummyParameter) {
      // logic to transform data if needed and then
      // return muse.function;
      return muse.login(dummyParameter, function(err,response, data)
      {
        console.log(err,response, data)
      });

    }

    broadcast() {
      // return muse.function;
    }

   formatter() {
      // return muse.function;
  }

  memo() {
      // return muse.function;
  }

}
