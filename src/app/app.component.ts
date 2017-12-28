import { Component } from '@angular/core';
import { SplashScreenService } from './core/services/splash-screen.service';
// import { TranslateService } from '@ngx-translate/core';

@Component({
    selector   : 'root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    // title = 'app';
    constructor(
        private splashScreen: SplashScreenService,
        // private translate: TranslateService
    )
    {
    //     // Add languages
    //     this.translate.addLangs(['en', 'tr']);

    //     // Set the default language
    //     this.translate.setDefaultLang('en');

    //     // Use a language
    //     this.translate.use('en');
    }
}
