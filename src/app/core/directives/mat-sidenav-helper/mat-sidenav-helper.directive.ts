import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
// import { MatchMedia } from '../../services/match-media.service';
import { MatSidenavHelperService } from './mat-sidenav-helper.service';

@Directive({
    selector: '[matSidenavHelper]'
})
export class MatSidenavHelperDirective implements OnInit, OnDestroy
{
    matchMediaSubscription: Subscription;

    @HostBinding('class.mat-is-locked-open') isLockedOpen = true;

    @Input('matSidenavHelper') id: string;
    @Input('mat-is-locked-open') matIsLockedOpenBreakpoint: string;

    constructor(
        private matSidenavService: MatSidenavHelperService,
        // private matchMedia: MatchMedia,
        private observableMedia: ObservableMedia,
        private matSidenav: MatSidenav
    )
    {
    }

    ngOnInit()
    {
        this.matSidenavService.setSidenav(this.id, this.matSidenav);

        if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
        {
            this.isLockedOpen = true;
            this.matSidenav.mode = 'side';
            this.matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            this.matSidenav.mode = 'over';
            this.matSidenav.toggle(false);
        }

        // this.matchMediaSubscription = this.matchMedia.onMediaChange.subscribe(() => {
        //     if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
        //     {
        //         this.isLockedOpen = true;
        //         this.matSidenav.mode = 'side';
        //         this.matSidenav.toggle(true);
        //     }
        //     else
        //     {
        //         this.isLockedOpen = false;
        //         this.matSidenav.mode = 'over';
        //         this.matSidenav.toggle(false);
        //     }
        // });
    }

    ngOnDestroy()
    {
        // this.matchMediaSubscription.unsubscribe();
    }
}

@Directive({
    selector: '[matSidenavToggler]'
})
export class MatSidenavTogglerDirective
{
    @Input('matSidenavToggler') id;

    constructor(private matSidenavService: MatSidenavHelperService)
    {
    }

    @HostListener('click')
    onClick()
    {
        this.matSidenavService.getSidenav(this.id).toggle();
    }
}
