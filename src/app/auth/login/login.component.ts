import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../core/services/config.service';
import { Animations } from '../../core/animations';
import { DataService } from '../../core/services/data.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
// import { UserService } from '../services/user.service';
import { AlertComponent } from '../directives/alert.component';


@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : Animations
})

export class LoginComponent implements OnInit
{
    model: any = {};
    returnUrl: string;

    loginForm: FormGroup;
    loginFormErrors: any;

    login: { muserName?: string, password?: string } = {};

    private temp: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService,
        // private authService: AuthenticationService,
        private config: ConfigService,
        private formBuilder: FormBuilder,
        protected storage: AsyncLocalStorage,
        // private userService: UserService,
        private alertService: AlertService
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
            muserName: {},
            password: {}
        };
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            muserName   : ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });

        
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([this.returnUrl]);

        // this._script.loadScripts('body', [
        //     'assets/vendors/base/vendors.bundle.js',
        //     'assets/demo/default/base/scripts.bundle.js'], true).then(() => {
        //         Helpers.setLoading(false);
        //         LoginCustom.init();
        //     });

    }

    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            //// Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }


    onLogin(loginForm) {
        // this.loading = true;
            // this.authService.login(this.model.email, this.model.password).subscribe(
            //     data => {
            //         // this.router.navigate([this.returnUrl]);
            //         this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/post';
            //         this.router.navigate([this.returnUrl]);
            //     },
            //     error => {
            //         // this.showAlert('alertSignin');
            //         this.alertService.error(error);
            //         // this.loading = false;
            //     });

            this.dataService.authAccount(this.login.muserName, this.login.password).then(
                data => {
                    // this.router.navigate([this.returnUrl]);
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/post';
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    // this.showAlert('alertSignin');
                    this.alertService.error(error);
                    // this.loading = false;
                }

            );
            
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
    }

