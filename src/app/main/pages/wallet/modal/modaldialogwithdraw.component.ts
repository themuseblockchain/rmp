import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material';

@Component({
  selector: 'modal-dialog-withdraw',
  templateUrl: './modaldialogwithdraw.component.html'
})

export class ModalDialogWithdrawComponent {
  data = '';
  constructor(
    public dialogRef: MatDialogRef<ModalDialogWithdrawComponent>
  ) {}
  save() {
    console.log(this.data);
    this.dialogRef.close(this.data);
  }
  close() {
    this.dialogRef.close();
  }
}
