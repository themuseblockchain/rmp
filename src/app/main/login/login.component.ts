import { Component, OnInit } from '@angular/core';
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

export class LoginComponent implements OnInit {
  private isAuthenticated: any;
  // form: FormGroup;
  muser: {};
  loginFormErrors: any;
  muserName: string;
  password: string;
  muserAccountInfo: any;

  messagePerErrorCode = {
    loginfailed: 'Invalid credentials'
  };

  errors = [];
  constructor(
    private router: Router,
    private dataService: DataService
    // private muserService: MuserService,
  ) {

  }

  ngOnInit() {
  }


  onLogin() {
    this.muserName = this.muserName.toLowerCase();
    this.dataService.authAccount(this.muserName, this.password).then(() => {
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
