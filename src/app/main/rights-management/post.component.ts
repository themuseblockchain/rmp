import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { Observable } from 'rxjs/Rx';
import * as cryptojs from 'crypto-js';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    postForm: FormGroup;
    formErrors: any;

    private authUser: any;
    private password: any;

    constructor(
        public dataService: DataService,
        private formBuilder: FormBuilder
    ) {
        this.formErrors = {
            muserId: {},
            ipfsUrl: {},
            albumTitle: {},
            albumGenre: {},

            countryOrigin: {},
            upcEan: {},
            releaseDate: {},
            releaseYear: {},
            salesStartDate: {},
            masterLabelName: {},
            displayLabelName: {},

            trackTitle: {},
            isrc: {},
            trackNo: {},
            compositionTitle: {}
        };
    }

    ngOnInit() {
        this.authUser = localStorage.getItem('currentUser');
        this.password = localStorage.getItem('password');

        const decrypt = cryptojs.AES.decrypt(this.password.toString(), this.authUser);
        const authKey = JSON.stringify(decrypt.toString(cryptojs.enc.Utf8));


        this.postForm = this.formBuilder.group({
            muserId: [
                {
                    value: this.authUser,
                    disabled: true
                }, Validators.required
            ],


            ipfsUrl: ['', Validators.required],
            albumTitle: ['', Validators.required],
            albumGenre: [0, Validators.required],
            albumArtist: ['', Validators.required],
            partofAlbum: [false, Validators.required],
            explicit: [0, Validators.required], // this must be 1 or zero
            albumPline: ['', Validators.required],
            albumCline: ['', Validators.required],

            countryOrigin: ['', Validators.required],
            upcEan: [9993, Validators.required], // int
            releaseDate: [0, Validators.required], // int
            releaseYear: [0, Validators.required], // int
            salesStartDate: [0, Validators.required], // int
            masterLabelName: ['', Validators.required],
            displayLabelName: ['', Validators.required],
            samples: [false, Validators.required], // bool

            trackTitle: ['', Validators.required],
            trackArtists: [[], Validators.required],
            trackGenre: [1, Validators.required], // int
            trackArtistAlias: ['', Validators.required],
            trackVolume: [0, Validators.required], // int
            trackPline: ['', Validators.required],
            isrc: ['', Validators.required],
            trackNo: [0, Validators.required], // int
            // trackNo: ['', [Validators.required, Validators.maxLength(5)]],

            compositionTitle: ['', Validators.required],
            compositionPublishers: [[], Validators.required],
            compositionWriters: [[], Validators.required],
            thirdParty: [false, Validators.required],
            pro: ['', Validators.required],
            masterdist: [[{ 'payee': this.authUser, 'bp': 10000 }], Validators.required], // array
            masterright: [[{ 'voter': this.authUser, 'percentage': 100 }], Validators.required], // array
            masterthresh: [100, Validators.required], // percent
            compdist: [[], Validators.required], // array
            compright: [[], Validators.required], // array
            compthresh: [100, Validators.required], // percent

            playreward: [100, Validators.required], // int
            pubshare: [5000, Validators.required], // int
            tempValue: ['']
        });

        this.postForm.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    onFormValuesChanged() {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.postForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    firecontent() {
        this.authUser = localStorage.getItem('currentUser');
        this.password = localStorage.getItem('password');

        const decrypt = cryptojs.AES.decrypt(this.password.toString(), this.authUser);
        const authKey = JSON.stringify(decrypt.toString(cryptojs.enc.Utf8));

        this.dataService.postContent(
            authKey,
            this.authUser,
            this.postForm.value,
        );
        console.log(this.postForm.value);
    }
}
