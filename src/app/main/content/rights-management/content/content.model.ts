import { Utils } from '../../../../core/utils';
import { MatChipInputEvent } from '@angular/material';

export class Content
{
    id: string;
    name: string;
    title: string;
    handle: string;
    upcEan: string;
    releaseDate: string;
    releaseYear: string;

    number: number;
    validate: boolean;
    textb: string;
    textc: string;
    textd: string;

    constructor(content?)
    {
        //  ['name', 'title', 'upcEan', 'releaseDate', 'releaseYear'];
        content = content || {};
        this.id = content.id || Utils.generateGUID();
        this.name = content.name || '';
        this.title = content.title || Utils.handleize(this.name);
        this.handle = content.email || '';
        this.upcEan = content.permissions || '';
        this.releaseDate = content.status || '';
        this.releaseYear = content.tags || [];
 

        this.validate = content.validate;
        // this.textb = content.textb;
        // this.textc = content.textc;
        this.textd = content.textd;
        this.number = content.number;
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

    // removePermissions(category)
    // {
    //     const index = this.permissions.indexOf(category);

    //     if ( index >= 0 )
    //     {
    //         // this.permissions.splice(index, 1);
    //     }
    // }


    // addTag(event: MatChipInputEvent): void
    // {
    //     const input = event.input;
    //     const value = event.value;

    //     // Add tag
    //     if ( value )
    //     {
    //         this.tags.push(value);
    //     }

    //     // Reset the input value
    //     if ( input )
    //     {
    //         input.value = '';
    //     }
    // }

    // removeTag(tag)
    // {
    //     const index = this.tags.indexOf(tag);

    //     if ( index >= 0 )
    //     {
    //         this.tags.splice(index, 1);
    //     }
    // }
}
