import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../core/common/route.animation';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class RegisterComponent implements OnInit {

  muserName: string; /// register should force lowercase on username
  // email: string;
  password: string;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  register() {
    // this.dataService.authAccount(this.muserName.toLowerCase(), this.password).then(() => {
    // this.isAuthenticated = localStorage.getItem('isAuthenticated');
    //  if (this.isAuthenticated != null && this.isAuthenticated === 'true')
    //     {
    //       this.router.navigateByUrl('/');
    //           // this.router.navigate(['/']);
    //     }
    //   }).catch(e => console.log('error' + e));

  }
}
