import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls  : ['./post.component.scss']
})
export class PostComponent implements OnInit
{
    form: FormGroup;
    formErrors: any;

    constructor(private formBuilder: FormBuilder)
    {
        this.formErrors = {
            muserId   : {},
            ipfsUrl : {},
            albumTitle  : {},
            albumGenre  : {},

            countryOrigin   : {},
            upcEan  : {},
            releaseDate  : {},
            releaseYear  : {},
            salesStartDate  : {},
            masterLabelName  : {},
            displayLabelName  : {},

            trackTitle  : {},
            isrc  : {},
            trackNo  : {},
            compositionTitle  : {}
        };
    }

    ngOnInit()
    {
        this.form = this.formBuilder.group({
            muserId   : [
                {
                    value   : '@MuserKing',
                    disabled: true
                }, Validators.required
            ],
            ipfsUrl : ['', Validators.required],
            albumTitle : ['', Validators.required],
            albumGenre : ['', Validators.required],

            countryOrigin : ['', Validators.required],
            upcEan : ['', Validators.required],
            releaseDate : ['', Validators.required],
            releaseYear : ['', Validators.required],
            salesStartDate : ['', Validators.required],
            masterLabelName : ['', Validators.required],
            displayLabelName : ['', Validators.required],

            trackTitle : ['', Validators.required],
            isrc : ['', Validators.required],
            trackNo : ['', Validators.required],
            // trackNo: ['', [Validators.required, Validators.maxLength(5)]],

            compositionTitle : ['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    onFormValuesChanged()
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }
}