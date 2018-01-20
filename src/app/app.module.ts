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
import { MainModule } from './main/main.module';
import { SplashScreenService } from './core/services/splash-screen.service';
import { ConfigService } from './core/services/config.service';
import { NavigationService } from './core/components/navigation/navigation.service';
import { SampleModule } from './main/pages/sample/sample.module';
import { DataServiceSampleModule } from './main/pages/data.service-sample/data.service-sample.module';

import { LoginModule } from './main/pages/authentication/login/login.module';

import { DataService } from './core/services/data.service';

const appRoutes: Routes = [

    {
        path        : 'user-management',
        loadChildren: './main/pages/user-management/user-management.module#UserManagementModule'
    },
   {
        path        : 'rights-management',
        loadChildren: './main/pages/rights-management/rights-management.module#RightsManagementModule'
    },
    {
        path      : '**',
        redirectTo: 'dataService-sample'
    },
    // {
    //     path      : '**',
    //     redirectTo: 'login'
    // }
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
        SampleModule,
        DataServiceSampleModule
        // InMemoryWebApiModule.forRoot(FakeDbService, {
        //     delay             : 0,
        //     passThruUnknownUrl: true
        // }),
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
