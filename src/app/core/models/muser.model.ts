import { MatChipInputEvent } from '@angular/material';

export class Muser {
    muserName: string;
    password: string;
    key: string;
    isLoggedIn: boolean;


    constructor(muser?) {
        muser = muser || {};
        this.muserName = muser.muserName || '';
        this.password = muser.password || '';
        this.key = muser.key || '';
        this.isLoggedIn = muser.isLoggedIn || false;
    }
}
