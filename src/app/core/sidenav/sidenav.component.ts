import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import isArray from 'lodash-es/isArray';
import keys from 'lodash-es/keys';
import sortBy from 'lodash-es/sortBy';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';
import { SidenavItem } from './sidenav-item/sidenav-item.model';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy {

  items: SidenavItem[];

  private _itemsSubscription: Subscription;
  private _routerEventsSubscription: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._itemsSubscription = this.sidenavService.items$
      .subscribe((items: SidenavItem[]) => {
        this.items = this.sortRecursive(items, 'position');
      });

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sidenavService.nextCurrentlyOpenByRoute(event.url);
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 400);
      }
    });


    this.breadcrumbService.addFriendlyNameForRoute('/', 'Dashboard');
    this.breadcrumbService.addFriendlyNameForRoute('/wallet', 'Wallet');
    this.breadcrumbService.addFriendlyNameForRoute('/post', 'Post');
 

  }

  toggleIconSidenav() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);

    this.sidenavService.isIconSidenav = !this.sidenavService.isIconSidenav;

  }

  isIconSidenav(): boolean {
    return this.sidenavService.isIconSidenav;
  }

  sortRecursive(array: SidenavItem[], propertyName: string) {
    const that = this;

    array.forEach(function (item) {
      const keyArray = keys(item);
      keyArray.forEach(function (key) {
        if (isArray(item[key])) {
          item[key] = that.sortRecursive(item[key], propertyName);
        }
      });
    });

    return sortBy(array, propertyName);
  }

  ngOnDestroy() {
    this._itemsSubscription.unsubscribe();
    this._routerEventsSubscription.unsubscribe();
  }
}
