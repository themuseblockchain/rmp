import { Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ConfigService } from '../core/services/config.service';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Animations } from '../core/animations';
import * as muse from 'muse-js';

@Component({
    selector     : 'main',
    templateUrl  : './main.component.html',
    styleUrls    : ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})
export class MainComponent implements OnInit, OnDestroy
{
    onSettingsChanged: Subscription;
    settings: any;
    @HostBinding('attr.layout-mode') layoutMode;

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private config: ConfigService,
        private platform: Platform,
        @Inject(DOCUMENT) private document: any
    )
    {
        this.onSettingsChanged =
            this.config.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.settings = newSettings;
                        this.layoutMode = this.settings.layout.mode;
                    }
                );

        if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.document.body.className += ' is-mobile';
        }
    }

    ngOnInit()
    {
      console.log(muse);
      muse.config.set('websocket','wss://api.muse.blckchnd.com');
      muse.api.getConfig(function(err,response){console.log(response)});
    }

    ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }

    addClass(className: string)
    {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    removeClass(className: string)
    {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
