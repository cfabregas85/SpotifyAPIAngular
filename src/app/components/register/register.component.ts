import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../components/models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel;
  remember = false;

  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.user = new UserModel();
    
   }
   
   //Submit Form
   onSubmit(form: NgForm){

     if (form.invalid) { return; } 

     //Using Sweetalert
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text: 'Processing'
    });
    Swal.showLoading();
   
     this.auth.newuser(this.user).subscribe(result=>{
       console.log(result);
       Swal.close();

       //checkBox Remember
      if (this.remember) {
        localStorage.setItem('email', this.user.email);
      }

       this.router.navigateByUrl('/home');
     },  (err)=>{
      console.log(err.error.error.message);
      Swal.fire({        
        type:'error',
        text: err.error.error.message,
        title:'An error has occurred'
      });
    });   
  }    
}

