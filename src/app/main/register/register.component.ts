import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../core/common/route.animation';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataService } from '../../core/services/data.service';
// import { VerificationService } from '../../core/services/verification.service';

import { AlertService } from '../../core/services/alert.service';

import * as firebase from 'firebase';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Validator, NG_VALIDATORS } from '@angular/forms';



@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class RegisterComponent {

  private muserName: string;
  private phoneNumber: any;
  private email: string;
  private password: string;
  private passwordConfirm: string;
  private terms: boolean;

  constructor(
    private router: Router,
    private dataService: DataService,
    private alert: AlertService,
    private dialog: MatDialog,
    // private verification: VerificationService
    ) { }

  // ngOnInit() {
  //   //  this.alert.showEmailVerifiedMessageAndRedirect();
  // }

  register() {
    this.dataService.createAccount(this.muserName, this.password /*, this.phoneNumber*/, this.email);
  }
}
