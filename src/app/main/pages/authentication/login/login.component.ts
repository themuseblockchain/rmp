import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../../core/services/config.service';
import { Animations } from '../../../../core/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../core/services/data.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';

// import { AuthenticationService } from '../Authentication.Service';



@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : Animations
})
export class LoginComponent implements OnInit
{
    item: any;
    loginForm: FormGroup;
    loginFormErrors: any;
    returnUrl: string;

    login: { muserName?: string, password?: string } = {};

    private temp: string;

    constructor(
        private  router: Router,
        private dataService: DataService,
        private config: ConfigService,
        private formBuilder: FormBuilder,
        protected storage: AsyncLocalStorage,
        private route: ActivatedRoute
    )
    {
        this.config.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            muserName   : {},
            password: {}
        };
    }

    ngOnInit()
    {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([this.returnUrl]);


        this.loginForm = this.formBuilder.group({
            muserName   : ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }



//  this.dataService.getAccount('johnstor5').then((result => {
//         this.Musebalance  = result[0].balance;
//         this.Vestbalance  = result[0].vesting_shares;
//         this.MBDbalance   = result[0].mbd_balance;
//         this.NextwithDraw = result[0].next_vesting.withdraw;
//         console.log(result);
//       }));

    onLogin(form) {

            this.dataService.authAccount(this.login.muserName, this.login.password).then((result) => {
                this.item = result;
                if (result === 'Success')
                {
                    this.router.navigate([this.returnUrl]);
                    // this.router.navigate(['/rights-management/post']);
                    // this.router.navigate(['./post']);
                }
            }).catch((error) => console.error(error));
        }



             
            
                //  this.storage.getItem('isAuthenticated').subscribe((isAuthenticated) => {
                //     if (isAuthenticated != null) {
                //         if (isAuthenticated === 'Success')
                //         {
                //             this.router.navigateByUrl('/post');
                //         }
                //     }
                // }, 
                // () => {});
           
}
