import { CommonModule, DatePipe } from '@angular/common';
// import { HttpClientModule } from '@angular/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { RoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { CoinMarketCapService } from './core/services/coin-market-cap.service';
import { DataService } from './core/services/data.service';
import { AlertService } from './core/services/alert.service';
import { VerificationService } from './core/services/verification.service';
import { MuseService } from './core/services/muse.service';
import { MuserService } from './core/services/muser.service';
import { UIService } from './core/services/ui.service';

import { Ng2Webstorage } from 'ngx-webstorage';

import { Config } from '../config/config';
import * as firebase from 'firebase';


firebase.initializeApp(Config.firebaseProd);

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Core Angular Module // Don't remove!
    CommonModule,
    BrowserAnimationsModule,
    Ng2Webstorage,
    // Muse Core Modules
    CoreModule,
    HttpModule,
    RoutingModule,
    MainModule,
  ],
  providers: [
    DatePipe,
    AuthService,
    AlertService,
    CoinMarketCapService,
    DataService,
    VerificationService,
    AlertService,
    MuseService,
    MuserService,
    UIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
