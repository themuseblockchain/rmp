import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    postForm: FormGroup;
    formErrors: any;

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
        this.postForm = this.formBuilder.group({
            muserId: [
                {
                    value: '@MuserKing',
                    disabled: true
                }, Validators.required
            ],


            ipfsUrl : ['', Validators.required],
            albumTitle : ['', Validators.required],
            albumGenre : ['', Validators.required],
            albumArtist : ['', Validators.required],
            partofAlbum : [false, Validators.required],
            explicit : [false, Validators.required],
            albumPline : ['', Validators.required],
            albumCline : ['', Validators.required],

            countryOrigin : ['', Validators.required],
            upcEan : ['', Validators.required],
            releaseDate : ['', Validators.required],
            releaseYear : ['', Validators.required],
            salesStartDate : ['', Validators.required],
            masterLabelName : ['', Validators.required],
            displayLabelName : ['', Validators.required],
            samples : [false, Validators.required],

            trackTitle : ['', Validators.required],
            trackArtist : ['', Validators.required],
            trackGenre : ['', Validators.required],
            trackArtistAlias : ['', Validators.required],
            trackVolume : ['', Validators.required],
            trackPline : ['', Validators.required],
            isrc : ['', Validators.required],
            trackNo : ['', Validators.required],
            // trackNo: ['', [Validators.required, Validators.maxLength(5)]],

            compositionTitle : ['', Validators.required],
            compositionPublishers : ['', Validators.required],
            compositionWriters : ['', Validators.required],
            thirdParty : [false, Validators.required],
            PRO : ['', Validators.required],
            tempValue : ['']
        });

        this.postForm.valueChanges.subscribe(() => {
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
            const control = this.postForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }

    firecontent() {
      // this.dataService.postContent(
      //   '****',
      //   'johnstor5',
      //   this.postForm.value.ipfsUrl,
      // );
      console.log(this.postForm.value);
    }
}
