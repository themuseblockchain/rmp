
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DataService } from '../../../core/services/data.service';
import { Observable } from 'rxjs/Rx';
import { MuserService } from '../../../core/services/muser.service';
import { MuseService } from '../../../core/services/muse.service';
import { CryptoService } from '../../../core/services/crypto.service';
import { AlertService } from '../../../core/services/alert.service';
import { AlertBtnText } from '../../../core/enums/alert-btn-text.enums';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ErrorCodes } from '../../../core/enums/error-codes.enums';
import { Enums } from '../../../core/enums/content.enums';
import { ContentModel } from '../../../core/models/content.model';
import { UIService } from '../../../core/services/ui.service';
import { Utils } from './../../../core/utils';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})

export class ReviewComponent implements OnInit, AfterViewInit {

  content = new ContentModel();
  contentForm: FormGroup;

  private muserName: any;

  constructor(
    public dataService: DataService,
    private formBuilder: FormBuilder,
    private muserService: MuserService,
    private museService: MuseService,
    private alert: AlertService,
    private dialog: MatDialog,
    private ui: UIService
  ) {
    
  }

  ngOnInit() {

  }

  // region functions

  ngAfterViewInit() {
    // this.customValidation();
    setTimeout(() => {
      this.ui.hideLoading();
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  createContentForm() {

  }

  onFormValuesChanged() {

  }
}
