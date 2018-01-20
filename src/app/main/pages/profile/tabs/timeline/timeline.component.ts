import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { Animations } from '../../../../../core/animations';

@Component({
    selector   : 'profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls  : ['./timeline.component.scss'],
    animations : Animations
})
export class ProfileTimelineComponent implements OnInit
{
    timeline: any;

    constructor(private profileService: ProfileService)
    {
        this.profileService.timelineOnChanged.subscribe(timeline => {
            this.timeline = timeline;
        });
    }

    ngOnInit()
    {

    }
}
