import { Component } from '@angular/core';
import { SplashScreenService } from './core/services/splash-screen.service';

import { LoginModule } from './main/pages/authentication/login/login.module';

@Component({
    selector   : 'root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    constructor(
         private splashScreen: SplashScreenService,
    )
    {

    }
}
