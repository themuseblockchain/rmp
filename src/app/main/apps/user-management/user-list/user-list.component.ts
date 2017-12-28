import { Component, OnInit } from '@angular/core';
// import { FileManagerService } from '../file-manager.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Animations } from '../../../../core/animations';

@Component({
    selector   : 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls  : ['./user-list.component.scss'],
    animations : Animations
})
export class UserManagementUserListComponent implements OnInit
{
    users: any;
    dataSource: UsersDataSource | null;
    displayedColumns = ['icon', 'name', 'type', 'owner', 'size', 'modified', 'detail-button'];
    selected: any;

    constructor(/*private fileManagerService: FileManagerService*/)
    {
        // this.fileManagerService.onFilesChanged.subscribe(files => {
        //     this.files = files;
        // });
        // this.fileManagerService.onFileSelected.subscribe(selected => {
        //     this.selected = selected;
        // });
    }

    ngOnInit()
    {
        // this.dataSource = new FilesDataSource(this.fileManagerService);
    }

    onSelect(selected)
    {
        // this.fileManagerService.onFileSelected.next(selected);
    }
}

// export class FilesDataSource extends DataSource<any>
export class UsersDataSource extends DataSource<any>
{
    // constructor(private fileManagerService: FileManagerService)
    // {
    //     super();
    // }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        return null; // this.fileManagerService.onFilesChanged;
    }

    disconnect()
    {
    }
}
