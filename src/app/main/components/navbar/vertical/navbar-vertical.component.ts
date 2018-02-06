import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
// import { MatchMedia } from '../../../../core/services/match-media.service';
import { NavbarVerticalService } from './navbar-vertical.service';
import { ObservableMedia } from '@angular/flex-layout';
import { MainComponent } from '../../../main.component';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../../core/components/navigation/navigation.service';
//import { PerfectScrollbarDirective } from '../../../../core/directives/perfect-scrollbar/perfect-scrollbar.directive';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

@Component({
    selector     : 'navbar-vertical',
    templateUrl  : './navbar-vertical.component.html',
    styleUrls    : ['./navbar-vertical.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalComponent implements OnInit, OnDestroy
{
    private _backdropElement: HTMLElement | null = null;
    private _folded = false;

    @HostBinding('class.close') isClosed: boolean;
    @HostBinding('class.folded') isFoldedActive: boolean;
    @HostBinding('class.folded-open') isFoldedOpen: boolean;
    @HostBinding('class.initialized') initialized: boolean;
    //@ViewChild(PerfectScrollbarDirective) perfectScrollbarDirective;

    @Input()
    set folded(value: boolean)
    {
        this._folded = value;

        if ( this._folded )
        {
            this.activateFolded();
        }
        else
        {
            this.deActivateFolded();
        }
    }

    get folded(): boolean
    {
        return this._folded;
    }

    // matchMediaWatcher: Subscription;
    navigationServiceWatcher: Subscription;
    perfectScrollbarUpdateTimeout;

    player: AnimationPlayer;

    constructor(
        private mainComponent: MainComponent,
        // private matchMedia: MatchMedia,
        private navigationService: NavigationService,
        private navBarService: NavbarVerticalService,
        private router: Router,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private animationBuilder: AnimationBuilder,
        public media: ObservableMedia
    )
    {
        navBarService.setNavBar(this);

        // this.navigationServiceWatcher =
        //     this.navigationService.onNavCollapseToggle.subscribe(() => {
        //         this.perfectScrollbarUpdateTimeout = setTimeout(() => {
        //             this.perfectScrollbarDirective.update();
        //         }, 310);
        //     });

        // this.matchMediaWatcher =
        //     this.matchMedia.onMediaChange
        //         .subscribe((mediaStep) => {
        //             setTimeout(() => {

        //                 if ( this.media.isActive('lt-lg') )
        //                 {
        //                     this.closeBar();
        //                     this.deActivateFolded();
        //                 }
        //                 else
        //                 {
        //                     this.openBar();
        //                     this._detachBackdrop();
        //                 }
        //             });
        //         });

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationEnd )
                {
                    if ( this.media.isActive('lt-lg') )
                    {
                        setTimeout(() => {
                            this.closeBar();
                        });
                    }
                }
            }
        );
    }

    ngOnInit()
    {
        this.isClosed = false;
        this.isFoldedActive = this._folded;
        this.isFoldedOpen = false;
        this.initialized = false;
        this.updateCssClasses();

        setTimeout(() => {
            this.initialized = true;
        });

        if ( this.media.isActive('lt-lg') )
        {
            this.closeBar();
            this.deActivateFolded();
        }
        else
        {
            if ( !this._folded )
            {
                this.deActivateFolded();
            }
            else
            {
                this.activateFolded();
            }
        }
    }

    ngOnDestroy()
    {
        clearTimeout(this.perfectScrollbarUpdateTimeout);
        // this.matchMediaWatcher.unsubscribe();
        this.navigationServiceWatcher.unsubscribe();
    }

    openBar()
    {
        if ( !this.isClosed )
        {
            return;
        }

        this.isClosed = false;
        this.updateCssClasses();
        if ( this.media.isActive('lt-lg') )
        {
            this._attachBackdrop();
        }
    }

    closeBar()
    {
        if ( this.isClosed )
        {
            return;
        }

        this.isClosed = true;
        this.updateCssClasses();
        this._detachBackdrop();
    }

    toggleBar()
    {
        if ( this.isClosed )
        {
            this.openBar();
        }
        else
        {
            this.closeBar();
        }
    }

    toggleFold()
    {
        if ( !this.isFoldedActive )
        {
            this.activateFolded();
        }
        else
        {
            this.deActivateFolded();
        }
    }

    activateFolded()
    {
        this.isFoldedActive = true;
        this.mainComponent.addClass('nav-bar-folded');
        this.isFoldedOpen = false;
    }

    deActivateFolded()
    {
        this.isFoldedActive = false;
        this.mainComponent.removeClass('nav-bar-folded');
        this.isFoldedOpen = false;
    }

    @HostListener('mouseenter')
    onMouseEnter()
    {
        this.isFoldedOpen = true;
    }

    @HostListener('mouseleave')
    onMouseLeave()
    {
        this.isFoldedOpen = false;
    }

    updateCssClasses()
    {
        if ( !this.isClosed )
        {
            this.mainComponent.addClass('navbar-opened');
            this.mainComponent.removeClass('navbar-closed');
        }
        else
        {
            this.mainComponent.addClass('navbar-closed');
            this.mainComponent.removeClass('navbar-opened');
        }
    }

    private _attachBackdrop()
    {
        this._backdropElement = this._renderer.createElement('div');
        this._backdropElement.classList.add('navbar-backdrop');

        this._renderer.appendChild(this._elementRef.nativeElement.parentElement, this._backdropElement);

        this.player =
            this.animationBuilder
                .build([
                    animate('400ms ease', style({opacity: 1}))
                ]).create(this._backdropElement);

        this.player.play();

        this._backdropElement.addEventListener('click', () => {
                this.closeBar();
            }
        );
    }

    private _detachBackdrop()
    {
        if ( this._backdropElement )
        {
            this.player =
                this.animationBuilder
                    .build([
                        animate('400ms cubic-bezier(.25,.8,.25,1)', style({opacity: 0}))
                    ]).create(this._backdropElement);

            this.player.play();

            this.player.onDone(() => {
                if ( this._backdropElement )
                {
                    this._backdropElement.parentNode.removeChild(this._backdropElement);
                    this._backdropElement = null;
                }
            });
        }
    }
}
