import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../core/services/auth.service';
import { fadeInAnimation } from '../../core/common/route.animation';
import { DataService } from '../../core/services/data.service';

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
  form: FormGroup;
  loginFormErrors: any;
  muserName: string;
  password: string;
  // login: { muserName?: string, password?: string } = {};

  messagePerErrorCode = {
    loginfailed: 'Invalid credentials'
  };

  errors = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService
    // private authService: AuthService
  ) { }

  ngOnInit() {
  }

  // onLogin() {
  //   const val = this.form.value;


  // }
    onLogin() {
    this.dataService.authAccount(this.muserName, this.password);
    const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (isAuthenticated != null) {
        if (isAuthenticated === 'true') {
          this.router.navigateByUrl('/');
        }
      }
    }
}
