import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Animations } from '../../core/animations';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})
export class ProfileComponent implements OnInit
{

    constructor()
    {

    }

    ngOnInit()
    {

    }
}
