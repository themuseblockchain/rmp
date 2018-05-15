  import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
  import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { DataService } from '../../../../../core/services/data.service';
  import { AlertBtnText } from '../../../../../core/enums/alert-btn-text.enums';
  
  @Component({
    selector: 'writers',
    templateUrl: './writers.component.html',
    styleUrls    : ['./writers.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  
  export class WritersComponent {
    form: FormGroup;
    selectedValue: string;


    writerRoles = [
      { value: 0, view: 'Music' },
      { value: 1, view: 'Lyrics' },
      { value: 2, view: 'Music & Lyrics' },
      { value: 3, view: 'Arranger (for public domain works)' }
    ];

    toolTips = {
      sample: 'HINT.',

      // matTooltipShowDelay
      delay: '1000',
    };

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<WritersComponent>,
      private fb: FormBuilder
    ) {
  
      this.form = fb.group({
        writer: fb.control('', Validators.required),
        // muserName: fb.control('', Validators.required),
        ipi_cae: fb.control(''),
        isni: fb.control(''),
        writersPublisher: fb.control(''),
        writersRole: fb.control('')
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
          this.dialogRef.close(this.form.value);
          break;
        default:
          this.dialogRef.close();
      }
    }
  }
