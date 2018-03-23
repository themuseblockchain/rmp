import { Component, OnInit } from '@angular/core';
import { MuserService } from '../../services/muser.service';

@Component({
  selector: 'toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;
  muserName: string;

  constructor(
    private muserService: MuserService
  ) {

  }

  ngOnInit() {
    this.muserName = localStorage.getItem('currentUser'); // this.muserService.getMuserName;

  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  onLogout() {
    localStorage.clear();
  }
}
