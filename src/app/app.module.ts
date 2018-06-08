import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { RoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { AlertService } from './core/services/alert.service';
import { AuthService } from './core/services/auth.service';
import { CoinMarketCapService } from './core/services/coin-market-cap.service';
import { DataService } from './core/services/data.service';
import { VerificationService } from './core/services/verification.service';
import { MuseService } from './core/services/muse.service';
import { MuserService } from './core/services/muser.service';
import { UIService } from './core/services/ui.service';
import { MuseAuthService } from './core/muse-connect/authentication/auth.service';

import { Ng2Webstorage } from 'ngx-webstorage';
import { RouterModule } from '@angular/router';

import { Config } from '../config/config';
import * as firebase from 'firebase';

// Default Firebase App (Rights Management Portal)
firebase.initializeApp(Config.rightsManagementPortal);

// Muse Connect
firebase.initializeApp(Config.museConnect, 'museConnect');

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Core Angular Module // Don't remove!
    RoutingModule,
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
    HttpModule,
    MainModule,
    HttpClientModule,

    // Register a Service Worker (optional)
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AlertService,
    AuthService,
    CoinMarketCapService,
    DataService,
    VerificationService,
    MuseService,
    MuserService,
    UIService,
    MuseAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
