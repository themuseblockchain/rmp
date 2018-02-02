import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../../../core/services/config.service';
import { Animations } from '../../../core/animations';

@Component({
    selector   : 'maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls  : ['./maintenance.component.scss'],
    animations : Animations
})
export class MaintenanceComponent implements OnInit
{
    constructor(
        private config: ConfigService
    )
    {
        this.config.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });
    }

    ngOnInit()
    {

    }
}
