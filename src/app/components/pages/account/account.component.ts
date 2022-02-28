import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private userService: UsersService) { }

  loggedIn:boolean = this.userService.getLoggedIn();
  userData:User = this.userService.getLoggedUserData();

  ngOnInit(): void { }

}
