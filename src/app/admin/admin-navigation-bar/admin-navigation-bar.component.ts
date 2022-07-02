import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Logout } from 'src/app/models/logout.model';

@Component({
  selector: 'app-admin-navigation-bar',
  templateUrl: './admin-navigation-bar.component.html',
  styleUrls: ['./admin-navigation-bar.component.scss']
})
export class AdminNavigationBarComponent implements OnInit {

  logout: Logout = {
    userId: ''
  }

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.logout.userId = this.auth.user.id;
    this.auth.logoutRequest(this.logout);
  }
}
