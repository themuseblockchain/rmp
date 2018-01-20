import { Component} from '@angular/core';

import { ConfigService } from '../../../../core/services/config.service';
import { Animations } from '../../../../core/animations';

@Component({
    selector   : 'mail-confirm',
    templateUrl: './mail-confirm.component.html',
    styleUrls  : ['./mail-confirm.component.scss'],
    animations : Animations
})
export class MailConfirmComponent
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
}
