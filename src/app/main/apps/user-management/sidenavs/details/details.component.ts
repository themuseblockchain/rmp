import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../user-management.service';
import { Animations } from '../../../../../core/animations';

@Component({
    selector   : 'management-details-sidenav',
    templateUrl: './details.component.html',
    styleUrls  : ['./details.component.scss'],
    animations : Animations
})
export class UserManagementDetailsSidenavComponent implements OnInit
{

    selected: any;

    constructor(private userManagementService: UserManagementService)
    {

    }

    ngOnInit()
    {
        this.userManagementService.onUserSelected.subscribe(selected => {
            this.selected = selected;
        });
    }

}
