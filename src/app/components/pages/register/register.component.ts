import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UsersService) { }
  
  // Alert logic
  alertMsg:string;
  showAlert:boolean = false;
  alertType:string = 'danger';

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    let email = form.value.email;
    let name = form.value.name;
    let surname = form.value.surname;
    let passwd = form.value.password;
    
    this.userService.getUser('email', form.value.email).subscribe(userArr => {
      let user: User = userArr[0];
      console.log('Downloaded user', user);
      
      if (!user) {
        this.showAlert = false;

        let newUser: User = {
          id: 101,
          email: email,
          name: name,
          surname: surname,
          password: passwd
        };

        console.log('New user', newUser);

        this.userService.registerUser(newUser).subscribe(newUserArr => {
          console.log('Server response', newUserArr);
          user = newUserArr[0];
          this.userService.setLoggedIn(true, user);

          console.log('Registered user', user);
        }, err => {
          this.alertMsg = 'Podczas rejestracji wystąpił błąd!';
          this.showAlert = true;
        });
      }
      else
      {
        this.alertMsg = 'Wykorzystano już ten adres email!';
        this.showAlert = true;
      }
    });
  }

}
