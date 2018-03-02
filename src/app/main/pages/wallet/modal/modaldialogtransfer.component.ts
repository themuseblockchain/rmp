import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material';

@Component({
  selector: 'modal-dialog-transfer',
  templateUrl: './modaldialogtransfer.component.html',
})
export class ModalDialogTransferComponent {
  data = {
    'transferto': '',
    'amount': '',
    'memo': ''
  };
  constructor(
    public dialogRef: MatDialogRef<ModalDialogTransferComponent>
  ) {}
  save() {
    if (this.data.transferto === '') {
      alert('Please provide a Muse account name to transfer to.');
    } else {
    this.dialogRef.close(this.data);
    }
  }
  close() {
    this.dialogRef.close();
  }
}
