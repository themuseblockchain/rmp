import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

}
