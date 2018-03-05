import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { DataService } from './core/services/data.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    // Core Angular Module // Don't remove!
    CommonModule,
    BrowserAnimationsModule,
    AsyncLocalStorageModule,

    // Muse Core Modules
    CoreModule,
    RoutingModule,
    MainModule,

    // Register a Service Worker (optional)
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
