import { Injectable } from '@angular/core';
import * as muse from 'muse-js';

// I'm not sure how to import a .js lib, but I dont think it should be hard
// import { Muse_lib } from 'SOME_DIRECTORY';
// OR
// import * as Muse_lib from 'SOME_DIRECTORY';

@Injectable()
export class DataService {
  // Data Provider
  // This is the provider class for most of the Firebase observables in the app.

  constructor(
    // when Muse_lib is imported, change 'public muse: any' to 'public muse: Muse_lib'
    public muse: any) {
    console.log('Initializing Data Provider'); // console.log will be replaced by a logging compenent at a later time
  }

  // Broadcast Content
  // no data needs to be returned
  publishtContent() {
    this.muse.broadcast.publish_content();
  }

  ngOnInit() {
     return this.muse.getConfig();
  }

  // Update Content
  // data is returned to be used elsewhere
  updateContent() {
    return this.muse.broadcast.update_content();
  }
    // Get User Account Info
  getAccountInfo() {
    return this.muse.accountinfo();
  }
    // Broadcast Content
  getAccounts() {
    return this.muse.api.lookupaccounts();
  }


  // Get user with username
  // to pass in parameters do something like this
  getUserWithUsername(username) {
    return this.muse.api.lookupaccounts.list('/users', {
      query: {
        orderByChild: 'museId',
        equalTo: username
      }
    });
  }
}
