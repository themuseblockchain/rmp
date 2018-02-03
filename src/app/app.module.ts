import { Comment } from '@angular/compiler/public_api';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { SplashScreenService } from './core/services/splash-screen.service';
import { ConfigService } from './core/services/config.service';
import { NavigationService } from './core/components/navigation/navigation.service';
import { DataService } from './core/services/data.service';
import { PagesModule } from './main/pages/pages.module';
import { MainModule } from './main/main.module';

// https://angular.io/guide/router
//

const appRoutes: Routes = [
    // {
    //     path        : 'user-management',
    //     loadChildren: './main/pages/user-management/user-management.module#UserManagementModule'
    // },
    {
        path        : '',
        loadChildren: './main/pages/wallet/wallet.module#WalletModule'
    },
    {
        path        : '',
        loadChildren: './main/pages/rights-management/post.module#PostModule'
    },
    {
        path      : '**', // "path: **" The router will select this route if the requested URL doesn't match any paths for routes defined
        redirectTo: 'login'
    },
];



@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        MainModule,
        PagesModule
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
