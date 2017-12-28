import { Component, OnInit } from '@angular/core';

@Component({
    selector   : 'user-management-main-sidenav',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class UserManagementMainSidenavComponent implements OnInit
{
    selected: any;

    constructor()
    {

    }

    ngOnInit()
    {
    }

}
