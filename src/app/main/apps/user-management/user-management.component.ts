import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { FileManagerService } from './file-manager.service';
import { Animations } from '../../../core/animations';

@Component({
    selector     : 'user-manager',
    templateUrl  : './user-manager.component.html',
    styleUrls    : ['./user-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : Animations
})
export class UserManagementComponent implements OnInit
{

    selected: any;
    pathArr: string[];

    constructor(/*private fileManagerService: FileManagerService*/)
    {
    }

    ngOnInit()
    {
        // this.fileManagerService.onFileSelected.subscribe(selected => {
        //     this.selected = selected;
        //     this.pathArr = selected.location.split('>');
        // });
    }

}
