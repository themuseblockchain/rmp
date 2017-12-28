import { Directive, HostListener, Input } from '@angular/core';
import { NavbarVerticalService } from './navbar-vertical.service';
import { NavbarVerticalComponent } from './navbar-vertical.component';

@Directive({
    selector: '[navbarVertical]'
})
export class NavbarVerticalToggleDirective
{
    @Input() navbarVertical: string;
    navbar: NavbarVerticalComponent;

    constructor(private navbarService: NavbarVerticalService)
    {
    }

    @HostListener('click')
    onClick()
    {
        this.navbar = this.navbarService.getNavBar();

        if ( !this.navbar[this.navbarVertical] )
        {
            return;
        }

        this.navbar[this.navbarVertical]();
    }
}
