import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';
import { fadeInAnimation } from '../../core/common/route.animation';
import { DataService } from '../../core/services/data.service';
import { MuserService } from '../../core/services/muser.service';

// import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})

export class LoginComponent implements OnInit {
  private isAuthenticated: any;
  // form: FormGroup;
  muser: {};
  loginFormErrors: any;
  muserName: string;
  password: string;

  // login: { muserName?: string, password?: string } = {};
  // parse username as lowercase.

  messagePerErrorCode = {
    loginfailed: 'Invalid credentials'
  };

  errors = [];
  constructor(
    private router: Router,
    private dataService: DataService,
    private muserService: MuserService
    // private webLocalStorage: LocalStorageService,
    // private webSessionStorage: SessionStorageService

  ) { }

  ngOnInit() {
    this.muserService.cast.subscribe(muserName => this.muser = muserName);
  }

  // onLogin() {
  //   const val = this.form.value;
  // }

  onLogin(authUser, authKey) {
    //  this.isAuthenticated = this.webLocalStorage.observe('isAuthenticated').subscribe((isAuthenticated) => {
    //       console.log(isAuthenticated);
    //       });
    this.dataService.authAccount(this.muserName.toLowerCase(), this.password).then(() => {
      this.isAuthenticated = localStorage.getItem('isAuthenticated');
      if (this.isAuthenticated != null && this.isAuthenticated === 'true') {
        this.router.navigateByUrl('/');
      }
    }).catch(e => console.log('error' + e));
    // this.webLocalStorage.retrieve('isAuthenticated');
  }
}
