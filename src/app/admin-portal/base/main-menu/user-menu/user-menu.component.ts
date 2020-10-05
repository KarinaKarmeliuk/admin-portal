import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  username : string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    let json_o = JSON.parse(localStorage.getItem('currentUser'));
    let user = new User();
    user = json_o;
    this.username = user.username;
  }

  logout(): void {
    this.authService.logout();
  }
}
