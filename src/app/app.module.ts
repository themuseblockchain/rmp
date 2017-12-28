import { NgModule } from '@angular/core';
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
import { SampleModule } from './main/content/sample/sample.module';
import { AnotherSampleModule } from './main/content/another-sample/another-sample.module';
import { UserManagementModule } from './main/apps/user-management/user-management.module';
// import { TranslateModule } from '@ngx-translate/core';
 
const appRoutes: Routes = [
    // {
    //     path        : 'content/another-sample',
    //     loadChildren: './main/content/another-sample/another-sample.module#AnotherSampleModule'
    // },
    // {
    //     path        : 'apps/chat',
    //     loadChildren: './main/content/apps/chat/chat.module#ChatModule'
    // },

    {
        path      : '**',
        redirectTo: 'sample'
    }
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
        // TranslateModule.forRoot(),
        MainModule,
        SampleModule,
        AnotherSampleModule         
    ],
    providers   : [
        SplashScreenService,
        ConfigService,
        NavigationService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
