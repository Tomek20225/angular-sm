import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router } from "@angular/router"

import { GlobalConstants } from '../../../global-constants';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('collapse') collapseNav: ElementRef;

  @Input()
  loggedIn;

  @Input()
  userData;

  constructor(private userService: UsersService, private router: Router) { }

  logout() {
    this.loggedIn = this.userService.getLoggedIn();
    this.userService.setLoggedIn(false);
  }

  ngOnInit(): void { }

  collapseToggler() {
    this.collapseNav.nativeElement.classList.toggle('show');
  }

}
