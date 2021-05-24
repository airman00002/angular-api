import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  error: any = null;
  authObs: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
  onRegister() {
    console.log(this.registerForm.value);

    if (!this.registerForm.valid) {
      return;
    }
    const username = this.registerForm.value.username;
    const firstname = this.registerForm.value.firstname;
    const lastname = this.registerForm.value.lastname;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    authObs = this.authService.signup(username,firstname,lastname,email, password);

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['login']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage.error;
        this.isLoading = false;
      }
    );

    this.registerForm.reset();
  }
  onCancel() {
    this.router.navigate([''])
  }
}
