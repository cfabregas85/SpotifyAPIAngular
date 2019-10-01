import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GoogleAuthService } from '../services/google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private authGoogle: GoogleAuthService,
              private router:Router){}

  canActivate(): boolean{

    if (this.auth.IsAuthenticatie() || this.authGoogle.isLoggedIn()){
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
