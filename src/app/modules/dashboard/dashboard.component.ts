import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@data/interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(["/", "auth", "sign-in"])
    }
    else {
      this.authService.getFullUserData().then((user) => {
        this.user = user;
      });
    }
  }

  clickLogout() {
    this.authService.SignOut();
  }
}
