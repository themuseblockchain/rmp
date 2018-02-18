import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from './core/services/splash-screen.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';
// import { LoginModule } from './main/pages/authentication/login/login.module';
import { Router } from '@angular/router';

@Component({
    selector   : 'root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    constructor(
         private splashScreen: SplashScreenService,
         protected storage: AsyncLocalStorage,
         private  router: Router
    )
    {
        //  this.storage.getItem('isAuthenticated').subscribe((isAuthenticated) => {
        //             if (isAuthenticated != null && isAuthenticated === 'Success') 
        //             {
        //                 this.router.navigate(['/post']);
        //             }
        //             else
        //             {
        //                 this.router.navigate(['/login']);
        //             }
        //         }, 
        //         () => { });
    }


}
