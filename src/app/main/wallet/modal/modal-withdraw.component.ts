import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material';

@Component({
  selector: 'modal-dialog-withdraw',
  templateUrl: './modal-withdraw.component.html'
})

export class ModalWithdrawComponent {
  data = '';
  constructor(
    public dialogRef: MatDialogRef<ModalWithdrawComponent>
  ) {}
  save() {
    console.log(this.data);
    this.dialogRef.close(this.data);
  }
  close() {
    this.dialogRef.close();
  }
}
