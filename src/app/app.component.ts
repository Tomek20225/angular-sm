import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { UsersService } from './services/users.service';
import { GlobalConstants } from './global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private userService: UsersService) { }

  loggedIn = this.userService.getLoggedIn();
  userData;
 
  ngOnInit() {
    if (this.loggedIn)
      this.userData = this.userService.getLoggedUserData();

    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.loggedIn = this.userService.getLoggedIn();

        if (this.loggedIn)
          this.userData = this.userService.getLoggedUserData();
 
        let rt = this.getChild(this.activatedRoute)
 
        rt.data.subscribe(data => {
          this.titleService.setTitle(data.title)})
      })
  }
 
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
 
}