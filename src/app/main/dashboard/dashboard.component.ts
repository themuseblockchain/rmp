import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../core/common/route.animation';
// import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ActivatedRoute, Router } from '@angular/router';
// import { LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { MuserService } from '../../core/services/muser.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  muserName: string;


  constructor(
    private router: Router,
    private muserService: MuserService
  ) { }

  ngOnInit() {
    this.muserName = this.muserService.getMuserName;
    const isAuthenticated = localStorage.getItem('isAuthenticated'); {
      if (isAuthenticated === 'true') {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
        localStorage.clear();
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

}
