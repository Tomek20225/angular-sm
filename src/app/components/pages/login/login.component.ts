import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UsersService) { }
  
  // Alert logic
  alertMsg:string;
  showAlert:boolean = false;
  alertType:string = 'danger';

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    let email = form.value.email;
    let passwd = form.value.password;
    
    this.userService.getUser('email', form.value.email).subscribe(userArr => {
      let user: User = userArr[0];
      console.log(user);
      
      if (!user) {
        this.alertMsg = 'Nie ma takiego użytkownika!';
        this.showAlert = true;
      }
      else if (passwd === user.password)
      {
        this.showAlert = false;
        this.userService.setLoggedIn(true, user);
      }
      else {
        this.alertMsg = 'Niepoprawne dane logowania!';
        this.showAlert = true;
      }
    });
  }

}
