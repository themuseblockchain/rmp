import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../../profile.service';
import { Animations } from '../../../../../core/animations';

@Component({
    selector   : 'profile-photos-videos',
    templateUrl: './photos-videos.component.html',
    styleUrls  : ['./photos-videos.component.scss'],
    animations : Animations
})
export class ProfilePhotosVideosComponent implements OnInit
{
    photosVideos: any;

    constructor(private profileService: ProfileService)
    {
        this.profileService.photosVideosOnChanged.subscribe(photosVideos => {
            this.photosVideos = photosVideos;
        });
    }

    ngOnInit()
    {

    }
}
