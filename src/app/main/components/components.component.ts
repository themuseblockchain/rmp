import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogsComponent } from './dialogs/dialogs.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ProgressComponent } from './progress/progress.component';

@Component({
  selector: 'components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  @ViewChild(DialogsComponent, { read: ElementRef }) private dialogs: ElementRef;
  @ViewChild(MenuComponent, { read: ElementRef }) private menu: ElementRef;
  @ViewChild(ProgressComponent, { read: ElementRef }) private progress: ElementRef;
  @ViewChild(ProgressSpinnerComponent, { read: ElementRef }) private progressSpinner: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  scrollTo(elem: string) {
    this[elem].nativeElement.scrollIntoView({
      behavior: 'smooth', // or "auto" or "instant"
      block: 'start', // or "end"
      inline: 'nearest'
    });
  }
}
