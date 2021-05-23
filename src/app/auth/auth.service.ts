import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new BehaviorSubject<User>();
  user = new Subject<User>();
  isLogIn = new BehaviorSubject<boolean>(false);
  REST_API: string = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}

  signup(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    return this.http.post<AuthResponseData>(`${this.REST_API}/register`, {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    // .pipe(catchError(() => this.handleError));
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.REST_API}/login`, {
        username: username,
        password: password,
      })
      .pipe();
  }

  logout() {
    this.user.next();
    console.log(this.user);
    this.router.navigate(['/login']);
  }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   this.user.next(user); //todo-----
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An known error occurred';
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'This email exists already !';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'This email does not exists!';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'This password is not correct!';
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }
}
