import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { Animations } from '../../../../core/animations';

@Component({
    selector   : 'profile-about',
    templateUrl: './about.component.html',
    styleUrls  : ['./about.component.scss'],
    animations : Animations
})
export class ProfileAboutComponent implements OnInit
{
    about: any;

    constructor(private profileService: ProfileService)
    {
        this.profileService.aboutOnChanged.subscribe(about => {
            this.about = about;
        });
    }

    ngOnInit()
    {

    }
}
