import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/User";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  addGame: string = "add game";
  home: string = "home";
  login: string = "login";
  user: User;
  logout: string = "logout";

  // the constructor is basically only used for services.
  constructor(private authenticationService: AuthenticationService) {
    this.user = authenticationService.currentUserValue;
  }

  ngOnInit() {
  }

  logoutUser() {
    this.authenticationService.logout();
    location.reload();
  }
}
