import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MainComponent } from '../../../main.component';

@Component({
    selector     : 'navbar-horizontal',
    templateUrl  : './navbar-horizontal.component.html',
    styleUrls    : ['./navbar-horizontal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarHorizontalComponent implements OnInit, OnDestroy
{
    constructor(private mainComponent: MainComponent)
    {
    }

    ngOnInit()
    {
        this.mainComponent.addClass('nav-bar-horizontal');
    }

    ngOnDestroy()
    {
        this.mainComponent.removeClass('nav-bar-horizontal');
    }
}
