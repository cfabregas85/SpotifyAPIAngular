import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { GoogleAuthService } from '../../services/google-auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   user: UserModel = new UserModel();
  
   //This var will stora the data of checkbox
   remember= false;

   constructor(private auth:AuthService,
              private router:Router, public authGoogle: GoogleAuthService) { }

  ngOnInit() {
    //Check if there is an email value on Local  Store
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.remember = true;      
    }   
  }

  googleLogin(){
      this.authGoogle.loginGoogle().then((res) => this.router.navigateByUrl('/'));    
  }

  onLogin(form : NgForm){
    if (form.invalid) {return; }

    //Using Sweetalert
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text: 'Processing'
    });
    
    Swal.showLoading();
    
    // Call to login function on Auth
    this.auth.login(this.user).subscribe(result=>{
      console.log(result);
      Swal.close();
      
      //checkBox Remember
      if (this.remember) {
        localStorage.setItem('email', this.user.email);
      }

      this.router.navigateByUrl('/home');
    }, (err)=>{
      console.log(err.error.error.message);
      Swal.fire({        
        type:'error',
        text: err.error.error.message,
        title:'Authentication error'
      });
    });   
  }    
}



