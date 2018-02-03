import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../../core/services/config.service';
import { Animations } from '../../../../core/animations';
import { Router } from '@angular/router';
import { DataService } from '../../../../core/services/data.service';
import * as muse from 'museblockchain-js';


@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : Animations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;

    login: { muserName?: string, password?: string } = {};

    private temp: string;

    constructor(
        private  router: Router,
        private dataService: DataService,
        private config: ConfigService,
        private formBuilder: FormBuilder
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


    onLogin(form) {
        if (form.valid) {
            this.setConfig();
            this.getConfig();

            // const t = this.dataService.authAccount(this.login.muserName, this.login.password);
            muse.login(this.login.muserName, this.login.password, function(err, response, data)
            {
                console.log(err, response, data);
            });
        }

    }

   setConfig() {
     return muse.config.set('websocket', 'wss://api.muse.blckchnd.com');
   }
   getConfig() {
     return muse.api.getConfig(function(err, response){console.log(response); } );
   }
}
