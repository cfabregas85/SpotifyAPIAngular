import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { GoogleAuthService } from '../../../services/google-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  user: UserModel = new UserModel();
  remember = false;
  public logingButton= false;
  constructor( private auth:AuthService, private authGoogle:GoogleAuthService) {}

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.remember = true;      
    } 
    if (this.auth.IsAuthenticatie) {
      this.logingButton= true;
    }
  }
}
