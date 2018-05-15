import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../../core/services/data.service';
import { AlertBtnText } from '../../../../../core/enums/alert-btn-text.enums';

@Component({
  selector: 'publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PublishersComponent {
  form: FormGroup;

  toolTips = {
    sample: 'HINT.',
    delay: '1000',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PublishersComponent>,
    private fb: FormBuilder
  ) {

    this.form = fb.group({
      publisher: fb.control('', Validators.required),
      // muserName: fb.control('', Validators.required),
      isni: fb.control(''),
      ipi_cae: fb.control(''),
    });
  }

  close() {
    this.dialogRef.close();
  }

  btnClick(btnText) {
    //  this.data as DataService;
    const that = this;
    switch (btnText) {
      case AlertBtnText.Add:
        this.dialogRef.close(this.data);
        break;
      default:
        this.dialogRef.close();
    }
  }
}
