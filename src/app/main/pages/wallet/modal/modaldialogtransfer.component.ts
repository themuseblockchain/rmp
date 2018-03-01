import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'modal-dialog-transfer',
  templateUrl: './modaldialogtransfer.component.html',
})
export class ModalDialogTransferComponent {
  data = {};
  constructor(
    public dialogRef: MatDialogRef<ModalDialogTransferComponent>
  ) {}
  save() {
    this.dialogRef.close(this.data);
  }
  close() {
    this.dialogRef.close();
  }
}
