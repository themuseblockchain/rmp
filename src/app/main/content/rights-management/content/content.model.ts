import { Utils } from '../../../../core/utils';
import { MatChipInputEvent } from '@angular/material';

export class Content
{
    id: string;
    handle: string;
    ipfsUrl: string;
    albumTitle: string;
    albumGenre: string;
    countryOrigin: string;
    upcEan: string;
    releaseDate: string;
    releaseYear: string;
    salesStartDate: string;
    masterLabelName: string;
    displayLabelName: string;
    trackTitle: string;
    isrc: string;
    trackNo: string;
    compositionTitle: string;
                            
    validate: boolean;

    constructor(content?)
    {
        //  ['name', 'title', 'upcEan', 'releaseDate', 'releaseYear'];
        content = content || {};
        this.id = content.id || Utils.generateGUID();
        this.ipfsUrl = content.ipfsUrl || '';
        this.albumTitle = content.albumTitle || '';
        this.albumGenre = content.albumGenre || '';
        this.countryOrigin = content.countryOrigin || '';
        this.upcEan = content.upcEan || '';
        this.releaseDate = content.releaseDate || '';
        this.releaseYear = content.releaseYear || '';
        this.salesStartDate = content.salesStartDate || '';
        this.masterLabelName = content.masterLabelName || '';
        this.displayLabelName = content.displayLabelName || '';
        this.trackTitle = content.trackTitle || '';
        this.isrc = content.isrc || '';
        this.trackNo = content.trackNo || '';
        this.compositionTitle = content.compositionTitle || '';
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
}
