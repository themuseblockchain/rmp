import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../../core/services/data.service';
import { AlertBtnText } from '../../../../../core/enums/alert-btn-text.enums';

@Component({
  selector: 'management',
  templateUrl: './management.component.html',
  styleUrls    : ['./management.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ManagementComponent {
  form: FormGroup;

  toolTips = {
    sample: 'HINT.',
    delay: '1000',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ManagementComponent>,
    private fb: FormBuilder
  ) { 

  this.form = fb.group({
    muserName: fb.control('', Validators.required),
    bp: fb.control('', Validators.required),
    percentage: fb.control('', Validators.required)
  });
}

close() {
  this.dialogRef.close();
}

btnClick(btnText) {
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
