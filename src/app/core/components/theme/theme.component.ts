import { Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { ConfigService } from '../../services/config.service';
import { Animations } from '../../animations';
import { NavigationService } from '../navigation/navigation.service';

@Component({
    selector   : 'theme',
    templateUrl: './theme.component.html',
    styleUrls  : ['./theme.component.scss'],
    animations : Animations
})
export class ThemeComponent implements OnInit, OnDestroy
{
    @ViewChild('openButton') openButton;
    @ViewChild('panel') panel;
    @ViewChild('overlay') overlay: ElementRef;

    public player: AnimationPlayer;
    settings: any;

    onSettingsChanged: Subscription;

    @HostBinding('class.bar-closed') barClosed: boolean;

    constructor(
        private animationBuilder: AnimationBuilder,
        private config: ConfigService,
        private navigationService: NavigationService,
        private renderer: Renderer2
    )
    {
        this.barClosed = true;

        this.onSettingsChanged =
            this.config.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.settings = newSettings;
                    }
                );

        // Get the nav model and add customize nav item
        // that opens the bar programmatically
        const navModel = this.navigationService.getNavigationModel();

        navModel.push({
            'id'      : 'user-management',
            'title'   : 'User Management',
            'type'    : 'group',
            'children': [
                {
                    'id'      : 'add-new-user',
                    'title'   : 'Add New User',
                    'type'    : 'item',
                    'icon'    : 'add',
                    'function': () => {
                        // this.openBar();
                    }
                }
            ]
        });
    }

    ngOnInit()
    {
        this.renderer.listen(this.overlay.nativeElement, 'click', () => {
            this.closeBar();
        });
    }

    onSettingsChange()
    {
        this.config.setSettings(this.settings);
    }

    closeBar()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({transform: 'translate3d(0,0,0)'}),
                    animate('400ms ease', style({transform: 'translate3d(100%,0,0)'}))
                ]).create(this.panel.nativeElement);

        this.player.play();

        this.player.onDone(() => {
            this.barClosed = true;
        });
    }

    openBar()
    {
        this.barClosed = false;

        this.player =
            this.animationBuilder
                .build([
                    style({transform: 'translate3d(100%,0,0)'}),
                    animate('400ms ease', style({transform: 'translate3d(0,0,0)'}))
                ]).create(this.panel.nativeElement);

        this.player.play();
    }

    ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }
}
