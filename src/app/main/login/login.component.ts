import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../core/common/route.animation';
import { DataService } from '../../core/services/data.service';
// import { MuserService } from '../../core/services/muser.service';
import { Utils } from '../../core/utils';

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
    private dataService: DataService,
    private fb: FormBuilder
  ) {

    //Build Form
    this.form = fb.group({
      muserName: fb.control('', Validators.required),
      password: fb.control('', Validators.required)
    })

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
    this.dataService.authAccount(this.form.get("muserName").value.toLowerCase(), this.form.get("password").value).then(() => {
      this.isAuthenticated = localStorage.getItem('isAuthenticated');
      if (this.isAuthenticated === 'true') {
        // this.muserService.muserAccountInfo$.subscribe(muserAccountInfo => {
        //   this.muserAccountInfo = muserAccountInfo;
        // });
        // this.muserService.getCurrentMuserAccount();
        this.router.navigateByUrl('/');
      }
    }).catch(e => console.log('error' + e));
  }
}
