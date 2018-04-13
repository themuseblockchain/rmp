import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertBtnText } from '../../../core/enums';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent  implements OnInit 
{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AlertComponent>
  ) { }

  ngOnInit() {
    // this.data = {} as DataService;
  }

  btnClick(btnText) {
    //  this.data as DataService;
    const that = this;
    switch (btnText) {
      case AlertBtnText.ResendEmail:
        // that.data.verifyAccount('1', '2');
        
        break;
      case AlertBtnText.UpdateEmail:
        // TODO:
        break;
      case AlertBtnText.OK:
        this.dialogRef.close();
        break;
      default:
      this.dialogRef.close();
    }
  }
}
