import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserService } from './user.service';
import { Animations } from '../../../../core/animations';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { User } from './user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '../../../../core/utils';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';


@Component({
    selector     : 'user',
    templateUrl  : './user.component.html',
    styleUrls    : ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})
export class UserComponent implements OnInit, OnDestroy
{
    user = new User();
    onUserChanged: Subscription;
    pageType: string;
    userForm: FormGroup;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private location: Location
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to update product on changes
        this.onUserChanged =
            this.userService.onUserChanged
                .subscribe(user => {

                    if ( user )
                    {
                        this.user = new User(user);
                        this.pageType = 'edit';
                    }
                    else
                    {
                        this.pageType = 'new';
                        this.user = new User();
                    }

                    this.userForm = this.createUserForm();
                });

    }

    createUserForm()
    {
        return this.formBuilder.group({
            id              : [this.user.id],
            museId          : [this.user.museId],
            name            : [this.user.name],
            handle          : [this.user.handle],
            email           : [this.user.email],
            permissions     : [this.user.permissions],
            status          : [this.user.status],
            tags            : [this.user.tags],

            validated       : [this.user.validate],
            // textb          : [this.user.textb],
            // textc           : [this.user.textc],
            textd          : [this.user.textd],

            number          : [this.user.number],
        });
    }

    saveUser()
    {
        const data = this.userForm.getRawValue();
        data.handle = Utils.handleize(data.name);
        this.userService.saveUser(data)
            .then(() => {

                // Trigger the subscription with new data
                this.userService.onUserChanged.next(data);

                // Show the success message
                this.snackBar.open('User saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    addUser()
    {
        const data = this.userForm.getRawValue();
        data.handle = Utils.handleize(data.name);
        this.userService.addUser(data)
            .then(() => {

                // Trigger the subscription with new data
                this.userService.onUserChanged.next(data);

                // Show the success message
                this.snackBar.open('User added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this.location.go('/user-management/' + this.user.id + '/' + this.user.handle);
            });
    }



    ngOnDestroy()
    {
        this.onUserChanged.unsubscribe();
    }
}
