import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router"

import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url:string = '/api/users/'; // Normal
  // url:string = 'http://recodeit-testy.cba.pl/api/users'; // Electron

  constructor(private http:HttpClient, private router: Router) {
    // Changing logged in status
    if (sessionStorage.getItem('logged-in') == null || 
        sessionStorage.getItem('user-data') == null) {
      sessionStorage.setItem('logged-in', 'false');
      sessionStorage.setItem('user-data', 'none');
    }
  }

  // Log user in or out
  setLoggedIn(value: boolean, user?: User):void {
    sessionStorage.setItem('logged-in', value.toString());
    
    if (user)
      sessionStorage.setItem('user-data', JSON.stringify(user));
    else
      sessionStorage.setItem('user-data', 'none');

    if (value)
      this.router.navigate(['/konto']);
    else
      this.router.navigate(['/logowanie']);
  }

  // Get current user's status
  getLoggedIn():boolean {
    return (sessionStorage.getItem('logged-in') == "true") ? true : false;
  }

  // Get data of logged in user
  getLoggedUserData():User {
    return JSON.parse(sessionStorage.getItem('user-data'));
  }

  // Register user and log in
  registerUser(user: User):Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions);
  }

  // Get all Users
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  // Get specific User
  getUser(way: string, needle: string):Observable<User[]> {
    return this.http.get<User[]>(`${this.url}?${way}=${needle}&limit=1`);
  }

}
