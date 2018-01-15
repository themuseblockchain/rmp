import { Injectable, Inject } from '@angular/core';
import * as muse from 'muse-js';

@Injectable()
export class DataService
{

  dummyParameter: any;

constructor() {

}
    // getConfig() gets called from another angular component
    getConfig() {
      return muse.api.getConfig(function(err, response){console.log(response); } );
    }

    // 'dummyParameter' would be passed in from angular call from another component
    auth(dummyParameter) {
      // logic to transform data if needed and then
      // return muse.function;
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
