import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Logout } from 'src/app/models/logout.model';

@Component({
  selector: 'app-user-navigation-bar',
  templateUrl: './user-navigation-bar.component.html',
  styleUrls: ['./user-navigation-bar.component.scss']
})
export class UserNavigationBar implements OnInit {

  logout: Logout = {
    userId: ''
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.logout.userId = this.auth.user.id;
    this.auth.logoutRequest(this.logout);
  }

  navigateToHomePage(){
    this.router.navigate(['/home']);
  }

  navigateToRequestPage(){
    this.router.navigate(['/request']);
  }
}
