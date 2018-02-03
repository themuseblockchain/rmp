import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../../core/services/config.service';
import { Animations } from '../../../../core/animations';

@Component({
    selector   : 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls  : ['./forgot-password.component.scss'],
    animations : Animations
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;
    forgotPasswordFormErrors: any;

    constructor(
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

        this.forgotPasswordFormErrors = {
            email: {}
        };
    }

    ngOnInit()
    {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.forgotPasswordForm.valueChanges.subscribe(() => {
            this.onForgotPasswordFormValuesChanged();
        });
    }

    onForgotPasswordFormValuesChanged()
    {
        for ( const field in this.forgotPasswordFormErrors )
        {
            if ( !this.forgotPasswordFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.forgotPasswordFormErrors[field] = {};

            // Get the control
            const control = this.forgotPasswordFormErrors.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.forgotPasswordFormErrors[field] = control.errors;
            }
        }
    }
}