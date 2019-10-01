import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private afAuth: AngularFireAuth,private router: Router) {

    this.user = afAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
          console.log(user);
        }
      }
    );    
   }

   loginGoogle() {    
   return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logoutGoogle() {
    console.log('Dentro');
    this.afAuth.auth.signOut();
    this.userDetails = null;
  }

  isLoggedIn() {
    if (this.userDetails == null ) {
        return false;
      } else {
        return true;
      }
    }


}
