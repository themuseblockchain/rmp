import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import each from 'lodash-es/each';
import find from 'lodash-es/find';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidenavItem } from './sidenav-item/sidenav-item.model';

@Injectable()
export class SidenavService {

  private _itemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _items: SidenavItem[] = [ ];
  items$: Observable<SidenavItem[]> = this._itemsSubject.asObservable();

  private _currentlyOpenSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _currentlyOpen: SidenavItem[] = [ ];
  currentlyOpen$: Observable<SidenavItem[]> = this._currentlyOpenSubject.asObservable();

  isIconSidenav: boolean;

  constructor(
    snackbar: MatSnackBar
  ) {
    const menu = this;

    const dashboard = menu.addItem('Dashboard', 'dashboard', '/', 1);
    menu.addItem('Wallet', 'mail', '/wallet', 2);
    menu.addItem('Rights Management', 'mail', '/rights-management', 3);
    // menu.addItem('White List', 'mail', '/white-list', 4);
    // menu.addItem('Buy MUSE', 'mail', '/buy', 5);

    // const customPages = menu.addItem('Custom Pages', 'web', null, 8);
    // menu.addSubItem(customPages, 'Login Page', '/login', 1);
    // menu.addSubItem(customPages, 'Register Page', '/register', 2);


    // const multiLevel = menu.addItem('Multi-Level Menu', 'menu', null, 11);
    // const level1 = menu.addSubItem(multiLevel, 'Level 1', '/level1', 1);
    // const level2 = menu.addSubItem(level1, 'Level 2', '/level1/level2', 2);
    // const level3 = menu.addSubItem(level2, 'Level 3', '/level1/level2/level3', 3);
    // const level4 = menu.addSubItem(level3, 'Level 4', '/level1/level2/level3/level4', 4);
    // const level5 = menu.addSubItem(level4, 'Level 5', '/level1/level2/level3/level4/level5', 5);
  }

  addItem(name: string, icon: string, route: any, position: number, badge?: string, badgeColor?: string, customClass?: string) {
    const item = new SidenavItem({
      name: name,
      icon: icon,
      route: route,
      subItems: [ ],
      position: position || 99,
      badge: badge || null,
      badgeColor: badgeColor || null,
      customClass: customClass || null
    });

    this._items.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubItem(parent: SidenavItem, name: string, route: any, position: number) {
    const item = new SidenavItem({
      name: name,
      route: route,
      parent: parent,
      subItems: [ ],
      position: position || 99
    });

    parent.subItems.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  isOpen(item: SidenavItem) {
    return (this._currentlyOpen.indexOf(item) !== -1);
  }

  toggleCurrentlyOpen(item: SidenavItem) {
    let currentlyOpen = this._currentlyOpen;

    if (this.isOpen(item)) {
      if (currentlyOpen.length > 1) {
        currentlyOpen.length = this._currentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [ ];
      }
    } else {
      currentlyOpen = this.getAllParents(item);
    }

    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  getAllParents(item: SidenavItem, currentlyOpen: SidenavItem[] = [ ]) {
    currentlyOpen.unshift( item );

    if (item.hasParent()) {
      return this.getAllParents(item.parent, currentlyOpen);
    } else {
      return currentlyOpen;
    }
  }

  nextCurrentlyOpen(currentlyOpen: SidenavItem[]) {
    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  nextCurrentlyOpenByRoute(route: string) {
    let currentlyOpen = [ ];

    const item = this.findByRouteRecursive(route, this._items);

    if (item && item.hasParent()) {
      currentlyOpen = this.getAllParents(item);
    } else if (item) {
      currentlyOpen = [item];
    }

    this.nextCurrentlyOpen(currentlyOpen);
  }

  findByRouteRecursive(route: string, collection: SidenavItem[]) {
    let result = find(collection, { 'route': route });

    if (!result) {
      each(collection, (item) => {
        if (item.hasSubItems()) {
          const found = this.findByRouteRecursive(route, item.subItems);

          if (found) {
            result = found;
            return false;
          }
        }
      });
    }

    return result;
  }

  get currentlyOpen() {
    return this._currentlyOpen;
  }

  getSidenavItemByRoute(route) {
    return this.findByRouteRecursive(route, this._items);
  }
}
