import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.isLogIn.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
      // console.log(!user);
      // console.log(!!user);
      console.log(this.isAuthenticated);
    });
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
