import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';

import { DataService } from './core/services/data.service';
import { AlertService } from './core/services/alert.service';
import { VerificationService } from './core/services/verification.service';
import { MuserService } from './core/services/muser.service';
import { Ng2Webstorage } from 'ngx-webstorage';

import { firebaseConfig } from '../config/config';
import * as firebase from 'firebase';

  const config = {
    apiKey: 'AIzaSyD1cEYjkdkoi3Hn5team4R8yq7s9MIAvxQ',
    authDomain: 'rmp-dev-8a70b.firebaseapp.com',
    databaseURL: 'https://rmp-dev-8a70b.firebaseio.com',
    projectId: 'rmp-dev-8a70b',
    storageBucket: 'rmp-dev-8a70b.appspot.com',
    messagingSenderId: '50686525262'
  };
  firebase.initializeApp(config);
// firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Core Angular Module // Don't remove!
    CommonModule,
    BrowserAnimationsModule,
    Ng2Webstorage,
    // Ng2Webstorage.forRoot({ prefix: 'custom', separator: '.', caseSensitive:true }) 
    // The forRoot method allows to configure the prefix, the separator and the caseSensitive option used by the library
    // Default values:
    // prefix: 'ng2-webstorage'
    // separator: '|'
    // caseSensitive: false

    // Muse Core Modules
    CoreModule,
    RoutingModule,
    MainModule,

    // Register a Service Worker (optional)
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DataService,
    VerificationService,
    AlertService,
    MuserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
