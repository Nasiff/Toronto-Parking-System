import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  title;
  currentLoggedInUser;
  currentLoggedInUserName;
  currentLoggedInUserType;

  constructor(
    private userService: UserService,
    private route: Router
  ) {

  }

  ngOnInit() {
    this.title = "Toronto Parking System"
  }

  getUserProfileName() {
    this.currentLoggedInUser = this.userService.getCurrentLoggedInUser();
    this.currentLoggedInUserName = this.currentLoggedInUser.payload.name;
    this.currentLoggedInUserType = this.currentLoggedInUser.payload.userType;
  }

  /**
   * Check if the current page is either a login or a registration page.
   * Only show the profile button when the user is not in either of the pages.
   */
  isLoginOrRegistration() {
    if (this.route.url.includes('/register') || this.route.url.length == 1) {
      return true;
    } else {
      this.getUserProfileName();

      return false;
    }
  }
  
  showDropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  logout() {
    this.userService.logout();
  }
}
