import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../core/common/route.animation';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ActivatedRoute, Router } from '@angular/router';
// import { LocalStorageService, SessionStorageService} from 'ngx-webstorage';


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

  discreteBarDemoData;
  lineChartDemoData;
  lineChartInterpolatedDemoData;
  serverLoadDemoData;
  activityFeedsDemoData;
  pieChartDemoData;
  recentSalesProductsDemoData;
  recentSalesDemoData;
  trafficSourcesDemoData;

  constructor(private router: Router
    // private webLocalStorage: LocalStorageService,
    // private webSessionStorage: SessionStorageService
  ) { }

  ngOnInit() {
    const isAuthenticated = localStorage.getItem('isAuthenticated'); {
      // isAuthenticated || == null || isAuthenticated !== 'true' ? this.router.navigateByUrl('/login') : this.router.navigateByUrl('/');


      if (isAuthenticated != null) {
        if (isAuthenticated === 'true') {
          this.router.navigateByUrl('/');
        }
      } else {
        this.router.navigateByUrl('/login');
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

}
