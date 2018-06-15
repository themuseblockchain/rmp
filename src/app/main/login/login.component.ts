import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../core/common/route.animation';
import { AuthService } from '../../core/services/auth.service';
// import { MuserService } from '../../core/services/muser.service';
// import { Utils } from '../../core/utils';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})

export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alert: AlertService,
    private fb: FormBuilder
  ) {

    // Build Form
    this.form = fb.group({
      muserName: fb.control('', Validators.required),
      password: fb.control('', Validators.required),
      key: fb.control('', Validators.required)
    });

  }

  form: FormGroup;
  private isAuthenticated: any;
  muser: {};
  muserAccountInfo: any;

  messagePerErrorCode = {
    loginfailed: 'Invalid credentials'
  };

  errors = [];

  onLogin() {
    this.authService.validateTesterKey(this.form.get('key').value).then(() => {
      /// auth main function start
      this.authService.authAccount(this.form.get('muserName').value.toLowerCase(), this.form.get('password').value).then(() => {
        this.isAuthenticated = localStorage.getItem('isAuthenticated');
        if (this.isAuthenticated === 'true') {
          // this.muserService.muserAccountInfo$.subscribe(muserAccountInfo => {
          //   this.muserAccountInfo = muserAccountInfo;
          // });
          // this.muserService.getCurrentMuserAccount();
          this.router.navigateByUrl('/');
        }
      }).catch((err) => {
        this.alert.showErrorMessage('onLogin(): ' + err);
      });
      /// auth main function end

    }).catch((err) => {
      this.alert.showErrorMessage('invalid-testerKey');
    });
  }
}
