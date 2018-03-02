import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material';

@Component({
  selector: 'modal-dialog-vest',
  templateUrl: './modaldialogvest.component.html'
})

export class ModalDialogVestComponent {
  data = '';
  constructor(
    public dialogRef: MatDialogRef<ModalDialogVestComponent>
  ) {}
  save() {
    console.log(this.data);
    this.dialogRef.close(this.data);
  }
  close() {
    this.dialogRef.close();
  }
}
