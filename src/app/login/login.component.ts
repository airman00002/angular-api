import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;
  isLoading = false;
  error: any = null;
  authObs: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    console.log(form.value);

    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.isLoading = true;

    this.authService
      .login(username, password)
      .subscribe(
        (resData: any) => {
          console.log(resData.token);
          localStorage.setItem('token', resData.token);
          this.isLoading = false;
          this.authService.isLogIn.next(true);
          this.authService.user.next(resData.token);
          this.router.navigate(['user']);
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
  }
  onCancel() {
    this.router.navigate(['']);
  }
}
