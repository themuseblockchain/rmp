import { Component } from '@angular/core';
import { SplashScreenService } from './core/services/splash-screen.service';


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
