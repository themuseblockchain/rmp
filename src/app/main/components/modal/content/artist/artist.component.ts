import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../../../core/services/data.service';
import { AlertBtnText } from '../../../../../core/enums/alert-btn-text.enums';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ArtistComponent implements OnInit {
  aliases: string[];
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ArtistComponent>,
    private fb: FormBuilder
  ) { 

    this.form = fb.group({
      artist: fb.control('', Validators.required),
      // muserName: fb.control('', Validators.required),
      isni: fb.control(''),
      alias: fb.control('')
    });
  }

  ngOnInit() {
    this.aliases = [];
  }

  addAliase() {
    if (this.data.alias) {
      this.aliases.push(this.data.alias);
      this.data.alias = '';
    }
  }

  removeAlias(i) {
    this.aliases.splice(i, 1);
  }

  btnClick(btnText) {
    const that = this;
    switch (btnText) {
      case AlertBtnText.Add:
        if (this.data.alias) {
          this.aliases.push(this.data.alias);
        }
        this.data.aliases = this.aliases;
        this.dialogRef.close(this.data);
        break;
      default:
        this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
