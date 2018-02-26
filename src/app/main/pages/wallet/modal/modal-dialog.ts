import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';


@Component({
    selector   : 'modal',
    templateUrl: 'modal.html'
})
export class Modal
{
    constructor(public dialog: MatDialog)
    {
    }

    openDialog()
    {
        const dialogRef = this.dialog.open(ModalDialog, {
            height: '350px'
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(`Dialog result: ${result}`);
        // });
    }
}

@Component({
    selector   : 'modal-dialog',
    templateUrl: 'modal-dialog.html'
})
export class ModalDialog
{
}
