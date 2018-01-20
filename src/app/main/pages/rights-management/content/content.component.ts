// import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { ContentService } from './content.service';
// import { Animations } from '../../../../core/animations';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/fromEvent';
// import { Subscription } from 'rxjs/Subscription';
// import { Content } from './content.model';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Utils } from '../../../../core/utils';
// import { MatSnackBar } from '@angular/material';
// import { Location } from '@angular/common';

// @Component({
//     selector     : 'content',
//     templateUrl  : './content.component.html',
//     styleUrls    : ['./content.component.scss'],
//     encapsulation: ViewEncapsulation.None,
//     animations   : Animations
// })
// export class ContentComponent implements OnInit, OnDestroy
// {
//     content = new Content();
//     onContentChanged: Subscription;
//     pageType: string;
//     contentForm: FormGroup;
//     formErrors: any;


//     constructor(
//         private contentService: ContentService,
//         private formBuilder: FormBuilder,
//         public snackBar: MatSnackBar,
//         private location: Location
//     )
//     {
//         // this.formErrors = {
//         //     ipfsUrl   : {},
//         //     albumTitle : {},
//         //     albumGenre  : {},
//         //     countryOrigin   : {},
//         //     upcEan  : {},
//         //     releaseDate      : {},
//         //     releaseYear     : {},
//         //     salesStartDate : {},
//         //     masterLabelName  : {},
//         //     displayLabelName   : {},
//         //     trackTitle     : {},
//         //     isrc : {},
//         //     trackNo  : {},
//         //     compositionTitle   : {}
//         // };
//         //         this.contentForm.valueChanges.subscribe(() => {
//         //     this.onFormValuesChanged();
//         // });
//     }

//     ngOnInit()
//     {
//         // Subscribe to update product on changes
//         this.onContentChanged =
//             this.contentService.onContentChanged
//                 .subscribe(content => {

//                     if ( content )
//                     {
//                         this.content = new Content(content);
//                         this.pageType = 'edit';
//                     }
//                     else
//                     {
//                         this.pageType = 'new';
//                         this.content = new Content();
//                     }

//                     this.contentForm = this.createContentForm();
//                 });

//                  this.contentForm = this.formBuilder.group({
//             ipfsUrl : ['', Validators.required],
//             albumTitle  : ['', Validators.required],
//             albumGenre   : ['', Validators.required],
//             countryOrigin  : ['', Validators.required],
//             upcEan      : ['', Validators.required],
//             releaseDate     : ['', Validators.required],
//             releaseYear : ['', Validators.required],
//             salesStartDate  : ['', Validators.required],
//             masterLabelName   : ['', Validators.required],
//             displayLabelName  : ['', Validators.required],
//             trackTitle      : ['', Validators.required],
//             isrc     : ['', Validators.required],

//             trackNo : ['', Validators.required],
//             compositionTitle  : ['', Validators.required],
//             // postalCode: ['', [Validators.required, Validators.maxLength(5)]]
//         });

//         // this.contentForm.valueChanges.subscribe(() => {
//         //     this.onFormValuesChanged();
//         // });

//     }

//     onFormValuesChanged()
//     {
//         for ( const field in this.formErrors )
//         {
//             if ( !this.formErrors.hasOwnProperty(field) )
//             {
//                 continue;
//             }

//             // Clear previous errors
//             this.formErrors[field] = {};

//             // Get the control
//             const control = this.contentForm.get(field);

//             if ( control && control.dirty && !control.valid )
//             {
//                 this.formErrors[field] = control.errors;
//             }
//         }
//     }

//     createContentForm()
//     {
//         return this.formBuilder.group({
            
//             id              : [this.content.id],
//             name            : [this.content.name],
//             title           : [this.content.handle],
//             upcEan          : [this.content.upcEan],
//             releaseDate     : [this.content.releaseDate],
//             releaseYear     : [this.content.releaseYear],
            
//             validated       : [this.content.validate],
//             textd           : [this.content.textd],

//             number          : [this.content.number],
//         });
//     }

//     saveContent()
//     {
//         const data = this.contentForm.getRawValue();
//         data.handle = Utils.handleize(data.name);
//         this.contentService.saveContent(data)
//             .then(() => {

//                 // Trigger the subscription with new data
//                 this.contentService.onContentChanged.next(data);

//                 // Show the success message
//                 this.snackBar.open('Content saved', 'OK', {
//                     verticalPosition: 'top',
//                     duration        : 2000
//                 });
//             });
//     }

//     addContent()
//     {
//         const data = this.contentForm.getRawValue();
//         data.handle = Utils.handleize(data.name);
//         this.contentService.addContent(data)
//             .then(() => {

//                 // Trigger the subscription with new data
//                 this.contentService.onContentChanged.next(data);

//                 // Show the success message
//                 this.snackBar.open('Content added', 'OK', {
//                     verticalPosition: 'top',
//                     duration        : 2000
//                 });

//                 // Change the location with new one
//                 this.location.go('/rights-management/' + this.content.id + '/' + this.content.handle);
//             });
//     }



//     ngOnDestroy()
//     {
//         this.onContentChanged.unsubscribe();
//     }
// }





import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContentService } from './content.service';
import { Animations } from '../../../../core/animations';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { Content } from './content.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '../../../../core/utils';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
    selector     : 'content',
    templateUrl  : './content.component.html',
    styleUrls    : ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})
export class ContentComponent implements OnInit, OnDestroy
{
    content = new Content();
    onContentChanged: Subscription;
    pageType: string;
    contentForm: FormGroup;

    constructor(
        private contentService: ContentService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private location: Location
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to update product on changes
        this.onContentChanged =
            this.contentService.onContentChanged
                .subscribe(content => {

                    if ( content )
                    {
                        this.content = new Content(content);
                        this.pageType = 'edit';
                    }
                    else
                    {
                        this.pageType = 'new';
                        this.content = new Content();
                    }

                    this.contentForm = this.createContentForm();
                });
    }

    createContentForm()
    {
        return this.formBuilder.group({
            id                  : [this.content.id],
            ipfsUrl             : [this.content.ipfsUrl],
            albumTitle          : [this.content.albumTitle],
            albumGenre          : [this.content.albumGenre],
            countryOrigin       : [this.content.countryOrigin],
            upcEan              : [this.content.upcEan],
            releaseDate         : [this.content.releaseDate],
            releaseYear         : [this.content.releaseYear],
            salesStartDate      : [this.content.salesStartDate],
            masterLabelName     : [this.content.masterLabelName],
            displayLabelName    : [this.content.displayLabelName],
            trackTitle          : [this.content.trackTitle],
            isrc                : [this.content.isrc],
            trackNo             : [this.content.trackNo],
            compositionTitle    : [this.content.compositionTitle],
        });
    }

    saveUser()
    {
        const data = this.contentForm.getRawValue();
        data.handle = Utils.handleize(data.name);
        this.contentService.saveContent(data)
            .then(() => {

                // Trigger the subscription with new data
                this.contentService.onContentChanged.next(data);

                // Show the success message
                this.snackBar.open('Content saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    addContent()
    {
        const data = this.contentForm.getRawValue();
        data.handle = Utils.handleize(data.name);
        this.contentService.addContent(data)
            .then(() => {

                // Trigger the subscription with new data
                this.contentService.onContentChanged.next(data);

                // Show the success message
                this.snackBar.open('Content added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this.location.go('/rights-management/' + this.content.id + '/' + this.content.handle);
            });
    }



    ngOnDestroy()
    {
        this.onContentChanged.unsubscribe();
    }
}
