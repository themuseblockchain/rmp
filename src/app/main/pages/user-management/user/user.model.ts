import { Utils } from '../../../../core/utils';
import { MatChipInputEvent } from '@angular/material';

export class User
{
    id: string;
    muserName: string;
    name: string;
    handle: string;
    email: string;
    permissions: string;
    status: string;
    tags: string[];
    number: number;

    validate: boolean;
    textb: string;
    textc: string;
    textd: string;

    constructor(user?)
    {
        user = user || {};
        this.id = user.id || Utils.generateGUID();
        this.muserName = user.muserName || '';
        this.name = user.name || '';
        this.handle = user.handle || Utils.handleize(this.name);
        this.email = user.email || '';
        this.permissions = user.permissions || '';
        this.status = user.status || '';
        this.tags = user.tags || [];
 

        this.validate = user.validate;
        // this.textb = user.textb;
        // this.textc = user.textc;
        this.textd = user.textd;
        this.number = user.number;
    }

    addPermissions(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add Permissions
        if ( value )
        {
            // this.permissions.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    removePermissions(category)
    {
        const index = this.permissions.indexOf(category);

        if ( index >= 0 )
        {
            // this.permissions.splice(index, 1);
        }
    }


    addTag(event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;

        // Add tag
        if ( value )
        {
            this.tags.push(value);
        }

        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }

    removeTag(tag)
    {
        const index = this.tags.indexOf(tag);

        if ( index >= 0 )
        {
            this.tags.splice(index, 1);
        }
    }
}
