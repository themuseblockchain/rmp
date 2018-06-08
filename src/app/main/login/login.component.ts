import { Component, HostBinding, HostListener } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../core/common/route.animation';
import { AuthService } from '../../core/services/auth.service';
// import { MuserService } from '../../core/services/muser.service';
import { Utils } from '../../core/utils';
import { AlertService } from '../../core/services/alert.service';

import { MuseAuthService } from '../../core/muse-connect/authentication/auth.service';
import { User } from '../../core/muse-connect/users/user';
import { CryptoService } from '../../core/services/crypto.service';

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
    private fb: FormBuilder,
    public auth: MuseAuthService
  ) {

    // Build Form
    this.form = fb.group({
      muserName: fb.control('giroux.dominik@gmail.com', Validators.required),
      password: fb.control('s86T61k6', Validators.required)
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
    // this.muserName = this.muserName.toLowerCase();
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
  }

  login() {
    this.auth.login(
      new User(
        null,
        this.form.get('muserName').value,
        null, // Passing email or musername has musername - MuseConnect filter it with '@' character
        this.form.get('password').value
      )
    );
  }

}
