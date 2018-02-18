import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthenticationService } from '../services/authentication.service';


@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    encapsulation: ViewEncapsulation.None
})

export class LogoutComponent implements OnInit {

    constructor(private router: Router,
        // private authService: AuthenticationService
        ) {
    }

    ngOnInit(): void {
        // reset login status
        // this.authService.logout();
        this.router.navigate(['/login']);
    }
}
