import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../core/common/route.animation';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataService } from '../../core/services/data.service';
// import { VerificationService } from '../../core/services/verification.service';

import { AlertService } from '../../core/services/alert.service';

import * as firebase from 'firebase';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Validator, NG_VALIDATORS, NgForm, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(
    private router: Router,
    private dataService: DataService,
    private alert: AlertService,
    private dialog: MatDialog,
    private fb: FormBuilder
    // private verification: VerificationService
  ) {

    //Build Form
    this.form = fb.group({
      muserName: fb.control('', Validators.required),
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', Validators.required),
      passwordConfirm: fb.control('', Validators.required),
      terms: fb.control(null, Validators.required)
    })

  }

  form: FormGroup;

  // ngOnInit() {
  //   //  this.alert.showEmailVerifiedMessageAndRedirect();
  // }

  register() {
    this.dataService.createAccount(this.form.get("muserName").value, this.form.get("password").value, this.form.get("email").value);
  }

  passwordMatch() {
    if (this.form.get("password").value == this.form.get("passwordConfirm").value) {
      return true;
    }
    this.form.get("passwordConfirm").setErrors({MatchPassword: true});
    return false
  }

}
