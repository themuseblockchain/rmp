// Node Modules
import { Comment } from '@angular/compiler/public_api';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PagesComponent } from './main/pages/pages.component';
import { NavbarVerticalComponent } from './main/components/navbar/vertical/navbar-vertical.component';
import { ToolbarComponent } from './main/components/toolbar/toolbar.component';
import { NavigationModule } from './core/components/navigation/navigation.module';
import { NavbarVerticalToggleDirective } from './main/components/navbar/vertical/navbar-vertical-toggle.directive';
import { ThemeComponent } from './core/components/theme/theme.component';
import { SearchBarModule } from './core/components/search-bar/search-bar.module';

// Modules
import { SharedModule } from './core/modules/shared.module';
import { PagesModule } from './main/pages/pages.module';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { LayoutModule } from './main/components/layout.module'; 
import { AppRoutingModule } from './app-routing.module';
import { ScriptLoaderService } from './core/services/script-loader.service';
import { MainRoutingModule } from './main/main-routing.module';
import { LoginModule } from './auth/login/login.module';
import { LogoutModule } from './auth/logout/logout.module';
import { RegisterModule } from './auth/register/register.module';

// Services
import { SplashScreenService } from './core/services/splash-screen.service';
import { ConfigService } from './core/services/config.service';
import { NavigationService } from './core/components/navigation/navigation.service';
import { DataService } from './core/services/data.service';

@NgModule({
    declarations: [
        AppComponent,
        PagesComponent,
        MainComponent,
        NavbarVerticalComponent,
        ToolbarComponent,
        NavbarVerticalToggleDirective,
        ThemeComponent,

    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        LoginModule,
        MainRoutingModule,
        AsyncLocalStorageModule,
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MainRoutingModule,
        LoginModule,
        LogoutModule,
        RegisterModule,
        SharedModule,
        RouterModule,
        NavigationModule,
        SearchBarModule
    ],
    providers   : [
        SplashScreenService,
        ConfigService,
        NavigationService,
        DataService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
